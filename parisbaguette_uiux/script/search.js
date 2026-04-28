"use strict";

/*
  실제 API 서버 주소를 나중에 넣을 수 있도록 비워둔 상태입니다.
  현재 코드는 mockStores 데이터를 기준으로 동작합니다.
*/
const API_BASE_URL = "";
const PUBLIC_API_KEY = "";

/*
  카카오맵 JavaScript 키
  YOUR_KAKAO_APP_KEY 부분에 본인 카카오 Developers JavaScript 키를 넣어주세요.

  중요:
  search.html의 head 안에 있던 아래 카카오맵 SDK 코드는 삭제하세요.

  <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&libraries=services"></script>

  지도는 map 버튼을 눌렀을 때만 동적으로 불러옵니다.
*/
const KAKAO_JS_KEY = "ba55f074c6737f19be5b6e2e4944c6ec";

let isKakaoScriptLoading = false;
let isKakaoScriptLoaded = false;

/* Mock Store Data */
const mockStores = [
  {
    id: 1,
    name: "김포청송마을점",
    address: "경기도 김포시 장기동 1324",
    tel: "031-000-1001",
    delivery: true,
    parking: true,
    lat: 37.64579,
    lng: 126.66731,
    image: "./images/store-01.jpg",
    detailImage: "./images/store-main.jpg"
  },
  {
    id: 2,
    name: "장기신도시점",
    address: "경기도 김포시 장기동",
    tel: "031-000-1002",
    delivery: true,
    parking: true,
    lat: 37.64195,
    lng: 126.6712,
    image: "./images/store-02.jpg",
    detailImage: "./images/store-main.jpg"
  },
  {
    id: 3,
    name: "김포월드점",
    address: "경기도 김포시 김포한강1로 133",
    tel: "031-000-1003",
    delivery: true,
    parking: true,
    lat: 37.63974,
    lng: 126.67572,
    image: "./images/store-03.jpg",
    detailImage: "./images/store-main.jpg"
  },
  {
    id: 4,
    name: "김포구래점",
    address: "경기도 김포시 구래동 6880",
    tel: "031-000-1004",
    delivery: true,
    parking: false,
    lat: 37.64508,
    lng: 126.62871,
    image: "./images/store-04.jpg",
    detailImage: "./images/store-main.jpg"
  },
  {
    id: 5,
    name: "김포사우점",
    address: "경기도 김포시 사우동 251",
    tel: "031-000-1005",
    delivery: false,
    parking: true,
    lat: 37.61913,
    lng: 126.71682,
    image: "./images/store-05.jpg",
    detailImage: "./images/store-main.jpg"
  }
];

/* Mock Product Data */
const mockProducts = [
  {
    id: 1,
    name: "FRESH 한입 쏙 미니버거",
    price: "4,800원",
    category: "recommend",
    image: "./images/product-burger.jpg"
  },
  {
    id: 2,
    name: "통밀 샌드위치",
    price: "6,200원",
    category: "sandwich",
    image: "./images/product-burger.jpg"
  },
  {
    id: 3,
    name: "쫄깃한 소금빵",
    price: "3,200원",
    category: "bread",
    image: "./images/product-burger.jpg"
  },
  {
    id: 4,
    name: "생크림 케이크 조각",
    price: "5,800원",
    category: "cake",
    image: "./images/product-burger.jpg"
  },
  {
    id: 5,
    name: "미니 마들렌 세트",
    price: "4,500원",
    category: "dessert",
    image: "./images/product-burger.jpg"
  },
  {
    id: 6,
    name: "아이스 아메리카노",
    price: "3,500원",
    category: "coffee",
    image: "./images/product-burger.jpg"
  },
  {
    id: 7,
    name: "딸기 크림빵",
    price: "4,300원",
    category: "recommend",
    image: "./images/product-burger.jpg"
  },
  {
    id: 8,
    name: "모닝 바게트",
    price: "3,900원",
    category: "bread",
    image: "./images/product-burger.jpg"
  },
  {
    id: 9,
    name: "치킨 샐러드",
    price: "7,200원",
    category: "sandwich",
    image: "./images/product-burger.jpg"
  }
];

