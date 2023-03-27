import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupInputs = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        const data = {};
        this._popupInputs.forEach(element => {
            data[element.getAttribute('name')] = element.value
        });
        return data;
    };

    setSubmitButtonText = (text) => this._submitButton.textContent = text;

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}