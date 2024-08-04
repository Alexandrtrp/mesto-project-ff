import './pages/index.css'; 
import {initialCards, createCard, like} from './scripts/cards.js';
import {
    openPopup,
    closePopup,
    closePopupByOverlay,
} from './scripts/modal.js';

export {imagePopup, openPopupImage};

const logo = new URL('./images/logo.svg', import.meta.url);
const profImage = new URL('./images/avatar.jpg', import.meta.url);
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').setAttribute('style', `background-image: url(${profImage});`);

const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const addButtton = document.querySelector('.profile__add-button');
const saveForm = document.querySelector('.popup_type_new-card .popup__form');
const editForm = document.querySelector('.popup_type_edit .popup__form');
const placesList = document.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const imagePopup = document.querySelector('.popup_type_image');

function renderCards(data) {

    data.forEach((el) => {
      placesList.append
      (createCard(el.link, el.name, cardTemplate, like, openPopupImage));
    })  
}

// function fillPopupProfileInputs(name, description) { 
//   name.setAttribute("placeholder", profileTitle.textContent); 
//   description.setAttribute("placeholder", profileDescription.textContent); 
// }

function openPopupImage(link, name){
  openPopup(imagePopup);
  imagePopup.querySelector('.popup__image').src = link;
  imagePopup.querySelector('.popup__caption').textContent = name;
  
}

function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  evt.target.reset();
  closePopup(document.querySelector('.popup_is-opened'))
}

function saveCard(evt){
    evt.preventDefault();
    const saveCardName = document.querySelector('.popup__input_type_card-name').value;
    const saveCardLink = document.querySelector('.popup__input_type_url').value;
    placesList.prepend(createCard(saveCardLink, saveCardName, cardTemplate));
    saveForm.reset();
    closePopup(document.querySelector('.popup_is-opened'));
  }

renderCards(initialCards);


editButton.addEventListener('click', evt => openPopup(editPopup));
addButtton.addEventListener('click', evt => openPopup(addPopup));

editPopup.addEventListener('click', closePopupByOverlay);
addPopup.addEventListener('click', closePopupByOverlay);
imagePopup.addEventListener('click', closePopupByOverlay); 

editForm.addEventListener('submit', saveProfile);

saveForm.addEventListener('submit', saveCard);
