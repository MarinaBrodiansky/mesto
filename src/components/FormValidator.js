export default class FormValidator {
  
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    //this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
       
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();        
      });
    });
  };

  enableValidation = () => {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();     
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  _disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) =>{
      this._hideInputError(inputElement);
    });    
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };
}
