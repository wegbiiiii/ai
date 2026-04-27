const DEFAULT_LAT = 33.38;
const DEFAULT_LNG = 126.54;

const courseData = [
  {
    id: 1,
    userName: "댕댕댕",
    time: "10min",
    title: "용두암 출발 코스",
    desc: "제주환상자전거길 시작 구간",
    image: "#",
    lat: 33.5161,
    lng: 126.5115
  },
  {
    id: 2,
    userName: "라이더초이",
    time: "25min",
    title: "함덕 해변 코스",
    desc: "바다를 보면서 달리는 동쪽 구간",
    image: "#",
    lat: 33.5432,
    lng: 126.6694
  },
  {
    id: 3,
    userName: "제주바람",
    time: "32min",
    title: "월정리 해변 코스",
    desc: "제주 동쪽 해안 라이딩 구간",
    image: "#",
    lat: 33.5561,
    lng: 126.7958
  },
  {
    id: 4,
    userName: "오름라이더",
    time: "1hour",
    title: "성산일출봉 코스",
    desc: "제주환상자전거길 동쪽 대표 지점",
    image: "#",
    lat: 33.4581,
    lng: 126.9424
  },
  {
    id: 5,
    userName: "서귀포라이더",
    time: "2hour",
    title: "쇠소깍 코스",
    desc: "남쪽 해안으로 이어지는 라이딩 구간",
    image: "#",
    lat: 33.2523,
    lng: 126.6238
  },
  {
    id: 6,
    userName: "중문라이더",
    time: "2hour",
    title: "중문 해안 코스",
    desc: "남서쪽 관광지와 연결되는 코스",
    image: "#",
    lat: 33.2450,
    lng: 126.4115
  },
  {
    id: 7,
    userName: "협재라이더",
    time: "3hour",
    title: "협재 해변 코스",
    desc: "서쪽 해안 자전거길 추천 구간",
    image: "#",
    lat: 33.3937,
    lng: 126.2394
  },
  {
    id: 8,
    userName: "애월라이더",
    time: "3hour",
    title: "애월 해안도로 코스",
    desc: "제주환상자전거길 서북쪽 감성 구간",
    image: "#",
    lat: 33.4637,
    lng: 126.3094
  }
];

let allMap = null;
let allMarkers = [];

document.addEventListener("DOMContentLoaded", () => {
  const courseBackBtn = document.getElementById("courseBackBtn");

  courseBackBtn.addEventListener("click", () => {
    window.history.back();
  });

  initAllCourseMap();
});

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
  }

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

    courseData.forEach((course) => {
      const position = new kakao.maps.LatLng(course.lat, course.lng);

      const marker = new kakao.maps.Marker({
        position: position
      });

      marker.setMap(allMap);
      allMarkers.push(marker);

      const infoWindow = new kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px 12px; font-size:12px; line-height:1.4;">
            <strong style="display:block; margin-bottom:4px;">${course.title}</strong>
            <span>${course.userName}</span>
          </div>
        `
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.open(allMap, marker);
      });
    });

    renderMapCourseList();
  });
}

function renderMapCourseList() {
  const mapCourseList = document.getElementById("mapCourseList");

  mapCourseList.innerHTML = courseData.map((course) => {
    return `
      <article class="map-course-card">
        <div class="map-course-thumb">
          <img src="${course.image}" alt="${course.title}" />
        </div>

        <div class="map-course-info">
          <strong>${course.title}</strong>
          <p>${course.userName} · ${course.time}</p>
        </div>

        <button type="button" class="map-course-btn" data-id="${course.id}">
          위치보기
        </button>
      </article>
    `;
  }).join("");

  mapCourseList.addEventListener("click", (event) => {
    const target = event.target.closest(".map-course-btn");

    if (!target) return;

    const courseId = Number(target.dataset.id);
    const course = courseData.find((item) => item.id === courseId);

    if (!course || !allMap || !window.kakao) return;

    const movePosition = new kakao.maps.LatLng(course.lat, course.lng);

    allMap.panTo(movePosition);
    allMap.setLevel(5);
  });
}