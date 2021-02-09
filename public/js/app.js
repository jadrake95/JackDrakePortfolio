const hamburgerBtn = document.querySelector("#hamburgerBtn");
const hiddenMenu = document.querySelector("#hiddenMenu");
const menuLinks = document.querySelectorAll("#menu-links");
const mainNav = document.querySelector("#main-nav");
const logo = document.querySelector(".logo");
const logoSm = document.querySelector(".logo-sm");

if (screen.width <= 768) {
  logo.classList.add("none");
} else if (screen.width > 768) {
  logoSm.classList.add("none");
}

window.addEventListener("resize", function () {
  if (screen.width <= 768) {
    logoSm.classList.remove("none");
    logo.classList.add("none");
  } else if (screen.width > 768) {
    logoSm.classList.add("none");
    logo.classList.remove("none");
  }
});

hamburgerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (hamburgerBtn.classList.contains("open")) {
    hamburgerBtn.classList.remove("open");
    hiddenMenu.classList.remove("active");
    hiddenMenu.classList.remove("visible");
    mainNav.classList.remove("colored");
    menuLinks.forEach((link) => {
      link.classList.remove("slide-in");
      link.classList.add("fade-out");
    });
  } else {
    hamburgerBtn.classList.add("open");
    hiddenMenu.classList.add("active");
    hiddenMenu.classList.add("visible");
    mainNav.classList.add("colored");
    menuLinks.forEach((link) => {
      link.classList.add("slide-in");
      link.classList.remove("fade-out");
    });
  }
});

Array.from(menuLinks).forEach((link) => {
  link.addEventListener("click", function () {
    hamburgerBtn.classList.remove("open");
    hiddenMenu.classList.remove("active");
  });
});

$(function () {
  $(document).scroll(function () {
    var $nav = $("#main-nav");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
  $('a[href^="#"]').on("click", function (e) {
    // e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top - 67,
        },
        900,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
});
