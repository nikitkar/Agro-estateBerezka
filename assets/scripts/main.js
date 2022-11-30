const body = document.body;
const burger = document.querySelector(".burger");
const nav_modile = document.querySelector(".nav_modile");

burger.addEventListener("click", () => {
    burger.classList.toggle("activeBurger");
    nav_modile.classList.toggle("nav_active");

    body.classList.toggle("hide");
});

const sliderId = document.getElementById("slider");
const sliderTtem__text = document.querySelectorAll(".slider-item__text");
const sliderTtem__logo = document.querySelectorAll(".slider-item__logo");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        sliderTtem__text.forEach((item) => item.classList.add("animation"));
        sliderTtem__logo.forEach((item) => item.classList.add("animation"));
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 930) slider();
});

function slider() {
    const carousel = document.querySelector(".slider-list"),
        sliderItem = carousel.querySelectorAll(".slider-item")[0],
        sliderBtn = document.querySelectorAll(".slider-btn");

    let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;

    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        sliderBtn[0].style.opacity = carousel.scrollLeft == 0 ? ".4" : "1";
        sliderBtn[0].disabled = carousel.scrollLeft == 0 ? true : false;

        sliderBtn[1].style.opacity =
            carousel.scrollLeft >= scrollWidth ? ".4" : "1";
        sliderBtn[1].style.opacity =
            carousel.scrollLeft >= scrollWidth ? true : false;
    };

    showHideIcons();

    sliderBtn.forEach((icon) => {
        icon.addEventListener("click", () => {
            let sliderItemWidth = sliderItem.clientWidth + 50;

            carousel.scrollLeft +=
                icon.id == "left" ? -sliderItemWidth : sliderItemWidth;

            setTimeout(() => showHideIcons(), 60);
        });
    });

    const autoSlide = () => {
        if (
            carousel.scrollLeft -
                (carousel.scrollWidth - carousel.clientWidth) >
                -1 ||
            carousel.scrollLeft <= 0
        )
            return;

        positionDiff = Math.abs(positionDiff);

        let sliderItemWidth = sliderItem.clientWidth + 50;
        let valDifference = sliderItemWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            return (carousel.scrollLeft +=
                positionDiff > sliderItemWidth / 3
                    ? valDifference
                    : -positionDiff);
        }
        carousel.scrollLeft -=
            positionDiff > sliderItemWidth / 3 ? valDifference : -positionDiff;
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);
}
