import "./pages/index.css";
import { openPopup, closePopup, closePopupByOverlay } from "./scripts/modal.js";
import { createCard, like, deleteCard } from "./scripts/card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getProfileInfo,
  getInitialCards,
  getAllInfo,
  pushNewProfile,
  pushNewCard,
  deleteCardApi,
  addNewAvatar,
} from "./scripts/api.js";
export { imagePopup, openPopupImage, myId, deleteCardPopup, deleteCardApi };

const logo = new URL("./images/logo.svg", import.meta.url);
document.querySelector(".header__logo").src = logo;

let myId = "";
let deleteTarget = {};
const cardTemplate = document.querySelector("#card-template").content;
const editButton = document.querySelector(".profile__edit-button");
const addButtton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addPopup = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const saveForm = document.querySelector(".popup_type_new-card .popup__form");

const imagePopup = document.querySelector(".popup_type_image");
const pictureInPopup = document.querySelector(".popup__image");
const captionInPopup = document.querySelector(".popup__caption");

const deleteCardPopup = document.querySelector(".popup__delete-card");
const buttonDeletePopup = document.querySelector(
  ".popup__delete-card .popup__button"
);

const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup__new-avatar");
const avatarUrlInput = document.querySelector(".popup__input_type_url-avatar");
const avatarForm = document.querySelector(".popup__new-avatar .popup__form");

const allPopup = document.querySelectorAll(".popup");

allPopup.forEach((el) => {
  el.classList.add("popup_is-animated");
});

function renderCards(data) {
  data.forEach((el) => {
    placesList.append(
      createCard(
        el.link,
        el.name,
        cardTemplate,
        like,
        openPopupImage,
        el.likes,
        el.owner._id,
        el._id,
        myId,
        addDeleteButton
      )
    );
  });
}

function openPopupImage(link, name) {
  openPopup(imagePopup);
  pictureInPopup.src = link;
  captionInPopup.textContent = name;
}

// Promise.all([getProfileInfo(), getInitialCards(),])
// .then(res=>console.log(res))

getAllInfo()
  .then((res) => {
    myId = res[0]._id;
    profileTitle.textContent = res[0].name;
    profileDescription.textContent = res[0].about;
    profileAvatar.setAttribute(
      "style",
      `background-image: url(${res[0].avatar});`
    );
    renderCards(res[1]);
  })
  .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));

function addMessageBeforeSave(evt, result) {
  const buttonContent = evt.target.querySelector(".popup__button");
  buttonContent.textContent = "Сохранение...";
  if (result) {
    buttonContent.textContent = "Сохранить";
  }
}

function saveProfile(evt) {
  evt.preventDefault();
  addMessageBeforeSave(evt);
  pushNewProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      evt.target.reset();
      closePopup(editPopup);
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => addMessageBeforeSave(evt, true));
}

function saveCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const url = urlInput.value;
  addMessageBeforeSave(evt);
  pushNewCard(name, url)
    .then((id) => {
      placesList.prepend(
        createCard(
          url,
          name,
          cardTemplate,
          like,
          openPopupImage,
          0,
          myId,
          id,
          addDeleteButton
        )
      );
      saveForm.reset();
      closePopup(editPopup);
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => addMessageBeforeSave(evt, true));
}

function saveAvatar(evt) {
  evt.preventDefault();
  addMessageBeforeSave(evt);
  addNewAvatar(avatarUrlInput.value)
    .then((res) => {
      profileAvatar.style = `background-image: url(${avatarUrlInput.value});`;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => addMessageBeforeSave(evt, true));
}

function addDeleteButton(card) {
  openPopup(deleteCardPopup);
  deleteTarget = card;
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
deleteCardPopup.addEventListener("click", (evt) => closePopupByOverlay(evt));
// Не понимаю почему обработчик лишний, если он отвечает за закрытие попапа


buttonDeletePopup.addEventListener("click", (evt) => {
  deleteCardApi(deleteTarget.id)
    .then((res) => {
      deleteCard(deleteTarget);
      closePopup(deleteCardPopup);
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
});

editForm.addEventListener("submit", saveProfile);
saveForm.addEventListener("submit", saveCard);
avatarForm.addEventListener("submit", saveAvatar);

enableValidation(validationConfig);
