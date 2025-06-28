const form = document.getElementById("signup-form");
const popup = document.getElementById("popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name;
  const email = form.email;
  const phone = form.phone;
  const preferredClass = form.class;

  let isValid = true;

  [name, email, phone, preferredClass].forEach((el) =>
    el.classList.remove("invalid")
  );

  if (!name.value.trim() || name.value.trim().length < 2) {
    name.classList.add("invalid");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
    email.classList.add("invalid");
    isValid = false;
  }

  if (!phone.value.trim() || isNaN(phone.value.trim())) {
    phone.classList.add("invalid");
    isValid = false;
  }

  if (!preferredClass.value) {
    preferredClass.classList.add("invalid");
    isValid = false;
  }

  if (isValid) {
    showPopup("Thank you for signing up! You'll hear from us soon.");
    form.reset();
  } else {
    showPopup("Error: Please fill in all fields correctly.");
  }
});

function showPopup(message) {
  popup.textContent = message;
  popup.style.display = "block";
  speak(message);
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

function speak(message) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}
