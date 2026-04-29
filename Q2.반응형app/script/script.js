document.addEventListener("DOMContentLoaded", function () {
  createInfiniteDragSlider({
    sliderSelector: "#visualSlider",
    trackSelector: "#visualTrack",
    slideSelector: ".visual-slide",
    autoPlay: true,
    delay: 3500
  });

if (window.matchMedia("(min-width: 769px)").matches) {
  createInfiniteDragSlider({
    sliderSelector: "#gallerySlider",
    trackSelector: "#galleryTrack",
    slideSelector: ".gallery-slide",
    autoPlay: true,
    delay: 3000
  });
}

  initNoticeTabs();
  initNoticeCardActive();
  initTopButton();
  initScrollReveal();
  initMobileMenu();
  initResponsiveVisualImages();
});

/*
  반복형 슬라이드
*/
function createInfiniteDragSlider(options) {
  const slider = document.querySelector(options.sliderSelector);
  const track = document.querySelector(options.trackSelector);
  const originalSlides = track
    ? Array.from(track.querySelectorAll(options.slideSelector))
    : [];

  if (!slider || !track || originalSlides.length === 0) return;

  const autoPlay = options.autoPlay ?? true;
  const delay = options.delay ?? 3000;

  let currentIndex = originalSlides.length;
  let gap = 0;
  let currentTranslate = 0;
  let startX = 0;
  let moveX = 0;
  let isDragging = false;
  let animationId = null;
  let timer = null;
  let slides = [];

  const firstClones = originalSlides.map(function (slide) {
    const clone = slide.cloneNode(true);
    clone.classList.add("is-clone");
    return clone;
  });

  const lastClones = originalSlides.map(function (slide) {
    const clone = slide.cloneNode(true);
    clone.classList.add("is-clone");
    return clone;
  });

  lastClones.reverse().forEach(function (clone) {
    track.insertBefore(clone, track.firstChild);
  });

  firstClones.forEach(function (clone) {
    track.appendChild(clone);
  });

  slides = Array.from(track.children);

  function getGapValue() {
    const style = window.getComputedStyle(track);
    const columnGap = parseFloat(style.columnGap || style.gap || 0);
    return Number.isNaN(columnGap) ? 0 : columnGap;
  }

  function getSlideOffset(index) {
    let offset = 0;

    for (let i = 0; i < index; i++) {
      offset += slides[i].getBoundingClientRect().width;

      if (i < index) {
        offset += gap;
      }
    }

    return offset;
  }

  function getCurrentSlideWidth() {
    const currentSlide = slides[currentIndex];

    if (!currentSlide) return 0;

    return currentSlide.getBoundingClientRect().width + gap;
  }

  function setSize() {
    slides = Array.from(track.children);
    gap = getGapValue();
    moveToIndex(currentIndex, false);
  }

  function moveToIndex(index, transition = true) {
    currentIndex = index;
    currentTranslate = -getSlideOffset(currentIndex);

    if (transition) {
      track.style.transition = "transform 0.45s ease";
    } else {
      track.style.transition = "none";
    }

    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  }

  function nextSlide() {
    moveToIndex(currentIndex + 1, true);
  }

  function prevSlide() {
    moveToIndex(currentIndex - 1, true);
  }

  function checkLoopPosition() {
    const total = originalSlides.length;

    if (currentIndex >= total * 2) {
      currentIndex = total;
      moveToIndex(currentIndex, false);
    }

    if (currentIndex < total) {
      currentIndex = total * 2 - 1;
      moveToIndex(currentIndex, false);
    }
  }

  function startAutoPlay() {
    if (!autoPlay) return;

    stopAutoPlay();

    timer = setInterval(function () {
      nextSlide();
    }, delay);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function getClientX(event) {
    if (event.type.includes("touch")) {
      return event.touches[0].clientX;
    }

    return event.clientX;
  }

  function dragStart(event) {
    isDragging = true;
    startX = getClientX(event);
    moveX = 0;

    slider.classList.add("grabbing");
    track.style.transition = "none";

    stopAutoPlay();
    cancelAnimationFrame(animationId);
  }

  function dragMove(event) {
    if (!isDragging) return;

    const currentX = getClientX(event);
    moveX = currentX - startX;

    animationId = requestAnimationFrame(function () {
      track.style.transform = `translate3d(${currentTranslate + moveX}px, 0, 0)`;
    });
  }

  function dragEnd() {
    if (!isDragging) return;

    const currentSlideWidth = getCurrentSlideWidth();

    isDragging = false;
    slider.classList.remove("grabbing");

    if (Math.abs(moveX) > currentSlideWidth * 0.18) {
      if (moveX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      moveToIndex(currentIndex, true);
    }

    startAutoPlay();
  }

  track.addEventListener("transitionend", checkLoopPosition);

  slider.addEventListener("mousedown", dragStart);
  window.addEventListener("mousemove", dragMove);
  window.addEventListener("mouseup", dragEnd);

  slider.addEventListener("touchstart", dragStart, { passive: true });
  slider.addEventListener("touchmove", dragMove, { passive: true });
  slider.addEventListener("touchend", dragEnd);

  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  window.addEventListener("resize", setSize);

  setSize();
  startAutoPlay();
}

/* 공지사항 탭 */
function initNoticeTabs() {
  const tabs = document.querySelectorAll(".notice-tab");
  const contents = document.querySelectorAll(".notice-card-list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.dataset.tab;

      tabs.forEach(function (item) {
        item.classList.remove("active");
      });

      contents.forEach(function (content) {
        content.classList.remove("active");
      });

      tab.classList.add("active");

      const activeContent = document.querySelector(
        `.notice-card-list[data-content="${target}"]`
      );

      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
}

/* 공지사항 카드 active */
function initNoticeCardActive() {
  const noticeLists = document.querySelectorAll(".notice-card-list");

  noticeLists.forEach(function (list) {
    const cards = list.querySelectorAll(".notice-card");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        cards.forEach(function (item) {
          item.classList.remove("is-active");
        });

        card.classList.add("is-active");
      });
    });
  });
}

