const REST_API_KEY = "de187fd45d650881be9a659b12d26ea56f75c3bb95e5dedc89b25cd5a1ae692b";
const BASE_API_URL = "https://openapi.jeonju.go.kr/rest/jeonjufood";

/*
  공공데이터 상세 명세에서 실제 목록 엔드포인트명이 다를 수 있습니다.
  아래 endpoint 값만 명세서에 맞게 교체하면 전체 UI는 그대로 동작합니다.

  예시:
  - getFoodList
  - getBibimbapList
  - getKongnamulList
  - getHanjeongsikList
  - getMakgeolliList
  - getHanokFoodList
*/

const API_ENDPOINTS = {
  all: "getFoodList",
  비빔밥: "getBibimbapList",
  콩나물국밥: "getKongnamulList",
  한정식: "getHanjeongsikList",
  막걸리: "getMakgeolliList",
  한옥마을: "getHanokFoodList"
};

const fallbackFoods = [
  {
    id: "sample-1",
    name: "80년 전통 할머니 국밥",
    address: "전북 전주시 완산구 서문로 68번길 33",
    menu: "따로 국밥 ₩7,000  수육 ₩10,000",
    intro: "80년 전통 돼지 국밥 전문점으로 깊고 진한 국물과 부드러운 수육이 인기인 전주 맛집입니다.",
    tel: "051-666-5555",
    time: "11:00 ~ 18:00",
    parking: true,
    lat: 35.8152,
    lng: 127.1479,
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "sample-2",
    name: "전주 비빔밥 명가",
    address: "전북 전주시 완산구 태조로 24",
    menu: "전주비빔밥 ₩12,000  육회비빔밥 ₩16,000",
    intro: "전주의 대표 음식인 비빔밥을 정갈한 반찬과 함께 즐길 수 있는 한식 맛집입니다.",
    tel: "063-000-1111",
    time: "10:30 ~ 20:30",
    parking: false,
    lat: 35.8159,
    lng: 127.1531,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "sample-3",
    name: "한옥마을 콩나물국밥",
    address: "전북 전주시 완산구 은행로 45",
    menu: "콩나물국밥 ₩8,000  모주 ₩4,000",
    intro: "시원한 국물 맛이 특징인 콩나물국밥 전문점입니다. 아침 식사 장소로도 좋습니다.",
    tel: "063-000-2222",
    time: "07:00 ~ 21:00",
    parking: true,
    lat: 35.8175,
    lng: 127.1539,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=80"
  }
];

let foods = [];
let filteredFoods = [];
let selectedCategory = "all";
let currentMode = "home";
let currentFood = null;
let map = null;
let marker = null;

const listPage = document.getElementById("listPage");
const detailPage = document.getElementById("detailPage");
const foodList = document.getElementById("foodList");
const totalText = document.getElementById("totalText");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const emptyBox = document.getElementById("emptyBox");

const refreshBtn = document.getElementById("refreshBtn");
const favoriteTopBtn = document.getElementById("favoriteTopBtn");
const backBtn = document.getElementById("backBtn");
const detailFavoriteBtn = document.getElementById("detailFavoriteBtn");

const homeTab = document.getElementById("homeTab");
const favoriteTab = document.getElementById("favoriteTab");

const detailImage = document.getElementById("detailImage");
const detailName = document.getElementById("detailName");
const detailAddress = document.getElementById("detailAddress");
const detailIntro = document.getElementById("detailIntro");
const detailMenu = document.getElementById("detailMenu");
const detailTel = document.getElementById("detailTel");
const detailTime = document.getElementById("detailTime");
const callLink = document.getElementById("callLink");
const routeLink = document.getElementById("routeLink");

document.addEventListener("DOMContentLoaded", () => {
  loadFoods();
  bindEvents();
});

