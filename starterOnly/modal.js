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
  entries.parentElement.setAttribute("data-error-visible", true);
  entries.parentElement.setAttribute("data-error", error);
  console.log(entries.parentElement);
}

function validate(event) {
  event.preventDefault();
  if (!nameCheckValidity(firstEntries.value)) {
    errorEntries(firstEntries, error.name);
  }
  if (!nameCheckValidity(lastEntries.value)) {
    errorEntries(lastEntries, error.name);
  }
  if (!emailCheckValidity(emailEntries.value)) {
    errorEntries(emailEntries, error.email);
  }
  if (!birthdateCheckValidity(birthdateEntries.value)) {
    errorEntries(birthdateEntries, error.birthdate);
  }
  if (!quantityCheckValidity(quantityEntries.value)) {
    errorEntries(quantityEntries, error.quantity);
  }
  if (!locationCheckValidity(locationEntries)) {
    errorEntries(locationEntries, error.location);
  }
  if (!checkboxCheckValidity(checkboxEntries)) {
    errorEntries(checkboxEntries, error.checkbox);
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
