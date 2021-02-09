require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejsMate = require("ejs-mate");

const nodemailer = require("nodemailer");

const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", (req, res) => {
  const output = `
<p>You have a new contact request</p>
<h3>Contact Details:</h3>
<ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
</ul>
<h3>Message:</h3>
<p>${req.body.message}</p>
`;

  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PW,
      },
    });

    // send mail with defined transport object

    let info = await transporter.sendMail({
      from: '"Nodemailer" <foo@example.com>', // sender address
      to: process.env.MY_ADDRESS, // list of receivers
      subject: "Website Contact Request", // Subject line
      text: "Plain text - blank.", // plain text body
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);

  res.redirect("/");
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
