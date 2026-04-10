// KOUKOU ANIMASYON
const koukou = document.getElementById("koukou");
const slideshow = document.getElementById("slideshow");
const slideImg = document.getElementById("slide-img");

let slideIndex = 1;

// FLY‑IN
setTimeout(() => {
  koukou.style.transform = "translateX(0%)";
}, 300);

// RETE 3.5s → FLY‑OUT
setTimeout(() => {
  koukou.style.transform = "translateX(-100%)";
}, 3800);

// APRE SA → SLIDESHOW PARÈT
setTimeout(() => {
  slideshow.classList.remove("hidden");
  startSlideshow();
}, 5200);

// SLIDESHOW FONKSYON
function startSlideshow() {
  setInterval(() => {
    slideIndex++;
    if (slideIndex > 36) slideIndex = 1;
    slideImg.src = `assets/leaders/${slideIndex}.jpeg`;
  }, 3000);
}
