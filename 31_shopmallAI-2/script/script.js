
  
    const swiper = new Swiper('.mainVisualSwiper', {
      autoplay: {
      delay: 3000, // 3초마다 슬라이드 전환
      disableOnInteraction: false, // 사용자 조작 후에도 자동 재생 유지
      },
    
      loop: true,
      speed: 700,
      navigation: {
        prevEl: '.slide-btn-prev',
        nextEl: '.slide-btn-next',
      },
      pagination: {
        el: '.slide-fraction',
        type: 'fraction',
        formatFractionCurrent: function (number) {
          return number;
        },
        formatFractionTotal: function (number) {
          return number;
        },
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span> / <span class="' + totalClass + '"></span>';
        },
      },
    });
  




  
    const track = document.getElementById('regularSideDishTrack');
    const prevBtn = document.querySelector('.regular-side-dish-prev');
    const nextBtn = document.querySelector('.regular-side-dish-next');

    const visibleCount = 4;
    const originalCards = Array.from(track.children);
    const totalCount = originalCards.length;
    const cardWidth = 280;
    const gap = 16;
    const moveWidth = cardWidth + gap;

    originalCards.slice(0, visibleCount).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    let currentIndex = 0;
    let autoSlide = null;
    let isTransitioning = false;

    function updateSlider(useTransition = true) {
      track.style.transition = useTransition ? 'transform 0.35s ease' : 'none';
      track.style.transform = `translateX(-${currentIndex * moveWidth}px)`;
    }

    function moveNext() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex += 1;
      updateSlider(true);
    }

    function movePrev() {
      if (isTransitioning) return;

      if (currentIndex > 0) {
        isTransitioning = true;
        currentIndex -= 1;
        updateSlider(true);
      }
    }

    function startAutoSlide() {
      if (autoSlide) return;

      autoSlide = setInterval(() => {
        moveNext();
      }, 3000);
    }

    track.addEventListener('transitionend', () => {
      if (currentIndex >= totalCount) {
        currentIndex = 0;
        updateSlider(false);
      }
      isTransitioning = false;
    });

    prevBtn.addEventListener('click', () => {
      movePrev();
    });

    nextBtn.addEventListener('click', () => {
      moveNext();
    });

    updateSlider(false);
    startAutoSlide();
  

  
  const mdRecommendData = {
    popular: [
      {
        image: "./images/04_md_banchan/imgi_56_ZIP_P_0214_A.png",
        name: "[집더소] 두부냉면",
        desc: "여름에도 맛있게 먹는 담백한 별미 한 그릇",
        price: "3,500원"
      },
      {
        image: "./images/04_md_banchan/imgi_58_ZIP_P_0213_A.png",
        name: "[집더소] 한돈 순두부 덮밥",
        desc: "불향을 입은 든든한 한돈 순두부 소스",
        price: "3,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_59_main_5.jpg",
        name: "[집더소] 한우 하이라이스 덮밥",
        desc: "부드럽고 깊은 풍미의 한우 소스 덮밥",
        price: "4,200원"
      },
      {
        image: "./images/04_md_banchan/imgi_60_main_37.jpg",
        name: "한돈 제육볶음",
        desc: "매콤달콤한 양념으로 완성한 인기 메인 반찬",
        price: "6,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_252_ZIP_P_8073_A.jpg",
        name: "[집더소] 두부냉면",
        desc: "여름에도 맛있게 먹는 담백한 별미 한 그릇",
        price: "3,500원"
      },
      {
        image: "./images/04_md_banchan/imgi_253_ZIP_P_8075_A.jpg",
        name: "[집더소] 한돈 순두부 덮밥",
        desc: "불향을 입은 든든한 한돈 순두부 소스",
        price: "3,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_254_ZIP_P_8067_A.jpg",
        name: "[집더소] 한우 하이라이스 덮밥",
        desc: "부드럽고 깊은 풍미의 한우 소스 덮밥",
        price: "4,200원"
      },
      {
        image: "./images/04_md_banchan/imgi_255_ZIP_P_8066_A.jpg",
        name: "한돈 제육볶음",
        desc: "매콤달콤한 양념으로 완성한 인기 메인 반찬",
        price: "6,800원"
      },
      
    ],

    soup: [
      {
        image: "./images/04_md_banchan/imgi_256_muchim_8.jpg",
        name: "[원더스푼] 된장국",
        desc: "구수하고 편안하게 즐기는 집밥 국물 반찬",
        price: "3,200원"
      },
      {
        image: "./images/04_md_banchan/imgi_257_muchim_16.jpg",
        name: "맑은 순두부찌개",
        desc: "부드럽고 담백해서 부담 없이 즐기기 좋은 찌개",
        price: "4,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_258_muchim_9.jpg",
        name: "맑은 한우 배추국",
        desc: "개운하고 담백한 맛으로 즐기는 한우 국",
        price: "9,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_259_muchim_35.jpg",
        name: "소고기 미역국",
        desc: "진한 국물 맛으로 든든하게 즐기는 기본 국",
        price: "5,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_260_fry_4.jpg",
        name: "[원더스푼] 된장국",
        desc: "구수하고 편안하게 즐기는 집밥 국물 반찬",
        price: "3,200원"
      },
      {
        image: "./images/04_md_banchan/imgi_261_fry_1.jpg",
        name: "맑은 순두부찌개",
        desc: "부드럽고 담백해서 부담 없이 즐기기 좋은 찌개",
        price: "4,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_262_fry_3.jpg",
        name: "맑은 한우 배추국",
        desc: "개운하고 담백한 맛으로 즐기는 한우 국",
        price: "9,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_263_fry_5.jpg",
        name: "소고기 미역국",
        desc: "진한 국물 맛으로 든든하게 즐기는 기본 국",
        price: "5,300원"
      },
    ],

    kids: [
      {
        image: "./images/01_banchan/메추리알.jpg",
        name: "메추리알 간장조림",
        desc: "아이들도 좋아하는 달콤짭짤한 인기 반찬",
        price: "3,400원"
      },
      {
        image: "./images/01_banchan/한우야채카레.jpg",
        name: "한우야채카레",
        desc: "부드러운 야채와 한우로 만든 어린이 추천 메뉴",
        price: "3,800원"
      },
      {
        image: "./images/01_banchan/한우소고기미역국.jpg",
        name: "한우 소고기 미역국",
        desc: "영양 가득 담은 어린이 국물 반찬",
        price: "4,700원"
      },
      {
        image: "./images/04_md_banchan/imgi_263_fry_5.jpg",
        name: "아이들 한우 비빔밥",
        desc: "아이들도 맛있게 먹는 비빔밥 한상",
        price: "9,400원"
      },
      {
        image: "./images/01_banchan/sample_1.png",
        name: "메추리알 간장조림",
        desc: "아이들도 좋아하는 달콤짭짤한 인기 반찬",
        price: "3,400원"
      },
      {
        image: "./images/01_banchan/sample_2.jpg",
        name: "한우야채카레",
        desc: "부드러운 야채와 한우로 만든 어린이 추천 메뉴",
        price: "3,800원"
      },
      {
        image: "./images/01_banchan/sample_3.jpg",
        name: "한우 소고기 미역국",
        desc: "영양 가득 담은 어린이 국물 반찬",
        price: "4,700원"
      },
      {
        image: "./images/01_banchan/sample_4.jpg",
        name: "아이들 한우 비빔밥",
        desc: "아이들도 맛있게 먹는 비빔밥 한상",
        price: "9,400원"
      },
    ],

    fried: [
      {
        image: "./images/01_banchan/sample_1.png",
        name: "진미채볶음",
        desc: "달콤짭짤하게 즐기는 밥도둑 볶음 반찬",
        price: "4,200원"
      },
      {
        image: "./images/01_banchan/sample_2.jpg",
        name: "소불고기 볶음",
        desc: "부드러운 소고기와 달큰한 양념의 조화",
        price: "6,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_254_ZIP_P_8067_A.jpg",
        name: "잡채",
        desc: "탱글한 당면과 채소를 함께 볶아낸 인기 반찬",
        price: "12,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_255_ZIP_P_8066_A.jpg",
        name: "한돈 제육볶음",
        desc: "매콤한 양념으로 든든하게 즐기는 볶음 요리",
        price: "6,800원"
      },
      {
        image: "./images/01_banchan/sample_1.png",
        name: "진미채볶음",
        desc: "달콤짭짤하게 즐기는 밥도둑 볶음 반찬",
        price: "4,200원"
      },
      {
        image: "./images/01_banchan/sample_2.jpg",
        name: "소불고기 볶음",
        desc: "부드러운 소고기와 달큰한 양념의 조화",
        price: "6,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_254_ZIP_P_8067_A.jpg",
        name: "잡채",
        desc: "탱글한 당면과 채소를 함께 볶아낸 인기 반찬",
        price: "12,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_255_ZIP_P_8066_A.jpg",
        name: "한돈 제육볶음",
        desc: "매콤한 양념으로 든든하게 즐기는 볶음 요리",
        price: "6,800원"
      },
    ],

    seasoned: [
      {
        image: "./images/04_md_banchan/imgi_266_208_ZIP_P_4020_A.jpg",
        name: "무생채",
        desc: "새콤달콤한 맛으로 입맛을 돋우는 반찬",
        price: "2,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_267_jolim_31.jpg",
        name: "콩나물무침",
        desc: "담백하고 고소하게 즐기는 기본 나물 반찬",
        price: "2,800원"
      },
      {
        image: "./images/01_banchan/sample_3.jpg",
        name: "시래기 들깨무침",
        desc: "구수한 들깨 향이 살아있는 건강 반찬",
        price: "4,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_265_jolim_13.jpg",
        name: "오이무침",
        desc: "아삭한 식감과 산뜻한 양념이 어울리는 반찬",
        price: "3,300원"
      },
      {
        image: "./images/04_md_banchan/imgi_266_208_ZIP_P_4020_A.jpg",
        name: "무생채",
        desc: "새콤달콤한 맛으로 입맛을 돋우는 반찬",
        price: "2,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_267_jolim_31.jpg",
        name: "콩나물무침",
        desc: "담백하고 고소하게 즐기는 기본 나물 반찬",
        price: "2,800원"
      },
      {
        image: "./images/01_banchan/sample_3.jpg",
        name: "시래기 들깨무침",
        desc: "구수한 들깨 향이 살아있는 건강 반찬",
        price: "4,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_265_jolim_13.jpg",
        name: "오이무침",
        desc: "아삭한 식감과 산뜻한 양념이 어울리는 반찬",
        price: "3,300원"
      },
    ],

    main: [
      {
        image: "./images/01_banchan/한끼 한돈 김치두루치기 완조리.jpg",
        name: "한돈 김치두루치기",
        desc: "국내산 한돈으로 만든 든든한 메인요리",
        price: "5,400원"
      },
      {
        image: "./images/01_banchan/sample_4.jpg",
        name: "닭갈비",
        desc: "매콤달콤한 양념으로 완성한 든든한 한 끼",
        price: "5,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_263_fry_5.jpg",
        name: "한우 스테이크소스 덮밥",
        desc: "진한 풍미의 소스로 완성한 메인 식사",
        price: "4,600원"
      },
      {
        image: "./images/04_md_banchan/imgi_252_ZIP_P_8073_A.jpg",
        name: "쭈꾸미 미니 바질 파스타",
        desc: "쫄깃한 식감과 바질 향을 즐기는 별미 메뉴",
        price: "12,800원"
      },
      {
        image: "./images/01_banchan/한끼 한돈 김치두루치기 완조리.jpg",
        name: "한돈 김치두루치기",
        desc: "국내산 한돈으로 만든 든든한 메인요리",
        price: "5,400원"
      },
      {
        image: "./images/01_banchan/sample_4.jpg",
        name: "닭갈비",
        desc: "매콤달콤한 양념으로 완성한 든든한 한 끼",
        price: "5,900원"
      },
      {
        image: "./images/04_md_banchan/imgi_263_fry_5.jpg",
        name: "한우 스테이크소스 덮밥",
        desc: "진한 풍미의 소스로 완성한 메인 식사",
        price: "4,600원"
      },
      {
        image: "./images/04_md_banchan/imgi_252_ZIP_P_8073_A.jpg",
        name: "쭈꾸미 미니 바질 파스타",
        desc: "쫄깃한 식감과 바질 향을 즐기는 별미 메뉴",
        price: "12,800원"
      },
    ],

    braised: [
      {
        image: "./images/01_banchan/메추리알.jpg",
        name: "메추리알 간장조림",
        desc: "언제 먹어도 질리지 않는 집반찬 인기 메뉴",
        price: "3,400원"
      },
      {
        image: "./images/04_md_banchan/imgi_265_jolim_13.jpg",
        name: "감자조림",
        desc: "포슬포슬한 감자에 간장 양념을 더한 반찬",
        price: "3,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_267_jolim_31.jpg",
        name: "콩조림",
        desc: "고소하고 짭조름하게 즐기는 기본 조림 반찬",
        price: "2,900원"
      },
      {
        image: "./images/01_banchan/sample_2.jpg",
        name: "소고기 장조림",
        desc: "부드러운 소고기를 짭조름하게 조려낸 반찬",
        price: "6,900원"
      },
      {
        image: "./images/01_banchan/메추리알.jpg",
        name: "메추리알 간장조림",
        desc: "언제 먹어도 질리지 않는 집반찬 인기 메뉴",
        price: "3,400원"
      },
      {
        image: "./images/04_md_banchan/imgi_265_jolim_13.jpg",
        name: "감자조림",
        desc: "포슬포슬한 감자에 간장 양념을 더한 반찬",
        price: "3,800원"
      },
      {
        image: "./images/04_md_banchan/imgi_267_jolim_31.jpg",
        name: "콩조림",
        desc: "고소하고 짭조름하게 즐기는 기본 조림 반찬",
        price: "2,900원"
      },
      {
        image: "./images/01_banchan/sample_2.jpg",
        name: "소고기 장조림",
        desc: "부드러운 소고기를 짭조름하게 조려낸 반찬",
        price: "6,900원"
      },
    ]
  };

  const mdTabs = document.querySelectorAll(".md-recommend-tab");
  const mdGrid = document.querySelector("#mdRecommendGrid");

  function createMdRecommendCard(product) {
    return `
      <article class="md-recommend-card">
        <div class="md-recommend-thumb">
          <img src="${product.image}" alt="${product.name}" />
          <div class="md-recommend-cart-icon">
            <img src="./images/icons/lock.png" alt="장바구니 아이콘" />
          </div>
        </div>
        <div class="md-recommend-content">
          <h3 class="md-recommend-name">${product.name}</h3>
          <p class="md-recommend-desc">${product.desc}</p>
          <div class="md-recommend-price-wrap">
            <p class="md-recommend-price">${product.price}</p>
          </div>
        </div>
      </article>
    `;
  }

  function renderMdRecommendProducts(category) {
    const products = mdRecommendData[category];

    mdGrid.classList.add("is-changing");

    setTimeout(() => {
      mdGrid.innerHTML = products.map(createMdRecommendCard).join("");
      mdGrid.classList.remove("is-changing");
    }, 150);
  }

  mdTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;

      mdTabs.forEach((item) => {
        item.classList.remove("is-active");
      });

      tab.classList.add("is-active");
      renderMdRecommendProducts(category);
    });
  });

  renderMdRecommendProducts("popular");


  /* ================================
  Scroll Reveal Animation
================================ */