/* DOM */
const pages = document.querySelectorAll(".page");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recentKeywords = document.getElementById("recentKeywords");

const resultList = document.getElementById("resultList");

const mapOpenBtn = document.getElementById("mapOpenBtn");
const mapStoreList = document.getElementById("mapStoreList");

const detailStoreName = document.getElementById("detailStoreName");
const detailStoreAddress = document.getElementById("detailStoreAddress");
const detailStoreImage = document.getElementById("detailStoreImage");

const deliveryInfo = document.getElementById("deliveryInfo");
const pickupInfo = document.getElementById("pickupInfo");

const productList = document.getElementById("productList");
const menuTabs = document.getElementById("menuTabs");

/* State */
let selectedStore = null;
let previousPageId = "resultPage";

let kakaoMap = null;
let kakaoMarkers = [];

const RECENT_KEY = "pb_recent_keywords";

/* Page Control */
function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

/* Kakao Map Lazy Loading */
function loadKakaoMapScript(callback) {
  if (window.kakao && window.kakao.maps) {
    kakao.maps.load(() => {
      callback();
    });
    return;
  }

  if (isKakaoScriptLoading) {
    const checkLoaded = setInterval(() => {
      if (isKakaoScriptLoaded && window.kakao && window.kakao.maps) {
        clearInterval(checkLoaded);

        kakao.maps.load(() => {
          callback();
        });
      }
    }, 100);

    return;
  }

  isKakaoScriptLoading = true;

  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services&autoload=false`;

  script.onload = () => {
    isKakaoScriptLoaded = true;

    kakao.maps.load(() => {
      callback();
    });
  };

  script.onerror = () => {
    isKakaoScriptLoading = false;

    const mapContainer = document.getElementById("kakaoMap");

    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="padding:20px; font-size:13px; line-height:1.6;">
          카카오맵을 불러오지 못했습니다.<br />
          JavaScript 키와 도메인 설정을 확인해주세요.
        </div>
      `;
    }

    renderMapStoreList(mockStores);
  };

  document.head.appendChild(script);
}

/* Recent Keyword */
function getRecentKeywords() {
  const saved = localStorage.getItem(RECENT_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function saveRecentKeyword(keyword) {
  const trimKeyword = keyword.trim();

  if (!trimKeyword) {
    return;
  }

  let keywords = getRecentKeywords();

  keywords = keywords.filter((item) => item !== trimKeyword);
  keywords.unshift(trimKeyword);
  keywords = keywords.slice(0, 6);

  localStorage.setItem(RECENT_KEY, JSON.stringify(keywords));
  renderRecentKeywords();
}

function renderRecentKeywords() {
  if (!recentKeywords) {
    return;
  }

  const keywords = getRecentKeywords();

  recentKeywords.innerHTML = "";

  if (keywords.length === 0) {
    recentKeywords.innerHTML = `
      <button type="button" class="keyword-btn" data-keyword="김포시">김포시</button>
    `;
    return;
  }

  keywords.forEach((keyword) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "keyword-btn";
    button.dataset.keyword = keyword;
    button.textContent = keyword;

    recentKeywords.appendChild(button);
  });
}

/* Search */
function searchStores(keyword) {
  const trimKeyword = keyword.trim();

  if (!trimKeyword) {
    return mockStores;
  }

  if (trimKeyword === "딜리버리") {
    return mockStores.filter((store) => store.delivery);
  }

  if (trimKeyword === "주차가능") {
    return mockStores.filter((store) => store.parking);
  }

  return mockStores.filter((store) => {
    return (
      store.name.includes(trimKeyword) ||
      store.address.includes(trimKeyword)
    );
  });
}

function handleSearch(keyword) {
  const trimKeyword = keyword.trim();

  if (!trimKeyword) {
    alert("검색어를 입력해주세요.");
    return;
  }

  saveRecentKeyword(trimKeyword);

  const stores = searchStores(trimKeyword);

  renderResultList(stores);
  showPage("resultPage");
}

/* Result List */
function renderResultList(stores) {
  if (!resultList) {
    return;
  }

  resultList.innerHTML = "";

  if (!stores || stores.length === 0) {
    resultList.innerHTML = `
      <div class="empty-box">
        검색 결과가 없습니다.
      </div>
    `;
    return;
  }

  stores.forEach((store) => {
    const card = document.createElement("article");
    card.className = "result-card";
    card.dataset.id = store.id;

    card.innerHTML = `
      <div class="result-info">
        <h2 class="result-title">${store.name}</h2>
        <p class="result-address">${store.address}</p>

        <div class="result-bottom">
          <button type="button" class="store-info-btn">매장정보</button>
          ${store.delivery ? `<span class="badge">딜리버리</span>` : ""}
          ${store.parking ? `<span class="badge">주차가능</span>` : ""}
        </div>
      </div>

      <button type="button" class="bookmark" aria-label="북마크"></button>

      <div class="result-thumb">
        <img src="${store.image}" alt="${store.name}" loading="lazy" />
      </div>
    `;

    const bookmarkButton = card.querySelector(".bookmark");

    if (bookmarkButton) {
      bookmarkButton.addEventListener("click", (event) => {
        event.stopPropagation();
        bookmarkButton.classList.toggle("is-active");
      });
    }

    card.addEventListener("click", () => {
      openDetail(store.id, "resultPage");
    });

    resultList.appendChild(card);
  });
}

/* Detail Page */
function openDetail(storeId, fromPage = "resultPage") {
  const store = mockStores.find((item) => item.id === Number(storeId));

  if (!store) {
    return;
  }

  previousPageId = fromPage;
  selectedStore = store;

  if (detailStoreName) {
    detailStoreName.textContent = store.name;
  }

  if (detailStoreAddress) {
    detailStoreAddress.textContent = store.address;
  }

  if (detailStoreImage) {
    detailStoreImage.src = store.detailImage;
    detailStoreImage.alt = store.name;
  }

  changeOrderType("delivery");
  renderProducts("all");
  showPage("detailPage");
}

function changeOrderType(type) {
  const orderTabs = document.querySelectorAll(".order-tab");

  orderTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.order === type);
  });

  if (deliveryInfo) {
    deliveryInfo.classList.toggle("active", type === "delivery");
  }

  if (pickupInfo) {
    pickupInfo.classList.toggle("active", type === "pickup");
  }
}

