
"use strict";

/* Mobile navigation */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Typing animation */
const typingText = document.getElementById("typing-text");

const words = [
  "Data Engineering",
  "Data Pipelines",
  "Data Transformation",
  "SQL & Analytics",
  "Data Quality"
];

if (typingText) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    typingText.textContent = words[0];
  } else {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      typingText.textContent = currentWord.substring(0, charIndex);

      let delay = deleting ? 45 : 85;

      if (!deleting && charIndex < currentWord.length) {
        charIndex++;
      } else if (deleting && charIndex > 0) {
        charIndex--;
      } else if (!deleting) {
        deleting = true;
        delay = 1100;
      } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }

      window.setTimeout(typeEffect, delay);
    }

    typeEffect();
  }
}

/* Scroll reveal animations */
const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  reduceMotion ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* Automatically update the copyright year */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
