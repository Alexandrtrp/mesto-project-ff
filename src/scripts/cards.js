export {initialCards, renderCard, saveCard};
import { closeClick, imageOpenClose } from "./modal.js";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(link, name, template){

  const cardItem = template.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardtext = cardItem.querySelector('.card__title');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = link;
  cardtext.textContent = name;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', liking);
  cardImage.addEventListener('click', imageOpenClose)
  return cardItem;
}

function renderCard(data) {

data.forEach((el) => {
  placesList.append(createCard(el.link, el.name, cardTemplate));
})  
}

function deleteCard(evt) {
evt.target.closest('.places__item').remove()
}


function saveCard(evt){
  evt.preventDefault();
  const saveCardName = document.querySelector('.popup__input_type_card-name').value;
  const saveCardLink = document.querySelector('.popup__input_type_url').value;
  placesList.prepend(createCard(saveCardLink, saveCardName, cardTemplate));
  document.querySelector('.popup__input_type_card-name').value = '';
  document.querySelector('.popup__input_type_url').value = '';
  closeClick(evt);
}

function liking(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}
