const mobile_nav = document.querySelector(".mobile_nav_btns");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

// REGISTRATION LOGIN PART DESIGN

const input = document.querySelector("#email");
emailIcon = document.querySelector(".email-icon");

input.addEventListener("keyup", () => {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (input.value === "") {
    return;
  } else if (input.value.match(pattern)) {
    emailIcon.classList.replace("uil-envelope-alt", "uil-check-circle");
    return (emailIcon.style.color = "#4bb543");
  }
  emailIcon.classList.replace("uil-check-circle", "uil-envelope-alt");
  emailIcon.style.color = "#de0611";
});
