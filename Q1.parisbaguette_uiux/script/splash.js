const progressBar = document.querySelector(".loading-progress");
const percentText = document.querySelector(".loading-percent");
const moveLink = document.querySelector("#moveLink");
const splashScreen = document.querySelector(".splash-screen");

let percent = 0;
const duration = 3000;
const intervalTime = 30;
const step = 100 / (duration / intervalTime);

const loadingTimer = setInterval(() => {
  percent += step;

  if (percent >= 100) {
    percent = 100;
    clearInterval(loadingTimer);

    progressBar.style.width = `${percent}%`;
    percentText.textContent = `${Math.floor(percent)}%`;

    setTimeout(() => {
      splashScreen.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = moveLink.getAttribute("href");
      }, 700);
    }, 300);

    return;
  }

  progressBar.style.width = `${percent}%`;
  percentText.textContent = `${Math.floor(percent)}%`;
}, intervalTime);