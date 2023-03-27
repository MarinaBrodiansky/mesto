import Popup from "./popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleCardDeleteClick) {
        super(popupSelector);
        this._confirmBtn = this._popup.querySelector('.popup__submit-button');
        this._handleCardDeleteClick = handleCardDeleteClick;
        this._deleteCardFunc = null;
        this._cardId = null;
    }

    open = (deleteCard, cardId) => {
        super.open();
        this._deleteCardFunc = deleteCard;
        this._cardId = cardId;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._confirmBtn.addEventListener('click', () => {
            this._handleCardDeleteClick(this._deleteCardFunc, this._cardId)
        })
    }
}