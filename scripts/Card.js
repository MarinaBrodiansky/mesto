export default class Card {
    constructor(data, templateSelector, callback) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._callback = callback;
    }

    //получаем шаблон
    _getTemplate = () => {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    //генерируем карточку
    generateCard = () => {
        //карточка
        this._element = this._getTemplate();

        this._image = this._element.querySelector('.element__image');
        this._title = this._element.querySelector('.element__title');
        this._trash = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__like-button');
        
        //добавляем обработчик
        this._setEventListener();

        //data
        this._title.textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;

        return this._element;
    }

    //слушатели (корзина, лайки, открыть большую картинку)
    _setEventListener = () => {
        this._trash.addEventListener('click', () => {
            this._element.remove();
        });
        this._like.addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like-button_active');
        });
        this._image.addEventListener('click', () => { this._callback(this._name, this._link) })
    }

}
