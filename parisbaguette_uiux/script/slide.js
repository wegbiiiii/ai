const nextBtn = document.querySelector("#nextBtn");
const orderBtn = document.querySelector("#orderBtn");

const swiper = new Swiper(".onboarding-swiper", {
  loop: true,
  speed: 600,
  allowTouchMove: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  on: {
    slideChange: function () {
      updateButton(this.realIndex);
    }
  }
});

function updateButton(index) {
  const lastIndex = 2;

  if (index === lastIndex) {
    nextBtn.style.display = "none";
    orderBtn.style.display = "flex";
  } else {
    nextBtn.style.display = "flex";
    orderBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", function () {
  swiper.slideNext();
});

orderBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const targetUrl = orderBtn.getAttribute("href");

  document.body.classList.add("page-fade-out");

  setTimeout(function () {
    window.location.href = targetUrl;
  }, 550);
});

updateButton(swiper.realIndex);