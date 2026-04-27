/* =========================
  API CONFIG
========================== */

// 공공데이터 API 주소는 실제 호출 URL 형식 확인 후 수정 필요
const PUBLIC_API_URL = "https://infuser.odcloud.kr/oas/docs?namespace=15056285/v1";

// 본인 공공데이터 API 키 입력
const PUBLIC_API_KEY = "YOUR_PUBLIC_DATA_API_KEY";

// 카카오맵 기본 위치: 제주도
const DEFAULT_LAT = 33.4996213;
const DEFAULT_LNG = 126.5311884;

/* =========================
  SAMPLE DATA
========================== */

const communityPosts = [
  {
    id: 1,
    userName: "댕댕댕",
    time: "10min",
    title: "용두암 출발 코스",
    courseName: "제주환상자전거길 · 용두암 구간",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "제주환상자전거길의 시작 분위기를 느낄 수 있는 용두암 주변 코스입니다. 바다를 옆에 두고 달릴 수 있어 초반 라이딩 코스로 좋고, 공항과 가까워 접근하기 편한 구간입니다.",
    lat: 33.5161,
    lng: 126.5115
  },
  {
    id: 2,
    userName: "라이더초이",
    time: "25min",
    title: "함덕 해변 코스",
    courseName: "제주환상자전거길 · 함덕 해안 구간",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "함덕 해변을 따라 이어지는 제주 동북쪽 해안 코스입니다. 바다 색이 선명하고 길이 비교적 부드러워 여유롭게 달리기 좋습니다. 중간에 쉬어가기 좋은 카페와 해변 포인트도 많습니다.",
    lat: 33.5432,
    lng: 126.6694
  },
  {
    id: 3,
    userName: "제주바람",
    time: "32min",
    title: "월정리 해변 코스",
    courseName: "제주환상자전거길 · 월정리 구간",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "월정리 해변 주변을 달리는 감성 라이딩 코스입니다. 해안도로와 마을길이 함께 이어져 사진을 남기기 좋고, 짧은 거리로도 제주 동쪽 분위기를 충분히 느낄 수 있습니다.",
    lat: 33.5561,
    lng: 126.7958
  },
  {
    id: 4,
    userName: "오름라이더",
    time: "1hour",
    title: "성산일출봉 코스",
    courseName: "제주환상자전거길 · 성산 구간",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "제주 동쪽 대표 지점인 성산일출봉을 중심으로 한 코스입니다. 탁 트인 해안 풍경과 오름 풍경을 함께 볼 수 있어 제주환상자전거길 중에서도 인상적인 구간으로 구성했습니다.",
    lat: 33.4581,
    lng: 126.9424
  },
  {
    id: 5,
    userName: "서귀포라이더",
    time: "2hour",
    title: "쇠소깍 남쪽 코스",
    courseName: "제주환상자전거길 · 쇠소깍 구간",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "제주 남쪽 해안 분위기를 느낄 수 있는 쇠소깍 주변 코스입니다. 도심과 자연 풍경이 이어지고, 남쪽 특유의 따뜻한 분위기를 느끼며 달릴 수 있는 구간입니다.",
    lat: 33.2523,
    lng: 126.6238
  },
  {
    id: 6,
    userName: "협재라이더",
    time: "3hour",
    title: "협재 해변 코스",
    courseName: "제주환상자전거길 · 협재 서쪽 구간",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    image: "#",
    desc: "제주 서쪽 바다를 따라 달리는 협재 해변 코스입니다. 해변 풍경이 넓게 펼쳐지고, 노을 시간대에 특히 분위기가 좋아 유저 추천 코스로 구성했습니다.",
    lat: 33.3937,
    lng: 126.2394
  }
];

let selectedPost = communityPosts[0];
let map = null;
let marker = null;

/*
let allMap = null;
let allMarkers = [];
*/

/* =========================
  INIT
========================== */

document.addEventListener("DOMContentLoaded", () => {
  renderFeedCards();
  bindEvents();
  initStoryDragScroll();
  fetchPublicBikeData();
});

/* =========================
  FEED RENDER
========================== */

