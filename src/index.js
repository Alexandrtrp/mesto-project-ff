import './pages/index.css'; 
import {initialCards, renderCard, saveCard} from './scripts/cards.js';
import {
    editPopup,
    addPopup,
    openPopup, 
    closePopup,
    handleFormSubmit,
    closeClick
} from './scripts/modal.js';

const logo = new URL('./images/logo.svg', import.meta.url);
const profImage = new URL('./images/avatar.jpg', import.meta.url);
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').setAttribute('style', `background-image: url(${profImage});`);

const editButton = document.querySelector('.profile__edit-button');
const addButtton = document.querySelector('.profile__add-button');
const saveForm = document.querySelector('.popup_type_new-card .popup__form');
const formElement = document.querySelector('.popup_type_edit .popup__form');

renderCard(initialCards);
formElement.addEventListener('submit', handleFormSubmit); 

editButton.addEventListener('click', openPopup);
addButtton.addEventListener('click', openPopup);

editPopup.addEventListener('click', closePopup);
addPopup.addEventListener('click', closePopup);

saveForm.addEventListener('submit', saveCard);

document.addEventListener('keyup', closeClick);