function bindEvents() {
  refreshBtn.addEventListener("click", loadFoods);

  searchInput.addEventListener("input", () => {
    currentMode = "home";
    setActiveTab();
    filterFoods();
  });

  categoryList.addEventListener("click", (event) => {
    const chip = event.target.closest(".category-chip");
    if (!chip) return;

    document.querySelectorAll(".category-chip").forEach((button) => {
      button.classList.remove("active");
    });

    chip.classList.add("active");
    selectedCategory = chip.dataset.category;
    currentMode = "home";

    setActiveTab();
    loadFoods();
  });

  backBtn.addEventListener("click", () => {
    showListPage();
  });

  detailFavoriteBtn.addEventListener("click", () => {
    if (!currentFood) return;

    toggleFavorite(currentFood.id);
    updateDetailFavoriteButton();
    renderFoods(filteredFoods);
  });

  favoriteTopBtn.addEventListener("click", () => {
    currentMode = "favorite";
    setActiveTab();
    filterFoods();
  });

  homeTab.addEventListener("click", () => {
    currentMode = "home";
    setActiveTab();
    filterFoods();
    showListPage();
  });

  favoriteTab.addEventListener("click", () => {
    currentMode = "favorite";
    setActiveTab();
    filterFoods();
    showListPage();
  });
}

async function loadFoods() {
  foodList.innerHTML = `
    <div class="empty-box active">맛집 정보를 불러오는 중입니다.</div>
  `;

  try {
    const endpoint = API_ENDPOINTS[selectedCategory] || API_ENDPOINTS.all;
    const url = `${BASE_API_URL}/${endpoint}?authApiKey=${encodeURIComponent(REST_API_KEY)}&startPage=1&pageSize=200`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API 응답 오류");
    }

    const data = await response.json();
    const list = extractList(data);

    if (!list.length) {
      throw new Error("목록 데이터 없음");
    }

    foods = list.map(normalizeFood);
  } catch (error) {
    console.warn("공공데이터 API 호출 실패 또는 CORS 제한으로 샘플 데이터를 표시합니다.", error);
    foods = fallbackFoods;
  }

  filterFoods();
}

function extractList(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data.body)) return data.body;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.list)) return data.list;
  if (Array.isArray(data.data)) return data.data;

  if (data.response && Array.isArray(data.response.body)) {
    return data.response.body;
  }

  if (data.response && data.response.body && Array.isArray(data.response.body.items)) {
    return data.response.body.items;
  }

  return [];
}

function normalizeFood(item, index) {
  const id =
    item.foodUid ||
    item.uid ||
    item.id ||
    item.FOOD_UID ||
    `food-${index}`;

  const name =
    item.foodNm ||
    item.foodName ||
    item.name ||
    item.title ||
    item.shopName ||
    item.FOOD_NM ||
    "상호명 없음";

  const address =
    item.addr ||
    item.address ||
    item.roadAddr ||
    item.jibunAddr ||
    item.FOOD_ADDR ||
    "주소 정보 없음";

  const menu =
    item.mainMenu ||
    item.menu ||
    item.foodMenu ||
    item.MAIN_MENU ||
    "대표 메뉴 정보 없음";

  const intro =
    item.intro ||
    item.content ||
    item.description ||
    item.FOOD_CONTENT ||
    "상세 소개 정보가 없습니다.";

  const tel =
    item.tel ||
    item.phone ||
    item.telNo ||
    item.FOOD_TEL ||
    "전화번호 정보 없음";

  const time =
    item.openTime ||
    item.businessTime ||
    item.time ||
    item.FOOD_TIME ||
    "운영시간 정보 없음";

  const lat = Number(item.lat || item.latitude || item.mapY || item.FOOD_LAT) || 35.8152;
  const lng = Number(item.lng || item.longitude || item.mapX || item.FOOD_LNG) || 127.1479;

  const image =
    item.thumbUrl ||
    item.privewUrl ||
    item.previewUrl ||
    item.imageUrl ||
    item.imgUrl ||
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80";

  const parkingText = String(item.parking || item.park || item.parkingYn || "");
  const parking = parkingText.includes("가능") || parkingText === "Y" || parkingText === "true";

  return {
    id,
    name,
    address,
    menu,
    intro,
    tel,
    time,
    lat,
    lng,
    image,
    parking
  };
}

