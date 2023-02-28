const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    console.log(inputElement.id, 'input el id');

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
    // formElement.addEventListener('reset', () => {
    //   // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    //   setTimeout(() => {
    //     toggleButtonState(inputList, buttonElement, config);
    //   }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    // });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  const enableValidation =(config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, config);
    });
  };
  
  const hasInvalidInput = (inputList) => {  
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  function enableButton (buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  };
  
  function disableButton(buttonElement, config) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass)
  }
  
  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, config);
      } else {
        enableButton (buttonElement, config);            
        }      
  };
  
    enableValidation(formValidationConfig);