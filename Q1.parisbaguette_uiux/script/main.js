// Hero Infinite Loop + Continuous Drag Slide
const heroSlider = document.getElementById("heroSlider");
const heroOriginalSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroPagination = document.getElementById("heroPagination");

let heroIndex = 1;
let heroTimer = null;
let heroStartX = 0;
let heroMoveX = 0;
let heroDragging = false;
let heroMoving = false;

const heroSlideCount = heroOriginalSlides.length;

const heroFirstClone = heroOriginalSlides[0].cloneNode(true);
const heroLastClone = heroOriginalSlides[heroSlideCount - 1].cloneNode(true);

heroFirstClone.classList.add("clone");
heroLastClone.classList.add("clone");

heroSlider.appendChild(heroFirstClone);
heroSlider.insertBefore(heroLastClone, heroOriginalSlides[0]);

heroOriginalSlides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "hero-dot";
  dot.setAttribute("aria-label", `${index + 1}번 슬라이드로 이동`);

  dot.addEventListener("click", () => {
    if (heroMoving) return;

    heroIndex = index + 1;
    updateHeroSlide();
    restartHeroAuto();
  });

  heroPagination.appendChild(dot);
});

const heroDots = document.querySelectorAll(".hero-dot");

function setHeroPosition(withTransition = true) {
  heroSlider.style.transition = withTransition ? "transform 0.45s ease" : "none";
  heroSlider.style.transform = `translateX(-${heroIndex * 100}%)`;
}

function fixHeroLoopPosition() {
  if (heroIndex === heroSlideCount + 1) {
    heroIndex = 1;
    setHeroPosition(false);
  }

  if (heroIndex === 0) {
    heroIndex = heroSlideCount;
    setHeroPosition(false);
  }
}

function updateHeroDots() {
  let realIndex = heroIndex - 1;

  if (heroIndex === 0) {
    realIndex = heroSlideCount - 1;
  }

  if (heroIndex === heroSlideCount + 1) {
    realIndex = 0;
  }

  heroDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === realIndex);
  });
}

function updateHeroSlide() {
  heroMoving = true;
  setHeroPosition(true);
  updateHeroDots();
}

function nextHeroSlide() {
  if (heroMoving) return;
  heroIndex++;
  updateHeroSlide();
}

function prevHeroSlide() {
  if (heroMoving) return;
  heroIndex--;
  updateHeroSlide();
}

heroSlider.addEventListener("transitionend", () => {
  fixHeroLoopPosition();
  updateHeroDots();
  heroMoving = false;
});

function startHeroAuto() {
  heroTimer = setInterval(() => {
    nextHeroSlide();
  }, 3000);
}

function stopHeroAuto() {
  clearInterval(heroTimer);
}

function restartHeroAuto() {
  stopHeroAuto();
  startHeroAuto();
}

function getHeroClientX(event) {
  if (event.type.includes("mouse")) {
    return event.clientX;
  }

  return event.touches[0].clientX;
}

function heroDragStart(event) {
  if (heroMoving) return;

  fixHeroLoopPosition();

  heroDragging = true;
  heroStartX = getHeroClientX(event);
  heroMoveX = 0;

  heroSlider.style.transition = "none";
  stopHeroAuto();
}

function heroDragMove(event) {
  if (!heroDragging) return;

  const currentX = getHeroClientX(event);
  heroMoveX = currentX - heroStartX;
  const movePercent = (heroMoveX / heroSlider.offsetWidth) * 100;

  heroSlider.style.transform = `translateX(calc(-${heroIndex * 100}% + ${movePercent}%))`;
}

function heroDragEnd() {
  if (!heroDragging) return;

  const dragLimit = heroSlider.offsetWidth * 0.18;

  if (heroMoveX < -dragLimit) {
    heroIndex++;
    updateHeroSlide();
  } else if (heroMoveX > dragLimit) {
    heroIndex--;
    updateHeroSlide();
  } else {
    setHeroPosition(true);
  }

  heroDragging = false;
  heroStartX = 0;
  heroMoveX = 0;

  restartHeroAuto();
}