/* Product */
function renderProducts(category) {
  if (!productList) {
    return;
  }

  const filteredProducts =
    category === "all"
      ? mockProducts
      : mockProducts.filter((product) => product.category === category);

  productList.innerHTML = "";

  filteredProducts.forEach((product) => {
    const item = document.createElement("article");
    item.className = "product-card";

    item.innerHTML = `
      <div class="product-thumb">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <strong>${product.price}</strong>
      </div>

      <button type="button" class="product-bookmark" aria-label="북마크"></button>
    `;

    const productBookmarkButton = item.querySelector(".product-bookmark");

    if (productBookmarkButton) {
      productBookmarkButton.addEventListener("click", (event) => {
        event.stopPropagation();
        productBookmarkButton.classList.toggle("is-active");
      });
    }

    productList.appendChild(item);
  });
}

/* Kakao Map */
function initKakaoMap(stores) {
  const mapContainer = document.getElementById("kakaoMap");

  if (!mapContainer) {
    return;
  }

  if (!window.kakao || !window.kakao.maps) {
    mapContainer.innerHTML = `
      <div style="padding:20px; font-size:13px; line-height:1.6;">
        카카오맵 JavaScript 키를 입력하면 지도가 표시됩니다.
      </div>
    `;

    renderMapStoreList(stores);
    return;
  }

  mapContainer.innerHTML = "";

  if (!stores || stores.length === 0) {
    mapContainer.innerHTML = `
      <div style="padding:20px; font-size:13px;">
        표시할 매장 정보가 없습니다.
      </div>
    `;

    renderMapStoreList([]);
    return;
  }

  const center = new kakao.maps.LatLng(stores[0].lat, stores[0].lng);

  kakaoMap = new kakao.maps.Map(mapContainer, {
    center,
    level: 5
  });

  kakaoMarkers.forEach((marker) => marker.setMap(null));
  kakaoMarkers = [];

  const bounds = new kakao.maps.LatLngBounds();

  stores.forEach((store) => {
    const position = new kakao.maps.LatLng(store.lat, store.lng);

    const marker = new kakao.maps.Marker({
      position
    });

    marker.setMap(kakaoMap);
    kakaoMarkers.push(marker);
    bounds.extend(position);

    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:8px 10px;font-size:12px;white-space:nowrap;">
          <strong>${store.name}</strong><br />
          ${store.address}
        </div>
      `
    });

    kakao.maps.event.addListener(marker, "click", () => {
      infoWindow.open(kakaoMap, marker);
    });
  });

  kakaoMap.setBounds(bounds);

  setTimeout(() => {
    kakao.maps.event.trigger(kakaoMap, "resize");
    kakaoMap.setBounds(bounds);
  }, 100);

  renderMapStoreList(stores);
}

/* Map Store List */
function renderMapStoreList(stores) {
  if (!mapStoreList) {
    return;
  }

  mapStoreList.innerHTML = "";

  if (!stores || stores.length === 0) {
    mapStoreList.innerHTML = `
      <article class="map-store-card">
        <h3>영업점 정보가 없습니다.</h3>
        <p>검색 결과를 다시 확인해주세요.</p>
      </article>
    `;
    return;
  }

  stores.forEach((store) => {
    const card = document.createElement("article");
    card.className = "map-store-card";
    card.dataset.id = store.id;

    card.innerHTML = `
      <h3>${store.name}</h3>
      <p>${store.address}</p>
      <button type="button" class="map-store-bookmark" aria-label="북마크"></button>
    `;

    const mapBookmarkButton = card.querySelector(".map-store-bookmark");

    if (mapBookmarkButton) {
      mapBookmarkButton.addEventListener("click", (event) => {
        event.stopPropagation();
        mapBookmarkButton.classList.toggle("is-active");
      });
    }

    card.addEventListener("click", () => {
      openDetail(store.id, "mapPage");
    });

    mapStoreList.appendChild(card);
  });
}

/* Grab Scroll */
function enableGrabScroll(element) {
  if (!element) {
    return;
  }

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  element.addEventListener("mousedown", (event) => {
    isDown = true;
    element.classList.add("grabbing");

    startX = event.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  element.addEventListener("mouseleave", () => {
    isDown = false;
    element.classList.remove("grabbing");
  });

  element.addEventListener("mouseup", () => {
    isDown = false;
    element.classList.remove("grabbing");
  });

  element.addEventListener("mousemove", (event) => {
    if (!isDown) return;

    event.preventDefault();

    const x = event.pageX - element.offsetLeft;
    const walk = (x - startX) * 1.4;

    element.scrollLeft = scrollLeft - walk;
  });

  element.addEventListener("touchstart", (event) => {
    startX = event.touches[0].pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  element.addEventListener("touchmove", (event) => {
    const x = event.touches[0].pageX - element.offsetLeft;
    const walk = (x - startX) * 1.2;

    element.scrollLeft = scrollLeft - walk;
  });
}

/* Events */
if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(searchInput.value);
  });
}

document.addEventListener("click", (event) => {
  const keywordButton = event.target.closest(".keyword-btn");

  if (keywordButton) {
    const keyword = keywordButton.dataset.keyword;

    if (searchInput) {
      searchInput.value = keyword;
    }

    handleSearch(keyword);
  }
});

document.querySelectorAll(".back-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("detail-back")) {
      showPage(previousPageId);
      return;
    }

    const target = button.dataset.target;

    if (target) {
      showPage(target);
    }
  });
});

if (mapOpenBtn) {
  mapOpenBtn.addEventListener("click", () => {
    showPage("mapPage");

    /*
      카카오맵 로딩과 상관없이 영업점 리스트는 바로 보여줌.
    */
    renderMapStoreList(mockStores);

    /*
      지도는 뒤에서 따로 로딩.
    */
    loadKakaoMapScript(() => {
      setTimeout(() => {
        initKakaoMap(mockStores);
      }, 100);
    });
  });
}

document.querySelectorAll(".order-tab").forEach((button) => {
  button.addEventListener("click", () => {
    changeOrderType(button.dataset.order);
  });
});

document.querySelectorAll(".menu-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".menu-tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

enableGrabScroll(menuTabs);

/* Init */
renderRecentKeywords();