function filterFoods() {
  const keyword = searchInput.value.trim().toLowerCase();

  filteredFoods = foods.filter((food) => {
    const searchTarget = `${food.name} ${food.address} ${food.menu}`.toLowerCase();

    const matchedKeyword = !keyword || searchTarget.includes(keyword);
    const matchedFavorite = currentMode !== "favorite" || isFavorite(food.id);

    return matchedKeyword && matchedFavorite;
  });

  renderFoods(filteredFoods);
}

function renderFoods(list) {
  foodList.innerHTML = "";
  totalText.textContent = `전체 ${list.length}건`;

  if (!list.length) {
    emptyBox.classList.add("active");
    return;
  }

  emptyBox.classList.remove("active");

  list.forEach((food) => {
    const card = document.createElement("article");
    card.className = "food-card";

    card.innerHTML = `
      <h3>${food.name}</h3>
      <p><strong>주소 :</strong> ${food.address}</p>
      <p><strong>메뉴 :</strong> ${food.menu}</p>

      <div class="parking-badge">
        ${food.parking ? "주차가능" : "주차불가"}
      </div>

      <div class="card-actions">
        <button class="view-btn" type="button" aria-label="상세보기">⌕</button>
        <button 
          class="like-btn ${isFavorite(food.id) ? "active" : ""}" 
          type="button" 
          aria-label="즐겨찾기"
        >
          ${isFavorite(food.id) ? "♥" : "♡"}
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      openDetail(food);
    });

    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(food.id);
      renderFoods(filteredFoods);
    });

    foodList.appendChild(card);
  });
}

function openDetail(food) {
  currentFood = food;

  detailImage.src = food.image;
  detailName.textContent = food.name;
  detailAddress.textContent = food.address;
  detailIntro.textContent = food.intro;
  detailMenu.textContent = food.menu;
  detailTel.textContent = food.tel;
  detailTime.textContent = food.time;

  callLink.href = food.tel && food.tel !== "전화번호 정보 없음"
    ? `tel:${food.tel.replaceAll("-", "")}`
    : "#";

  routeLink.href = `https://map.kakao.com/link/to/${encodeURIComponent(food.name)},${food.lat},${food.lng}`;

  updateDetailFavoriteButton();
  showDetailPage();

  setTimeout(() => {
    renderMap(food);
  }, 100);
}

function showDetailPage() {
  listPage.classList.remove("active");
  detailPage.classList.add("active");
  window.scrollTo(0, 0);
}

function showListPage() {
  detailPage.classList.remove("active");
  listPage.classList.add("active");
  window.scrollTo(0, 0);
}

function renderMap(food) {
  const mapContainer = document.getElementById("map");

  if (!window.kakao || !window.kakao.maps) {
    mapContainer.innerHTML = `
      <div style="padding:20px;font-size:14px;color:#777;">
        카카오맵 JavaScript Key를 입력하면 지도가 표시됩니다.
      </div>
    `;
    return;
  }

  const position = new kakao.maps.LatLng(food.lat, food.lng);

  map = new kakao.maps.Map(mapContainer, {
    center: position,
    level: 4
  });

  marker = new kakao.maps.Marker({
    position
  });

  marker.setMap(map);

  const infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:8px 10px;font-size:13px;font-weight:700;">${food.name}</div>`
  });

  infowindow.open(map, marker);
}

function getFavorites() {
  const saved = localStorage.getItem("jeonjuFavorites");
  return saved ? JSON.parse(saved) : [];
}

function setFavorites(favorites) {
  localStorage.setItem("jeonjuFavorites", JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    setFavorites(favorites.filter((item) => item !== id));
  } else {
    setFavorites([...favorites, id]);
  }
}

function updateDetailFavoriteButton() {
  if (!currentFood) return;

  const active = isFavorite(currentFood.id);
  detailFavoriteBtn.textContent = active ? "♥" : "♡";
  detailFavoriteBtn.style.color = active ? "#e44" : "#111";
}

function setActiveTab() {
  if (currentMode === "favorite") {
    homeTab.classList.remove("active");
    favoriteTab.classList.add("active");
  } else {
    favoriteTab.classList.remove("active");
    homeTab.classList.add("active");
  }
}