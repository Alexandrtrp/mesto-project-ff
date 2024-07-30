export {
  editPopup,
  addPopup,
  imagePopup,
  nameInput,
  jobInput,
  openPopup, 
  closePopup, 
  closeClick,
  handleFormSubmit,
  imageOpenClose,
  formPlaceholder,
};

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const popupArr = document.querySelectorAll('.popup');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const imagePopup = document.querySelector('.popup_type_image');

function openPopup(button) {
  if (button.target.classList.contains("profile__edit-button")) {
    editPopup
      .classList.toggle("popup_is-opened");
      addPopup
      .classList.add('popup_is-animated');
  } else if (button.target.classList.contains("profile__add-button")) {
    document
      .querySelector(".popup_type_new-card")
      .classList.toggle("popup_is-opened");
      document
      .querySelector(".popup_type_new-card")
      .classList.add('popup_is-animated');
  }
  removeEventListener("click", button);
}

function closePopup(evt) {
  if (evt.target.classList.contains("popup__close")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    closeClick(evt);
  } else if (evt.target.classList.contains("popup")) {
    closeClick(evt);
  }
  removeEventListener("click", evt);
}

function closeClick(evt) {
  if(evt.key === 'Escape'){
   
    popupArr.forEach(el =>{
      if(el.classList.contains('popup_is-opened')){
        el.classList.add("popup_is-animated");
        el.classList.toggle("popup_is-opened");
        removeEventListener('click', evt)
      }
    });
    return
  }
  evt.target.closest(".popup").classList.add("popup_is-animated");
  evt.target.closest(".popup").classList.toggle("popup_is-opened");
}

function formPlaceholder(name, description) {
  name.setAttribute("placeholder", profileTitle.textContent);
  description.setAttribute("placeholder", profileDescription.textContent);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formPlaceholder(nameInput, jobInput)
  nameInput.value = '';
  jobInput.value = '';
  closeClick(evt);
}

function imageOpenClose(evt){
  imagePopup.classList.toggle('popup_is-opened');
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__caption').textContent = 
  evt.target.closest('.places__item').querySelector('.card__title').textContent;

}

