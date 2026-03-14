AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true
});

const lightbox = GLightbox({
  autoplayVideos: true
});

// dark mode switcher
const root = document.documentElement;
const btn = document.getElementById("theme-toggle");

const saved = localStorage.getItem("theme");

if (saved === null) {
  root.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
} else {
  root.classList.toggle("dark", saved === "dark");
}

btn.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// mobile menu
const menuBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// navbar scroll
const navbar = document.getElementById("navbar");
const navContent = document.getElementById("navbar-content");
const navRight = document.getElementById("nav-right");
const signupBtn = document.getElementById("signup-btn");
const handleScroll = () => {
  const isScrolled = window.scrollY > 10;
  navbar.classList.toggle("bg-white", isScrolled);
  navbar.classList.toggle("dark:bg-[#181c31]", isScrolled);
  navbar.classList.toggle("border-b", isScrolled);
  navbar.classList.toggle("border-gray-200", isScrolled);
  navbar.classList.toggle("dark:border-gray-700", isScrolled);
  navbar.classList.toggle("shadow-sm", isScrolled);
  navContent.classList.toggle("py-3", isScrolled);
  navContent.classList.toggle("py-6", !isScrolled);
  navRight.classList.toggle("text-gray-600", isScrolled);
  navRight.classList.toggle("text-white", !isScrolled);
  signupBtn.style.backgroundColor = isScrolled ? "#4e6bff" : "#6881ff";
};
window.addEventListener("scroll", handleScroll);

// pricing switcher
const pricingSwitcher = document.querySelector("#pricing-switcher");
const switchDot = document.querySelector("#switch-dot");
const priceElements = document.querySelectorAll(".price");
const pricingDuration = document.querySelectorAll(".pricing-duration");

let isAnnually = false;

pricingSwitcher.addEventListener("click", () => {
  isAnnually = !isAnnually;
  if (isAnnually) {
    switchDot.classList.replace("translate-x-1", "translate-x-5");
  } else {
    switchDot.classList.replace("translate-x-5", "translate-x-1");
  }
  priceElements.forEach((el) => {
    const { monthly, annually } = el.dataset;
    el.innerText = isAnnually ? annually : monthly;
  });
  pricingDuration.forEach((el) => {
    el.innerText = isAnnually ? "/ per year" : "/ per month";
  });
});