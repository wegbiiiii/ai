const API_KEY = "e00398ec629b4e59a2ff986d4638214a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const AIR_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const tempValue = document.getElementById("tempValue");
const windValue = document.getElementById("windValue");
const humidityValue = document.getElementById("humidityValue");
const feelsLikeValue = document.getElementById("feelsLikeValue");
const ozoneValue = document.getElementById("ozoneValue");
const statusBox = document.getElementById("statusBox");

function setStatus(message = "", isError = false, isLoading = false) {
  statusBox.classList.toggle("error", isError);

  if (isLoading) {
    statusBox.innerHTML = `<span class="loader"></span>${message}`;
    return;
  }

  statusBox.textContent = message;
}

function formatTemperature(value) {
  return `${Math.round(value)}°`;
}

function formatFeelsLike(value) {
  return `${Math.round(value)}°C`;
}

function formatWind(value) {
  return `${value.toFixed(2)} m/s`;
}

function formatHumidity(value) {
  return `${value} %`;
}

function formatOzone(value) {
  if (value === null || value === undefined) return "정보 없음";
  return `${Math.round(value)} ug/m³`;
}

function renderWeather(weatherData, ozoneData) {
  const displayName = weatherData.name || "도시명";
  const country = weatherData.sys?.country ? `, ${weatherData.sys.country}` : "";
  const descText = weatherData.weather?.[0]?.description || "날씨 정보";

  cityName.textContent = `${displayName}${country}`;
  weatherDesc.textContent = descText;
  tempValue.textContent = formatTemperature(weatherData.main.temp);
  windValue.textContent = formatWind(weatherData.wind.speed);
  humidityValue.textContent = formatHumidity(weatherData.main.humidity);
  feelsLikeValue.textContent = formatFeelsLike(weatherData.main.feels_like);
  ozoneValue.textContent = formatOzone(ozoneData?.list?.[0]?.components?.o3);
}

async function fetchAirPollution(lat, lon) {
  const response = await fetch(`${AIR_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error("대기 정보를 불러오지 못했습니다.");
  }

  return response.json();
}

async function fetchWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("해당 도시를 찾을 수 없습니다.");
    }
    throw new Error("날씨 정보를 불러오지 못했습니다.");
  }

  return response.json();
}

async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("현재 위치의 날씨 정보를 불러오지 못했습니다.");
  }

  return response.json();
}

async function searchCityWeather(city) {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    setStatus("API 키를 먼저 입력해주세요.", true);
    return;
  }

  const trimmed = city.trim();

  if (!trimmed) {
    setStatus("도시명을 입력해주세요.", true);
    cityInput.focus();
    return;
  }

  try {
    setStatus("도시 날씨를 불러오는 중입니다...", false, true);
    const weatherData = await fetchWeatherByCity(trimmed);
    const ozoneData = await fetchAirPollution(weatherData.coord.lat, weatherData.coord.lon);
    renderWeather(weatherData, ozoneData);
    setStatus(`'${weatherData.name}'의 최신 날씨 정보입니다.`);
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function searchCurrentLocationWeather() {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    setStatus("API 키를 먼저 입력해주세요.", true);
    return;
  }

  if (!navigator.geolocation) {
    setStatus("이 브라우저에서는 위치 기능을 지원하지 않습니다.", true);
    return;
  }

  setStatus("현재 위치를 확인하는 중입니다...", false, true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherByCoords(latitude, longitude);
        const ozoneData = await fetchAirPollution(latitude, longitude);
        renderWeather(weatherData, ozoneData);
        setStatus(`현재 위치 기준 '${weatherData.name}' 날씨입니다.`);
      } catch (error) {
        setStatus(error.message, true);
      }
    },
    () => {
      setStatus("위치 권한을 허용해야 현재 위치 날씨를 확인할 수 있습니다.", true);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCityWeather(cityInput.value);
});

locationBtn.addEventListener("click", searchCurrentLocationWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchCityWeather(cityInput.value);
  }
});

cityInput.addEventListener("focus", () => {
  cityInput.value = "";
});

searchCityWeather("Seoul");