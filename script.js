// GSAP animations
function closeElement() {
  gsap.to(".Mobilescreen", {
    y: -1000,
    duration: 1.5,
    ease: "power2.in",
  });
}

const ShowMenu = () => {
  gsap.to(".Mobilescreen", {
    y: 1000,
    duration: 1.5,
    ease: "power2.out",
  });
};

// UI text show/hide functions
function updateValidationStyles(element, label, isValid) {
  const borderColor = isValid ? "rgb(26, 155, 0)" : "rgb(126, 0, 0)";
  const placeholderText = isValid ? "" : "Please enter a valid value";
  const labelColor = isValid ? "green" : "red";

  element.style.borderBottom = `1px solid ${borderColor}`;
  element.placeholder = placeholderText;
  label.style.color = labelColor;
}

function nameValidation() {
  const nameValue = document.getElementById("name").value;
  const isValid = /^[a-zA-Z ]+$/.test(nameValue);
  updateValidationStyles(document.getElementById("name"), document.getElementById("labelName"), isValid);
  return isValid;
}

function MailValidation() {
  const mailValue = document.getElementById("mail").value;
  const isValid = /^([a-zA-Z0-9\. -_]+)@([a-zA-Z0-9 -_]+).([a-zA-Z]{2,10})$/.test(mailValue);
  updateValidationStyles(document.getElementById("mail"), document.getElementById("maillabel"), isValid);
  return isValid;
}

function submitValidation() {
  return nameValidation() && MailValidation();
}

// Sorting function
function sortSections(criteria) {
  const sections = Array.from(document.querySelectorAll(".workholder"));

  sections.sort((a, b) => {
    if (criteria === "date") {
      return new Date(a.getAttribute("data-date")) - new Date(b.getAttribute("data-date"));
    } else if (criteria === "alphabetical") {
      return a.querySelector("h2").textContent.toLowerCase().localeCompare(b.querySelector("h2").textContent.toLowerCase());
    }
  });

  const container = document.querySelector(".workContainer");
  sections.forEach(section => container.appendChild(section));

  refreshScrollTrigger();
}

// GSAP and ScrollTrigger initialization
let debounceTimeout;
const debounce = (callback, delay) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(callback, delay);
};

const refreshScrollTrigger = (() => {
  let isRefreshing = false;
  return () => {
    if (!isRefreshing) {
      isRefreshing = true;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        isRefreshing = false;
      });
    }
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize GSAP animations
  const sections = document.querySelectorAll(".workholder");
  sections.forEach((mainbody) => {
    let text = mainbody.querySelector(".textContainer");
    let image = mainbody.querySelector(".Imgcontainer");

    gsap.timeline({
      scrollTrigger: {
        trigger: mainbody,
        start: "top bottom",
        end: "bottom 90%",
        scrub: true,
        onEnter: refreshScrollTrigger,
        onLeaveBack: refreshScrollTrigger,
      }
    })
    .fromTo(text, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 })
    .fromTo(image, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, "<");
  });

  // Initialize Lenis
  const lenis = new Lenis();

  lenis.on("scroll", () => {
    debounce(() => {
      ScrollTrigger.update();
    }, 100);
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);

  // Refresh ScrollTrigger on various events
  window.addEventListener("hashchange", refreshScrollTrigger);
  window.addEventListener("resize", refreshScrollTrigger);
  window.addEventListener("scroll", () => {
    debounce(() => {
      const scrolledToBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (scrolledToBottom || window.pageYOffset === 0) {
        refreshScrollTrigger();
      }
    }, 100);
  });
});