/* 상단 이동 버튼 */
function initTopButton() {
  const topBtn = document.querySelector("#topBtn");

  if (!topBtn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* 스크롤 등장 애니메이션 */
function initScrollReveal() {
  const revealItems = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
  );

  if (revealItems.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
}

/* 모바일 메뉴 */
function initMobileMenu() {
  const menuBtn = document.querySelector("#mobileMenuBtn");
  const overlay = document.querySelector("#mobileMenuOverlay");
  const menuItems = document.querySelectorAll(".mobile-nav-item:not(.no-sub)");

  if (!menuBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add("active");
    document.body.classList.add("mobile-menu-open");
    menuBtn.setAttribute("aria-label", "모바일 메뉴 닫기");
  }

  function closeMenu() {
    overlay.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");
    menuBtn.setAttribute("aria-label", "모바일 메뉴 열기");
  }

  function toggleMenu() {
    if (overlay.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuBtn.addEventListener("click", toggleMenu);

  menuItems.forEach(function (item) {
    const titleBtn = item.querySelector(".mobile-nav-title");

    if (!titleBtn) return;

    titleBtn.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 769px)").matches) {
      overlay.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
      menuBtn.setAttribute("aria-label", "모바일 메뉴 열기");
    }
  });
}

/* 모바일/데스크톱 visual 배너 이미지 교체 */
function initResponsiveVisualImages() {
  const visualImages = document.querySelectorAll(".visual-main-img");

  if (visualImages.length === 0) return;

  function changeVisualImages() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    visualImages.forEach(function (img) {
      const desktopSrc = img.dataset.desktopSrc;
      const mobileSrc = img.dataset.mobileSrc;

      if (isMobile && mobileSrc) {
        img.setAttribute("src", mobileSrc);
      }

      if (!isMobile && desktopSrc) {
        img.setAttribute("src", desktopSrc);
      }
    });
  }

  changeVisualImages();
  window.addEventListener("resize", changeVisualImages);
}