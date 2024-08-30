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

let myId = "";
let deleteTarget={};
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
const buttonDeletePopup = document.querySelector('.popup__delete-card .popup__button')

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

getAllInfo().then((res) => {
  res[0]()
    .then((result) => {
      myId = result._id;
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      document
        .querySelector(".profile__image")
        .setAttribute("style", `background-image: url(${result.avatar});`);
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
  res[1]()
    .then((result) => renderCards(result))
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`));
});

function addMessageBeforeSave(evt, result) {
  const buttonContent = evt.target.querySelector(".popup__button");
  if (result) {
    buttonContent.textContent = "Сохранить";
    return;
  }
  buttonContent.textContent = "Сохранение...";
}

function saveProfile(evt) {
  evt.preventDefault();
  addMessageBeforeSave(evt);
  pushNewProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => {
      evt.target.reset();
      addMessageBeforeSave(evt, res);
      closePopup(editPopup);
    });
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
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => {
      addMessageBeforeSave(evt, res);
      saveForm.reset();
      closePopup(addPopup);
    });
}

function saveAvatar(evt) {
  evt.preventDefault();
  addMessageBeforeSave(evt);
  addNewAvatar(avatarUrlInput.value)
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally((res) => {
      addMessageBeforeSave(evt, res);
      profileAvatar.style = `background-image: url(${avatarUrlInput.value});`;
      avatarForm.reset();
      closePopup(avatarPopup);
    });
}

function addDeleteButton(button) {
  button.addEventListener("click", (evt) => {
    openPopup(deleteCardPopup);
    evt.target.closest(".places__item").classList.add("delete-target");
    deleteTarget = document.querySelector('.delete-target');
  });
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
  if (closePopupByOverlay(evt)) {
    deleteTarget.classList.remove("delete-target");
  }
});

buttonDeletePopup.addEventListener("click", (evt) => {
    deleteCardApi(deleteTarget.id)
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
    .finally(res=>{
      deleteCard(deleteTarget);
      closePopup(deleteCardPopup);
    });
});

editForm.addEventListener("submit", saveProfile);
saveForm.addEventListener("submit", saveCard);
avatarForm.addEventListener("submit", saveAvatar);

enableValidation(validationConfig);
