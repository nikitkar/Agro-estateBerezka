const body = document.body;
const burger = document.querySelector(".burger");
const nav_modile = document.querySelector(".nav_modile");

burger.addEventListener("click", () => {
    burger.classList.toggle("activeBurger");
    nav_modile.classList.toggle("nav_active");

    body.classList.toggle("hide");
});
