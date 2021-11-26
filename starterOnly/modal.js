function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const firstEntries = document.getElementById("first");
const lastEntries = document.getElementById("last");
const emailEntries = document.getElementById("email");
const birthdateEntries = document.getElementById("birthdate");
const quantityEntries = document.getElementById("quantity");
const locationEntries = document.querySelectorAll(
  ".checkbox-input[type=radio]"
);
const checkboxEntries = document.getElementById("checkbox1");
const modalBody = document.querySelector(".modal-body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// check the validity of the names
const nameCheckValidity = (entries) => {
  return entries !== null && entries.length >= 2 ? true : false;
};

// check the validity of the email
const emailCheckValidity = (entries) => {
  const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
  return emailRegex.test(entries);
};

// check the validity of the birthdate
const birthdateCheckValidity = (entries) => {
  const birthdate = new Date(entries);
  const today = new Date();
  if (birthdate.toString() !== "Invalid Date") {
    if (
      birthdate.getDate() >= today.getDate() &&
      birthdate.getMonth() == today.getMonth() &&
      birthdate.getFullYear() == today.getFullYear()
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

// check the validity of the quantity
const quantityCheckValidity = (entries) => {
  const quantityRegex = new RegExp("^[0-9]+$");
  return quantityRegex.test(entries);
};

// check the validity of the location
const locationCheckValidity = (entries) => {
  for (let radio of entries) {
    if (radio.checked === true) return true;
  }
  return false;
};

// check the validity of the mandatory checkbox
const checkboxCheckValidity = (entries) => {
  return entries.checked;
};

// show errors messages
function errorEntries(entries, error) {
  let parent;
  NodeList.prototype.isPrototypeOf(entries)
    ? (parent = entries[0].parentNode)
    : (parent = entries.parentNode);
  parent.setAttribute("data-error-visible", true);
  parent.setAttribute("data-error", error);
}

// show modal success
function formValidationCorrect() {
  modalBody.innerHTML = `<div class="modal-confirmation">
  <p style="text-align: center;line-height: 1.5;">Thank you for<br>submitting your<br>registration details</p>
  </div>
  <input class="btn-submit" value="Fermer" onClick="closeModal()">`;
}

function validate(event) {
  event.preventDefault();
  let allClear = true;
  if (!nameCheckValidity(firstEntries.value)) {
    errorEntries(firstEntries, error.name);
    allClear = false;
  }
  if (!nameCheckValidity(lastEntries.value)) {
    errorEntries(lastEntries, error.name);
    allClear = false;
  }
  if (!emailCheckValidity(emailEntries.value)) {
    errorEntries(emailEntries, error.email);
    allClear = false;
  }
  if (!birthdateCheckValidity(birthdateEntries.value)) {
    errorEntries(birthdateEntries, error.birthdate);
    allClear = false;
  }
  if (!quantityCheckValidity(quantityEntries.value)) {
    errorEntries(quantityEntries, error.quantity);
    allClear = false;
  }
  if (!locationCheckValidity(locationEntries)) {
    errorEntries(locationEntries, error.location);
    allClear = false;
  }
  if (!checkboxCheckValidity(checkboxEntries)) {
    errorEntries(checkboxEntries, error.checkbox);
    allClear = false;
  }
  if (allClear) {
    formValidationCorrect();
  }
}

const error = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse email correcte.",
  birthdate: "Vous devez entrer votre date de naissance.",
  quantity: "Vous devez entrer un nombre correcte.",
  location: "Vous devez choisir une option.",
  checkbox: "Vous devez vérifier que vous acceptez les termes et conditions.",
};
