export { createCard, deleteCard, like };
import {pushLike, deleteLike} from "../scripts/api.js"

function createCard(
  link,
  name,
  template,
  like,
  openImage,
  likes,
  anotherPersonId,
  cardId,
  localId,
  addDeleteButton,
) {
  const cardItem = template.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardtext = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const quantityLikes = cardItem.querySelector(".card__like-button_likes");

  cardItem.id = cardId;
  cardImage.src = link;
  cardtext.textContent = name;
  quantityLikes.textContent = likes.length;

  if(likes!==0){
    likes.forEach(element => {
      if(element._id === localId){
        cardLikeButton.classList.add("card__like-button_is-active");
      }
    });
  } else{
    quantityLikes.textContent = 0;
  }


  if(anotherPersonId !== localId){
    cardDeleteButton.style = 'display: none;'
  }

  // addDeleteButton(cardDeleteButton);

  cardDeleteButton.addEventListener('click', evt=>addDeleteButton(cardItem));

  cardLikeButton.addEventListener("click", like);
  cardImage.addEventListener("click", (evt) => openImage(link, name));
  return cardItem;
}

function deleteCard(evt) {
  evt.closest(".places__item").remove();
}

function like(evt) {
  const likeId  = evt.target.closest(".places__item").id
  if(evt.target.classList.contains("card__like-button_is-active")){
    evt.target.classList.remove("card__like-button_is-active");
    deleteLike(likeId)
    .then((newQuantity)=>{
      evt.target.closest(".places__item").querySelector(".card__like-button_likes").textContent = newQuantity;
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
  } else {
    evt.target.classList.add("card__like-button_is-active");
    pushLike(likeId)
    .then((newQuantity)=>{
      evt.target.closest(".places__item").querySelector(".card__like-button_likes").textContent = newQuantity;
    })
    .catch((err) => console.log(`Ошибка. Запрос не выполнен: ${err}`))
  }
}