function renderFeedCards() {
  const feedList = document.getElementById("feedList");

  feedList.innerHTML = communityPosts.map((post) => {
    return `
      <article class="feed-card">
        <div class="feed-top">
          <div class="feed-user-row">
            <img class="user-avatar" src="${post.avatar}" alt="${post.userName}" />

            <div class="user-text">
              <div class="user-name-line">
                <strong>${post.userName}</strong>
                <span class="level-badge">LV 00</span>
              </div>
              <p>${post.time}</p>
            </div>
          </div>

          <button type="button" class="more-dot">•••</button>
        </div>

        <div class="feed-img">
          <img src="${post.image}" alt="${post.title}" />
        </div>

        <div class="feed-bottom">
          <div class="feed-counts">
            <span class="count-item">
              <i class="fa-solid fa-heart"></i>
              111
            </span>

            <span class="count-item">
              <i class="fa-solid fa-message"></i>
              111
            </span>

            <span class="count-item">
              <i class="fa-solid fa-eye"></i>
              111
            </span>
          </div>

          <button type="button" class="view-btn" data-id="${post.id}">
            View Active
          </button>
        </div>
      </article>
    `;
  }).join("");
}

/* =========================
  EVENTS
========================== */

function bindEvents() {
  const feedList = document.getElementById("feedList");
  const detailBackBtn = document.getElementById("detailBackBtn");
  const routeBtn = document.getElementById("routeBtn");
  const communityBackBtn = document.getElementById("communityBackBtn");
  /*const courseNavBtn = document.getElementById("courseNavBtn");
  const mapBackBtn = document.getElementById("mapBackBtn");
*/
  communityBackBtn.addEventListener("click", () => {
    window.history.back();
  });

  /*courseNavBtn.addEventListener("click", (event) => {
    event.preventDefault();

    showPage("mapPage");
    setActiveNav(courseNavBtn);

    setTimeout(() => {
      initAllCourseMap();
    }, 300);
  });*/

  /*mapBackBtn.addEventListener("click", () => {
    showPage("communityPage");

    const communityNavBtn = document.querySelector(".bottom-nav .nav-item:nth-child(2)");
    setActiveNav(communityNavBtn);
  }); */

  feedList.addEventListener("click", (event) => {
    const target = event.target.closest(".view-btn");

    if (!target) return;

    const postId = Number(target.dataset.id);
    const post = communityPosts.find((item) => item.id === postId);

    if (!post) return;

    openDetailPage(post);
  });

  detailBackBtn.addEventListener("click", () => {
    showPage("communityPage");
  });

  routeBtn.addEventListener("click", () => {
    openKakaoRoute(selectedPost);
  });
}

/* =========================
  PAGE CONTROL
========================== */

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
  window.scrollTo(0, 0);
}

function openDetailPage(post) {
  selectedPost = post;

  document.getElementById("detailHeaderTitle").textContent = `${post.userName}님의 커뮤니티 글`;
  document.getElementById("detailAvatar").src = post.avatar;
  document.getElementById("detailUserName").textContent = post.userName;
document.getElementById("detailTitle").textContent = post.courseName || post.title;
  document.getElementById("detailMainImage").src = post.image;
  document.getElementById("detailDesc").textContent = post.desc;

  showPage("detailPage");

  setTimeout(() => {
    initKakaoMap(post);
  }, 300);
}


/* 탭 스크롤 기능*/

function initStoryDragScroll() {
  const storyList = document.querySelector(".story-list");

  if (!storyList) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  storyList.addEventListener("mousedown", (event) => {
    isDown = true;
    storyList.classList.add("dragging");
    startX = event.pageX - storyList.offsetLeft;
    scrollLeft = storyList.scrollLeft;
  });

  storyList.addEventListener("mouseleave", () => {
    isDown = false;
    storyList.classList.remove("dragging");
  });

  storyList.addEventListener("mouseup", () => {
    isDown = false;
    storyList.classList.remove("dragging");
  });

  storyList.addEventListener("mousemove", (event) => {
    if (!isDown) return;

    event.preventDefault();

    const x = event.pageX - storyList.offsetLeft;
    const walk = (x - startX) * 1.2;

    storyList.scrollLeft = scrollLeft - walk;
  });
}







/* =========================
  KAKAO MAP
========================== */

