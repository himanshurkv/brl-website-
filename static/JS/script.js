// Loader
window.addEventListener("load", function() {
  document.getElementById("loader").style.display = "none";
});

// Navbar Scroll Effect
window.addEventListener("scroll", function() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Slide Animations
function reveal() {
  const elements = document.querySelectorAll(".slide-left, .slide-right");
  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("slide-active");
    }
  });
}
window.addEventListener("scroll", reveal);

// Counter Animation
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const c = +counter.innerText;
    const increment = target / 200;
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});