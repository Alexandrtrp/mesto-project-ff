export {
  openPopup,
  closePopup,
  closePopupByEsc,
  closePopupByOverlay,
};

function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('keydown', closePopupByEsc);

}

function closePopupByEsc(evt){
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

function closePopupByOverlay(evt){
  if (evt.target.classList.contains("popup") || evt.target.classList.contains('popup__close')) { 
      closePopup(evt.currentTarget); 
      return true
    }
}


