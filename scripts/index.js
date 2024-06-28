const cardTemplate = document.querySelector('#card-template').content;

let placesList = document.querySelector('.places__list');
let cardItem;
let cardImage;
let cardtext;

function renderCard(data, template) {

    data.forEach((el) => {

        cardItem = template.querySelector('.places__item').cloneNode(true);
        cardImage = cardItem.querySelector('.card__image');
        cardtext = cardItem.querySelector('.card__title');

        cardImage.src = el.link;
        cardtext.textContent = el.name;
        placesList.append(cardItem);
    })  
}

function deleteCard() {
    const cardDeleteButton = document.querySelectorAll('.card__delete-button');
    cardDeleteButton.forEach(el =>{
        el.addEventListener('click', event =>{
            event.target.closest('.places__item').remove()
        })
    })
}

renderCard(initialCards, cardTemplate);
deleteCard();