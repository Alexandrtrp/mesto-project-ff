const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(link, name, template){

        const cardItem = template.querySelector('.places__item').cloneNode(true);
        const cardImage = cardItem.querySelector('.card__image');
        const cardtext = cardItem.querySelector('.card__title');
        const cardDeleteButton = cardItem.querySelector('.card__delete-button');

        cardImage.src = link;
        cardtext.textContent = name;
        cardDeleteButton.addEventListener('click', event => deleteCard(event.target));
        return cardItem;
}

function renderCard(data) {

    data.forEach((el) => {
        placesList.append(createCard(el.link, el.name, cardTemplate));
    })  
}

function deleteCard(target) {
    target.closest('.places__item').remove()
}

renderCard(initialCards);