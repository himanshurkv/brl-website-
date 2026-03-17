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

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar && navbar.classList.contains("open")) {
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

function runCounter(counter) {
  const target = parseInt(counter.dataset.target, 10);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 80));

  function tick() {
    current += step;

    if (current >= target) {
      counter.textContent = target;
      return;
    }

    counter.textContent = current;
    requestAnimationFrame(tick);
  }

  tick();
}

if ("IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => statsObserver.observe(counter));
} else {
  counters.forEach((counter) => runCounter(counter));
}