import "./pages/index.css";
import { openPopup, closePopup, closePopupByOverlay } from "./scripts/modal.js";
import { createCard, like, deleteCard } from "./scripts/card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import { getAllInfo, pushNewProfile, pushNewCard } from "./scripts/api.js";
export { imagePopup, openPopupImage };

const logo = new URL("./images/logo.svg", import.meta.url);
document.querySelector(".header__logo").src = logo;

const cardTemplate = document.querySelector("#card-template").content;
const editButton = document.querySelector(".profile__edit-button");
const addButtton = document.querySelector(".profile__add-button");
const saveForm = document.querySelector(".popup_type_new-card .popup__form");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const placesList = document.querySelector(".places__list");

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");

function renderCards(data) {
  data.forEach((el) => {
    placesList.append(
      createCard(
        el.link,
        el.name,
        cardTemplate,
        like,
        openPopupImage,
        deleteCard
      )
    );
  });
}

function openPopupImage(link, name) {
  openPopup(imagePopup);
  imagePopup.querySelector(".popup__image").src = link;
  imagePopup.querySelector(".popup__caption").textContent = name;
}

getAllInfo().then((res) => {
  res[0]()
  .then((result) => {
    console.log(result)
    profileTitle.textContent = result.name;
    profileDescription.textContent =
      result.about;
    document
      .querySelector(".profile__image")
      .setAttribute("style", `background-image: url(${result.avatar});`);
  });
  res[1]()
  .then(result => renderCards(result))
})

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value;
  pushNewProfile(nameInput.value, jobInput.value)
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

function saveCard(evt) {
  evt.preventDefault();
  const saveCardName = document.querySelector(".popup__input_type_card-name").value;
  const saveCardLink = document.querySelector(".popup__input_type_url").value;
  pushNewCard(saveCardName, saveCardLink);
  placesList.prepend(createCard(saveCardLink, saveCardName, cardTemplate));
  saveForm.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}


editButton.addEventListener("click", (evt) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
  clearValidation(editForm, validationConfig);
});

addButtton.addEventListener("click", (evt) => {
  cardNameInput.value = "";
  urlInput.value = "";
  openPopup(addPopup);
  clearValidation(saveForm, validationConfig);
});

editPopup.addEventListener("click", closePopupByOverlay);
addPopup.addEventListener("click", closePopupByOverlay);
imagePopup.addEventListener("click", closePopupByOverlay);

editForm.addEventListener("submit", saveProfile);

saveForm.addEventListener("submit", saveCard);

enableValidation(validationConfig);
