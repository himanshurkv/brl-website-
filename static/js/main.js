const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
const counters = document.querySelectorAll(".counter");

window.addEventListener("load", () => {
  if (loader) {
    loader.classList.add("hide");
  }
  revealOnScroll();
});

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
  revealOnScroll();
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains("open")) {
      navbar.classList.remove("open");
    }
  });
});

function revealOnScroll() {
  const trigger = window.innerHeight - 100;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 120));

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
    observer.unobserve(counter);
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));