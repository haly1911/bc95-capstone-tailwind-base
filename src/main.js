AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true
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
const handleScroll = () => {
  const isScrolled = window.scrollY > 10;
  navbar.classList.toggle("bg-white", isScrolled);
  navbar.classList.toggle("dark:bg-[#181c31]", isScrolled);
  navbar.classList.toggle("border-b", isScrolled);
  navbar.classList.toggle("border-gray-200", isScrolled);
  navbar.classList.toggle("dark:border-gray-700", isScrolled);
  navbar.classList.toggle("shadow-sm", isScrolled);
};
window.addEventListener("scroll", handleScroll);
