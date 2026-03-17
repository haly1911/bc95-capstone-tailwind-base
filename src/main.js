AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
});

const lightbox = GLightbox({
  autoplayVideos: true,
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

// projects filter buttons
const projectFilterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Xử lý màu sắc nút bấm
    projectFilterButtons.forEach((btn) => {
      btn.classList.remove("bg-[#4e6bff]", "text-white");
    });
    button.classList.add("bg-[#4e6bff]", "text-white");

    const filterValue = button.getAttribute("data-filter");

    // 2. Ghi nhớ vị trí cũ của các item (Kỹ thuật FLIP)
    const positions = Array.from(projectItems).map((item) => {
      const rect = item.getBoundingClientRect();
      return { node: item, top: rect.top, left: rect.left, width: rect.width, height: rect.height };
    });

    // 3. Thực hiện ẩn/hiện bằng class của Tailwind
    projectItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    // 4. Tạo hiệu ứng trượt và phóng to
    positions.forEach((oldPos) => {
      const item = oldPos.node;
      if (item.classList.contains("hidden")) return;

      const newRect = item.getBoundingClientRect();

      // Tính toán độ lệch
      const dx = oldPos.left - newRect.left;
      const dy = oldPos.top - newRect.top;
      const dw = oldPos.width / newRect.width;
      const dh = oldPos.height / newRect.height;

      // Chạy hiệu ứng trượt + phóng to từ vị trí cũ về vị trí mới
      item.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${dw}, ${dh})` }, { transform: "translate(0, 0) scale(1, 1)" }], {
        duration: 400,
        easing: "ease-in-out",
      });
    });
  });
});

const defaultBtn = document.querySelector('[data-filter="all"]');
if (defaultBtn) defaultBtn.click();


// testimonial simple slide animation
const testimonialContent = document.getElementById("testimonial-content");
const testimonialPrev = document.getElementById("testimonial-prev");
const testimonialNext = document.getElementById("testimonial-next");

if (testimonialContent && testimonialPrev && testimonialNext) {
  const runAnimation = (className) => {
    testimonialContent.classList.remove("testimonial-next-anim", "testimonial-prev-anim");

    // ép browser reset animation
    void testimonialContent.offsetWidth;

    testimonialContent.classList.add(className);

    setTimeout(() => {
      testimonialContent.classList.remove(className);
    }, 700);
  };

  testimonialNext.addEventListener("click", () => {
    runAnimation("testimonial-next-anim");
  });

  testimonialPrev.addEventListener("click", () => {
    runAnimation("testimonial-prev-anim");
  });
}

// figures fade-in on load/scroll, không count số
const figureItems = document.querySelectorAll(".figure-item");

const figureObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        figureItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove("opacity-0", "translate-y-6");
            item.classList.add("opacity-100", "translate-y-0");
          }, index * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

const figuresSection = document.querySelector("#figures");
if (figuresSection) {
  figureObserver.observe(figuresSection);
}