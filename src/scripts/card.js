export {createCard}

function createCard(link, name, template, like, openImage, deleteCard){

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