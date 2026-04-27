const API_KEY = "e00398ec629b4e59a2ff986d4638214a";

/*
  제주도 위치 좌표
  lat: 위도
  lon: 경도
*/
const JEJU_LAT = 33.4996;
const JEJU_LON = 126.5312;

const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherIcon = document.getElementById("weatherIcon");

async function getJejuWeather() {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${JEJU_LAT}&lon=${JEJU_LON}&appid=${API_KEY}&units=metric&lang=kr`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("날씨 정보를 불러오지 못했습니다.");
    }

    const data = await response.json();

    console.log("제주도 날씨 데이터:", data);

    const temp = Math.round(data.main.temp);
    const weatherMain = data.weather[0].main;
    const iconCode = data.weather[0].icon;

    weatherCity.textContent = `Jeju ${weatherMain}`;
    weatherTemp.textContent = `${temp}°`;

    /*
      OpenWeather 기본 아이콘 사용
      직접 만든 아이콘을 쓰고 싶으면 아래 src를 원하는 이미지 경로로 변경하면 됩니다.
      예: weatherIcon.src = "images/weather-icon.png";
    */
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = weatherMain;

  } catch (error) {
    console.error(error);

    weatherCity.textContent = "Jeju Weather";
    weatherTemp.textContent = "--°";
    weatherIcon.src = "images/weather-icon.png";
  }
}

getJejuWeather();



/*메인화면 여행정보 가이드 슬라이드 기능*/
const guideSlider = document.querySelector('.guide-slider');

if (guideSlider) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  guideSlider.addEventListener('mousedown', function (e) {
    isDown = true;
    guideSlider.classList.add('is-dragging');

    startX = e.pageX - guideSlider.offsetLeft;
    scrollLeft = guideSlider.scrollLeft;
  });

  guideSlider.addEventListener('mouseleave', function () {
    isDown = false;
    guideSlider.classList.remove('is-dragging');
  });

  guideSlider.addEventListener('mouseup', function () {
    isDown = false;
    guideSlider.classList.remove('is-dragging');
  });

  guideSlider.addEventListener('mousemove', function (e) {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - guideSlider.offsetLeft;
    const move = x - startX;

    guideSlider.scrollLeft = scrollLeft - move;
  });

  guideSlider.addEventListener('touchstart', function (e) {
    startX = e.touches[0].pageX - guideSlider.offsetLeft;
    scrollLeft = guideSlider.scrollLeft;
  });

  guideSlider.addEventListener('touchmove', function (e) {
    const x = e.touches[0].pageX - guideSlider.offsetLeft;
    const move = x - startX;

    guideSlider.scrollLeft = scrollLeft - move;
  });
}



/*메인화면 hero 슬라이드 기능 */
const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 700,

  grabCursor: true,
  allowTouchMove: true,
  simulateTouch: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.hero-pagination',
    clickable: true,
  },
  
});