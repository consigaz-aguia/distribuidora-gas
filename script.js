let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.remove("active");
        dots[idx].classList.remove("active");
    });

    slides[i].classList.add("active");
    dots[i].classList.add("active");
    index = i;
}


dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
});


let startX = 0;

document.querySelector(".slider").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

        index = (index + 1) % slides.length;
        showSlide(index);
    }

    if (endX - startX > 50) {

        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }
});