function initKakaoMap(post) {
  const mapContainer = document.getElementById("kakaoMap");

  if (!window.kakao || !window.kakao.maps) {
    mapContainer.innerHTML = `
      <div style="height:100%; display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; font-size:13px; color:#555;">
        카카오맵 JavaScript 키를 입력하면 지도가 표시됩니다.
      </div>
    `;
    return;
  }

  kakao.maps.load(() => {
    const position = new kakao.maps.LatLng(post.lat, post.lng);

    const mapOption = {
      center: position,
      level: 5
    };

    map = new kakao.maps.Map(mapContainer, mapOption);

    marker = new kakao.maps.Marker({
      position: position
    });

    marker.setMap(map);

    const infoWindow = new kakao.maps.InfoWindow({
  content: `
    <div style="padding:10px 12px; font-size:12px; line-height:1.4;">
      <strong style="display:block; margin-bottom:4px;">${post.courseName || post.title}</strong>
      <span>${post.userName}</span>
    </div>
  `
});

    infoWindow.open(map, marker);
  });
}

function openKakaoRoute(post) {
  const url = `https://map.kakao.com/link/to/${encodeURIComponent(post.title)},${post.lat},${post.lng}`;
  window.open(url, "_blank");
}

/* =========================
  PUBLIC API FETCH
========================== */

async function fetchPublicBikeData() {
  /*
    실제 API의 호출 URL, 인증키 파라미터명, 응답 필드명은
    공공데이터 문서에서 확인 후 수정해야 합니다.

    현재는 코드 구조만 잡아둔 상태입니다.
  */

  try {
    const requestUrl = `${PUBLIC_API_URL}&serviceKey=${encodeURIComponent(PUBLIC_API_KEY)}`;

    console.log("공공데이터 요청 URL:", requestUrl);

    // 실제 API 호출이 필요한 경우 아래 주석을 해제해서 사용
    /*
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error("공공데이터 API 요청 실패");
    }

    const data = await response.json();

    console.log("공공데이터 응답:", data);
    */
  } catch (error) {
    console.error("공공데이터 API 오류:", error);
  }
}



/*
function setActiveNav(activeItem) {
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");

  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  activeItem.classList.add("active");
}*/

/*
function initAllCourseMap() {
  const mapContainer = document.getElementById("allKakaoMap");

  if (!window.kakao || !window.kakao.maps) {
    mapContainer.innerHTML = `
      <div style="height:100%; display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; font-size:13px; color:#555;">
        카카오맵 JavaScript 키를 입력하면 전체 지도가 표시됩니다.
      </div>
    `;

    renderMapCourseList();
    return;
  }*/

  kakao.maps.load(() => {
    const centerPosition = new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG);

    const mapOption = {
      center: centerPosition,
      level: 9
    };

    allMap = new kakao.maps.Map(mapContainer, mapOption);

    allMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    allMarkers = [];

    communityPosts.forEach((post) => {
      const position = new kakao.maps.LatLng(post.lat, post.lng);

      const marker = new kakao.maps.Marker({
        position: position
      });

      marker.setMap(allMap);
      allMarkers.push(marker);

      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:8px 12px; font-size:12px; font-weight:700;">${post.title}</div>`
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.open(allMap, marker);
      });
    });

    renderMapCourseList();
  });

  /*

function renderMapCourseList() {
  const mapCourseList = document.getElementById("mapCourseList");

  mapCourseList.innerHTML = communityPosts.map((post) => {
    return `
      <article class="map-course-card">
        <div class="map-course-thumb">
          <img src="${post.image}" alt="${post.title}" />
        </div>

        <div class="map-course-info">
          <strong>${post.title}</strong>
          <p>${post.userName} · ${post.time}</p>
        </div>

        <button type="button" class="map-course-btn" data-id="${post.id}">
          보기
        </button>
      </article>
    `;
  }).join("");

  mapCourseList.addEventListener("click", (event) => {
    const target = event.target.closest(".map-course-btn");

    if (!target) return;

    const postId = Number(target.dataset.id);
    const post = communityPosts.find((item) => item.id === postId);

    if (!post) return;

    openDetailPage(post);

    const communityNavBtn = document.querySelector(".bottom-nav .nav-item:nth-child(2)");
    setActiveNav(communityNavBtn);
  }, { once: true });
}*/