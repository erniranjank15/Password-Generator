const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const genBtn = document.querySelector(".genBtn");
const copyIcon = document.getElementById("copyIcon");

// Update password length on slider input
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

// Character pools
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "~!@#$%^&*";

// Generate Password
genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

// Clipboard Copy
copyIcon.addEventListener("click", () => {
  if (passBox.value.length > 0) {
    copyToClipboard(passBox.value);
    showCopySuccess();
  }
});

function generatePassword() {
  let allChars = "";
  let password = "";

  if (lowercase.checked) allChars += lowerChars;
  if (uppercase.checked) allChars += upperChars;
  if (numbers.checked) allChars += numberChars;
  if (symbols.checked) allChars += symbolChars;

  if (allChars.length === 0) {
    alert("Please select at least one character type!");
    return "";
  }

  for (let i = 0; i < inputSlider.value; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randIndex);
  }

  return password;
}

// Copy using temporary input (works on all devices)
function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.setAttribute("type", "text");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // for iOS
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Show success icon + toast
function showCopySuccess() {
  copyIcon.innerText = "check";
  copyIcon.title = "Password copied!";
  showToast("Password copied!");
  setTimeout(() => {
    copyIcon.innerText = "content_copy";
    copyIcon.title = "";
  }, 2000);
}

// Show toast popup
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
