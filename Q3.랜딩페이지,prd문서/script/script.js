const applyButtons = document.querySelectorAll(".apply-btn, .bottom-apply-btn");
const applyModal = document.querySelector("#applyModal");
const closeModalButtons = document.querySelectorAll("[data-modal-close]");
const applyForm = document.querySelector("#applyForm");

const applyName = document.querySelector("#applyName");
const applyPhone = document.querySelector("#applyPhone");
const applyMessage = document.querySelector("#applyMessage");

// Google Sheets 편집 링크가 아니라 Apps Script 배포 URL을 넣어야 합니다.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxozPMi8HgkLP3EEqmjU6Lqu47Et6BGSyXMj-cHje2Ztt3W8LWwYOp6RnYgOZ3FNJci8Q/exec";

function openApplyModal() {
  applyModal.classList.add("is-active");
  applyModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeApplyModal() {
  applyModal.classList.remove("is-active");
  applyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function allowKoreanEnglishSpaceOnly(value) {
  return value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z\s]/g, "");
}

function allowNumberOnly(value) {
  return value.replace(/[^0-9]/g, "");
}

applyName.addEventListener("input", () => {
  applyName.value = allowKoreanEnglishSpaceOnly(applyName.value);
});

applyMessage.addEventListener("input", () => {
  applyMessage.value = allowKoreanEnglishSpaceOnly(applyMessage.value);
});

applyPhone.addEventListener("input", () => {
  applyPhone.value = allowNumberOnly(applyPhone.value);
});

applyButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openApplyModal();
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeApplyModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && applyModal.classList.contains("is-active")) {
    closeApplyModal();
  }
});

applyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();

  formData.append("Name", applyName.value.trim());
  formData.append("Phone", applyPhone.value.trim());
  formData.append("Message", applyMessage.value.trim());

  if (!formData.get("Name")) {
    alert("이름을 입력해주세요.");
    applyName.focus();
    return;
  }

  if (!formData.get("Phone")) {
    alert("전화번호를 입력해주세요.");
    applyPhone.focus();
    return;
  }

  if (!formData.get("Message")) {
    alert("메시지를 입력해주세요.");
    applyMessage.focus();
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    alert("지원 내용이 접수되었습니다.");
    applyForm.reset();
    closeApplyModal();
  } catch (error) {
    alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    console.error(error);
  }
});