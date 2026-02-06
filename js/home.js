/* =========================
   GLOBAL STATE
========================= */
let currentSlide = 0;
let slideInterval = null;

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');

/* =========================
   SLIDESHOW DOTS
========================= */
function createDots() {
  if (!dotsContainer || slides.length === 0) return;

  dotsContainer.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });

    dotsContainer.appendChild(dot);
  });
}

/* =========================
   SHOW SLIDE
========================= */
function showSlide(index) {
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove('active'));

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');

  currentSlide = index;
}

/* =========================
   SLIDE CHANGE
========================= */
function changeSlide(direction) {
  if (slides.length === 0) return;

  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
  resetInterval();
}

/* =========================
   AUTOPLAY CONTROL
========================= */
function startInterval() {
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

/* =========================
   PAUSE ON HOVER
========================= */
const slideshow = document.querySelector('.slideshow-hero');

if (slideshow) {
  slideshow.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  slideshow.addEventListener('mouseleave', () => {
    startInterval();
  });
}

/* =========================
   KEYBOARD NAVIGATION
========================= */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft') changeSlide(-1);
});

/* =========================
   PRODUCT DETAILS SLIDE-IN
========================= */
const detailBlocks = document.querySelectorAll('.detail-block');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.25 }
);

detailBlocks.forEach(block => observer.observe(block));

/* =========================
   INIT
========================= */
window.addEventListener('load', () => {
  createDots();
  showSlide(0);
  startInterval();

  console.log("AIDEXAN homepage loaded successfully");
});
