export {initialCards, createCard, like};

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


function createCard(link, name, template, like, openImage){

  const cardItem = template.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardtext = cardItem.querySelector('.card__title');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = link;
  cardtext.textContent = name;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', like);
  cardImage.addEventListener('click', evt => openImage(link, name))
  return cardItem;
}


function deleteCard(evt) {
evt.target.closest('.places__item').remove();
evt.target.removeEventListener('click', deleteCard)
}


function like(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}
