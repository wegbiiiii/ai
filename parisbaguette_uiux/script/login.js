const loginBtn = document.querySelector("#loginBtn");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const loginPage = document.querySelector(".login-page");

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (userId.value.trim() === "") {
    alert("아이디를 입력해주세요.");
    userId.focus();
    return;
  }

  if (userPw.value.trim() === "") {
    alert("비밀번호를 입력해주세요.");
    userPw.focus();
    return;
  }

  const moveUrl = loginBtn.getAttribute("href");

  loginPage.classList.add("fade-out");

  setTimeout(function () {
    window.location.href = moveUrl;
  }, 450);
});