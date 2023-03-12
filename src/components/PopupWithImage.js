import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigImageTitle = this._popup.querySelector('.popup__element-title');
        this._bigImage = this._popup.querySelector('.popup__element-image')
    }

    open = (name, link) => {        
        super.open()
        this._bigImageTitle.textContent = name;
        this._bigImage.alt = name;
        this._bigImage.src = link;
    }
}