const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const scrollbar = document.querySelector(".scrollbar");
const parallax = document.querySelector("[data-parallax]");
const tiltCard = document.querySelector("[data-tilt]");
const revealItems = document.querySelectorAll(".reveal");

const updateScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollbar.style.width = `${progress}%`;
  header.classList.toggle("is-scrolled", scrollTop > 24);

  if (parallax) {
    parallax.style.transform = `translateY(${scrollTop * 0.08}px) scale(1.08)`;
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 3, 2) * 0.08}s`;
  observer.observe(item);
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

if (tiltCard) {
  tiltCard.addEventListener("pointermove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();
