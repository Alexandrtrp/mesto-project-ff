export { enableValidation, clearValidation, validationConfig };

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch || inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessageDefault);
    addDopValidationMessege(inputElement);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function addDopValidationMessege(inputElement){
  const dopValidClasses = ['popup__input_type_name', 'popup__input_type_card-name']
  if(inputElement.validity.patternMismatch && [...inputElement.classList].some(className => dopValidClasses.includes(className))){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
}

// Перечислены уникальные селекторы так как по заданию требуется именно для определенных двух инпутов добавить
// второе кастомное сообщение при валидации. Данная функия будет выступать дополнительным обЪектом настроек
// для дополнительных кастомных сообщений

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (inputList.length === 0) {
    return;
  }
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

//Кнопка созранения профился при первом открытии неактивна из-за атрибута required


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function setEventListeners(formElement,settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener("input", ()=> {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function clearValidation(profileForm, validationConfig){
  Array.from(profileForm.querySelectorAll(validationConfig.inputSelector)).forEach(el=>{
    const errorElement = profileForm.querySelector(`.${el.id}-error`);
    el.classList.remove(validationConfig.inputErrorClass);
    el.setCustomValidity("");
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
    toggleButtonState(
      Array.from(profileForm.querySelectorAll(validationConfig.inputSelector)),
      profileForm.querySelector(validationConfig.submitButtonSelector),
      validationConfig.inactiveButtonClass
    )
  })
}; 