heroSlider.addEventListener("touchstart", heroDragStart);
heroSlider.addEventListener("touchmove", heroDragMove);
heroSlider.addEventListener("touchend", heroDragEnd);
heroSlider.addEventListener("touchcancel", heroDragEnd);

heroSlider.addEventListener("mousedown", heroDragStart);
window.addEventListener("mousemove", heroDragMove);
window.addEventListener("mouseup", heroDragEnd);

setHeroPosition(false);
updateHeroDots();
startHeroAuto();


// Product Infinite Loop Slide - Button Control
const productTrack = document.getElementById("productTrack");
const productOriginalCards = Array.from(document.querySelectorAll(".product-card"));
const productPrevBtn = document.querySelector(".product-btn--prev");
const productNextBtn = document.querySelector(".product-btn--next");

let productIndex = 1;
let productTimer = null;
let productMoving = false;
const productCardCount = productOriginalCards.length;

const productFirstClone = productOriginalCards[0].cloneNode(true);
const productLastClone = productOriginalCards[productCardCount - 1].cloneNode(true);

productFirstClone.classList.add("clone");
productLastClone.classList.add("clone");

productTrack.appendChild(productFirstClone);
productTrack.insertBefore(productLastClone, productOriginalCards[0]);

function setProductPosition(withTransition = true) {
  productTrack.style.transition = withTransition ? "transform 0.45s ease" : "none";
  productTrack.style.transform = `translateX(-${productIndex * 100}%)`;
}

function nextProductSlide() {
  if (productMoving) return;
  productMoving = true;
  productIndex++;
  setProductPosition(true);
}

function prevProductSlide() {
  if (productMoving) return;
  productMoving = true;
  productIndex--;
  setProductPosition(true);
}

productTrack.addEventListener("transitionend", () => {
  if (productIndex === productCardCount + 1) {
    productIndex = 1;
    setProductPosition(false);
  }

  if (productIndex === 0) {
    productIndex = productCardCount;
    setProductPosition(false);
  }

  productMoving = false;
});

function startProductAuto() {
  productTimer = setInterval(() => {
    nextProductSlide();
  }, 3000);
}

function stopProductAuto() {
  clearInterval(productTimer);
}

function restartProductAuto() {
  stopProductAuto();
  startProductAuto();
}

productNextBtn.addEventListener("click", () => {
  nextProductSlide();
  restartProductAuto();
});

productPrevBtn.addEventListener("click", () => {
  prevProductSlide();
  restartProductAuto();
});

setProductPosition(false);
startProductAuto();


// Bottom Nav Active
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});



// Mobile Slide Menu
const menuBtn = document.querySelector(".menu-btn");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-nav a");

function openMobileMenu() {
  mobileMenuOverlay.classList.add("is-active");
  mobileMenuPanel.classList.add("is-active");
  document.body.classList.add("menu-open");

  menuBtn.setAttribute("aria-label", "메뉴 닫기");
  menuBtn.setAttribute("aria-expanded", "true");
  mobileMenuOverlay.setAttribute("aria-hidden", "false");
  mobileMenuPanel.setAttribute("aria-hidden", "false");
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove("is-active");
  mobileMenuPanel.classList.remove("is-active");
  document.body.classList.remove("menu-open");

  menuBtn.setAttribute("aria-label", "메뉴 열기");
  menuBtn.setAttribute("aria-expanded", "false");
  mobileMenuOverlay.setAttribute("aria-hidden", "true");
  mobileMenuPanel.setAttribute("aria-hidden", "true");
}

if (menuBtn && mobileMenuOverlay && mobileMenuPanel && mobileMenuClose) {
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-controls", "mobileMenuPanel");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenuPanel.classList.contains("is-active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenuClose.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}