document.addEventListener("DOMContentLoaded", function () {
  const revealSelectors = [
    ".top-box",
    ".main-visual",
    ".side-dish-header",
    ".side-dish-card",
    ".regular-side-dish-header",
    ".regular-side-dish-slider",
    ".new-side-dish-header",
    ".new-side-dish-card",
    ".banner-box",
    ".md-recommend-header",
    ".md-recommend-tabs",
    ".md-recommend-card",
    ".green-box"
  ];

  function setRevealElements() {
    revealSelectors.forEach(function (selector) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(function (element, index) {
        if (element.classList.contains("scroll-reveal")) return;

        element.classList.add("scroll-reveal");

        const delayNumber = index % 4;

        if (delayNumber === 1) {
          element.classList.add("delay-1");
        } else if (delayNumber === 2) {
          element.classList.add("delay-2");
        } else if (delayNumber === 3) {
          element.classList.add("delay-3");
        } else if (delayNumber === 0 && index !== 0) {
          element.classList.add("delay-4");
        }
      });
    });
  }

  setRevealElements();

  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });

  /*
    md-recommend-card처럼 tab 클릭 후
    JavaScript로 새로 생성되는 카드에도 애니메이션 적용
  */
  const mdRecommendGrid = document.querySelector(".md-recommend-grid");

  if (mdRecommendGrid) {
    const mutationObserver = new MutationObserver(function () {
      const newCards = mdRecommendGrid.querySelectorAll(".md-recommend-card");

      newCards.forEach(function (card, index) {
        if (!card.classList.contains("scroll-reveal")) {
          card.classList.add("scroll-reveal");

          const delayNumber = index % 4;

          if (delayNumber === 1) {
            card.classList.add("delay-1");
          } else if (delayNumber === 2) {
            card.classList.add("delay-2");
          } else if (delayNumber === 3) {
            card.classList.add("delay-3");
          } else if (delayNumber === 0 && index !== 0) {
            card.classList.add("delay-4");
          }

          revealObserver.observe(card);

          setTimeout(function () {
            card.classList.add("is-visible");
          }, 50);
        }
      });
    });

    mutationObserver.observe(mdRecommendGrid, {
      childList: true
    });
  }
});



/* ================================
  Scroll Top Button
================================ */

document.addEventListener("DOMContentLoaded", function () {
  const scrollTopButton = document.createElement("button");

  scrollTopButton.className = "scroll-top-button";
  scrollTopButton.type = "button";
  scrollTopButton.setAttribute("aria-label", "맨 위로 이동");
  scrollTopButton.innerHTML = "<span>↑</span>";

  document.body.appendChild(scrollTopButton);

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY > 400) {
      scrollTopButton.classList.add("is-show");
    } else {
      scrollTopButton.classList.remove("is-show");
    }
  });

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});