/**
 * Template Name: KnightOne
 * Template URL: https://bootstrapmade.com/knight-simple-one-page-bootstrap-template/
 * Updated: Oct 16 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

/**
 * Template Name: KnightOne
 */

(function () {
  "use strict";

  /* Header scroll */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");

    if (!header) return;

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    )
      return;

    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /* Mobile nav */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /* Preloader */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }

  /* Scroll top */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;

    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* AOS */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  window.addEventListener("load", aosInit);

  /* GLightbox */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
    });
  }

  /* Pure Counter */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /* Product Filter Manual */
  const productButtons = document.querySelectorAll(".product-filters li");
  const productItems = document.querySelectorAll(".product-item");

  productButtons.forEach((button) => {
    button.addEventListener("click", function () {
      productButtons.forEach((btn) => btn.classList.remove("filter-active"));
      this.classList.add("filter-active");

      const filterValue = this.getAttribute("data-filter");

      productItems.forEach((item) => {
        if (
          filterValue === "*" ||
          item.classList.contains(filterValue.substring(1))
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    });
  });

  /* FAQ */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /* Swiper */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) return;

      const config = JSON.parse(configElement.innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener("load", initSwiper);

  /* Correct scroll position for hash links */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);

      if (section) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;

          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /* Navmenu scrollspy */
  const navmenuLinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenuLinks.forEach((link) => {
      if (!link.hash) return;

      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((activeLink) => activeLink.classList.remove("active"));

        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /* Question Slider Fix Final */
  window.addEventListener("load", function () {
    const cards = document.querySelectorAll(".question-card");
    const progressText = document.querySelector(".question-progress-text");
    const progressBar = document.querySelector(".question-progress-bar");

    let current = 0;

    function updateProgress() {
      if (progressText) {
        progressText.textContent = `${current + 1} / ${cards.length}`;
      }

      if (progressBar) {
        progressBar.style.width = `${((current + 1) / cards.length) * 100}%`;
      }
    }

    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("answer-btn")) {
        const card = e.target.closest(".question-card");

        card.querySelectorAll(".answer-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });

        e.target.classList.add("active");
      }

      if (e.target.classList.contains("next-btn")) {
        const card = cards[current];
        const selected = card.querySelector(".answer-btn.active");
        const textarea = card.querySelector("textarea");

        if (!selected) {
          alert("Pilih Iya atau Tidak terlebih dahulu.");
          return;
        }

        if (textarea.value.trim() === "") {
          alert("Isi alasan terlebih dahulu.");
          return;
        }

        if (current < cards.length - 1) {
          card.classList.remove("active");
          card.classList.add("slide-left");

          current++;
          cards[current].classList.add("active");

          updateProgress();
        } else {
          alert("Terima kasih, semua pertanyaan sudah dijawab!");
        }
      }
    });

    updateProgress();
  });
})();
