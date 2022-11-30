const body = document.body;
const burger = document.querySelector(".burger");
const nav_modile = document.querySelector(".nav_modile");

burger.addEventListener("click", () => {
    burger.classList.toggle("activeBurger");
    nav_modile.classList.toggle("nav_active");

    body.classList.toggle("hide");
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 930) slider();
});

function slider() {
    const carousel = document.querySelector(".slider-list"),
        firstImg = carousel.querySelectorAll(".slider-item")[0],
        arrowIcons = document.querySelectorAll(".slider-btn");

    let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;

    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        arrowIcons[0].style.opacity = carousel.scrollLeft == 0 ? ".4" : "1";
        arrowIcons[0].disabled = carousel.scrollLeft == 0 ? true : false;

        arrowIcons[1].style.opacity =
            carousel.scrollLeft >= scrollWidth ? ".4" : "1";
        arrowIcons[1].style.opacity =
            carousel.scrollLeft >= scrollWidth ? true : false;
    };

    showHideIcons();

    arrowIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            let firstImgWidth = firstImg.clientWidth + 50;

            carousel.scrollLeft +=
                icon.id == "left" ? -firstImgWidth : firstImgWidth;

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

        let firstImgWidth = firstImg.clientWidth + 50;
        let valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            return (carousel.scrollLeft +=
                positionDiff > firstImgWidth / 3
                    ? valDifference
                    : -positionDiff);
        }
        carousel.scrollLeft -=
            positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
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
