import "./pages/index.css";
import { openPopup, closePopup, closePopupByOverlay } from "./scripts/modal.js";
import { createCard, like, deleteCard } from "./scripts/card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getAllInfo,
  pushNewProfile,
  pushNewCard,
  deleteCardApi,
  addNewAvatar,
} from "./scripts/api.js";
export { imagePopup, openPopupImage, myId, deleteCardPopup, deleteCardApi };

const logo = new URL("./images/logo.svg", import.meta.url);
document.querySelector(".header__logo").src = logo;

const myId = "b0ff82b903f1b1bd17ff6a6c";
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
const deleteCardPopup = document.querySelector(".popup__delete-card");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup__new-avatar");
const avatarUrlInput = document.querySelector(".popup__input_type_url-avatar");
const avatarForm = document.querySelector(".popup__new-avatar .popup__form");

function renderCards(data) {
  data.forEach((el) => {
    placesList.append(
      createCard(
        el.link,
        el.name,
        cardTemplate,
        like,
        openPopupImage,
        openPopup,
        el.likes,
        el.owner._id,
        el._id
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
  res[0]().then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    document
      .querySelector(".profile__image")
      .setAttribute("style", `background-image: url(${result.avatar});`);
  });
  res[1]().then((result) => renderCards(result));
});

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  messageBeforeAdd(evt);
  pushNewProfile(nameInput.value, jobInput.value).then((res) =>
    messageBeforeAdd(evt, res)
  );
  evt.target.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

function messageBeforeAdd(evt, result) {
  const buttonContent = evt.target.querySelector(".popup__button");
  if (result) {
    buttonContent.textContent = "Сохранить";
    return;
  }
  buttonContent.textContent = "Сохранение...";
}

function saveCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const url = urlInput.value;
  messageBeforeAdd(evt);
  pushNewCard(name, url)
    .then((id) => {
      placesList.prepend(
        createCard(
          url,
          name,
          cardTemplate,
          like,
          openPopupImage,
          openPopup,
          0,
          myId,
          id
        )
      );
    })
    .then((res) => messageBeforeAdd(evt, res));

  saveForm.reset();
  closePopup(document.querySelector(".popup_is-opened"));
}

function saveAvatar(evt) {
  evt.preventDefault();
  messageBeforeAdd(evt);
  addNewAvatar(avatarUrlInput.value).then((res) => messageBeforeAdd(evt, res));
  profileAvatar.style = `background-image: url(${avatarUrlInput.value});`;
  avatarForm.reset();
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

profileAvatar.addEventListener("click", (evt) => {
  avatarUrlInput.value = "";
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

editPopup.addEventListener("click", closePopupByOverlay);
addPopup.addEventListener("click", closePopupByOverlay);
imagePopup.addEventListener("click", closePopupByOverlay);
avatarPopup.addEventListener("click", closePopupByOverlay);

deleteCardPopup.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopupByOverlay(evt);
    document.querySelector(".delete-target").classList.remove("delete-target");
  }
});

deleteCardPopup.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__button")) {
    closePopup(document.querySelector(".popup_is-opened"));
    deleteCardApi(document.querySelector(".delete-target").id);
    deleteCard(document.querySelector(".delete-target"));
  }
});

editForm.addEventListener("submit", saveProfile);
saveForm.addEventListener("submit", saveCard);
avatarForm.addEventListener("submit", saveAvatar);

enableValidation(validationConfig);
