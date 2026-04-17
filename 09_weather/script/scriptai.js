const OPEN_WEATHER_API_KEY = "e00398ec629b4e59a2ff986d4638214a";



const JEJU_LAT = 33.4996;
const JEJU_LON = 126.5312;

document.addEventListener("DOMContentLoaded", () => {
  const weatherLocation = document.getElementById("weatherLocation");
  const weatherTemp = document.getElementById("weatherTemp");
  const weatherIcon = document.getElementById("weatherIcon");

  async function fetchJejuWeather() {
    if (!weatherLocation || !weatherTemp || !weatherIcon) {
      console.error("날씨 UI 요소를 찾을 수 없습니다.");
      return;
    }

    if (!OPEN_WEATHER_API_KEY || OPEN_WEATHER_API_KEY === "여기에_본인_API_KEY_입력") {
      weatherLocation.textContent = "Jeju";
      weatherTemp.textContent = "--°";
      weatherIcon.alt = "API 키 필요";
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${JEJU_LAT}&lon=${JEJU_LON}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=kr`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`날씨 데이터를 불러오지 못했습니다. (${response.status})`);
      }

      const data = await response.json();

      const locationName = data.name ? `제주도 ${data.name}` : "제주도";
      const temp = Math.round(data.main.temp);
      const iconCode = data.weather?.[0]?.icon || "01d";
      const weatherMain = data.weather?.[0]?.description || "맑음";

      weatherLocation.textContent = `${locationName} · ${weatherMain}`;
      weatherTemp.textContent = `${temp}°`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.alt = weatherMain;
    } catch (error) {
      console.error(error);
      weatherLocation.textContent = "제주도";
      weatherTemp.textContent = "--°";
      weatherIcon.alt = "날씨 정보를 불러오지 못했습니다.";
    }
  }

  fetchJejuWeather();

  /* 가로 드래그 슬라이드 */
  const guideSlider = document.getElementById("guideSlider");

  if (!guideSlider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  guideSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    guideSlider.classList.add("dragging");
    startX = e.pageX - guideSlider.offsetLeft;
    scrollLeft = guideSlider.scrollLeft;
  });

  guideSlider.addEventListener("mouseleave", () => {
    isDown = false;
    guideSlider.classList.remove("dragging");
  });

  guideSlider.addEventListener("mouseup", () => {
    isDown = false;
    guideSlider.classList.remove("dragging");
  });

  guideSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - guideSlider.offsetLeft;
    const walk = (x - startX) * 1.2;
    guideSlider.scrollLeft = scrollLeft - walk;
  });
});