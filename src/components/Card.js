export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteIconClick, userID, handleLikeClick, handleUnlikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._cardID = data._id;
        this._ownerID = data.owner._id;
        this._likes = data.likes;
        this._userID = userID;
        this._handleLikeClick = handleLikeClick;
        this._handleUnlikeClick = handleUnlikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
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
        this._likeCounter = this._element.querySelector('.element__like-count');

        // выводим лайки
        this._likeCounter.textContent = this._likes.length;

        // красим лайк
        if (this._likes.some((el) => el._id === this._userID)) this._colorLike();
        
        //добавляем обработчик
        this._setEventListener();

        //data
        this._title.textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;
        
        //удаление карточки
        if(this._ownerID !== this._userID) {
            this._trash.style.display = 'none';
        }

        return this._element;
    }

    _changeLikeCounter = (num) => this._likeCounter.textContent = num;

    _colorLike = () => this._like.classList.toggle('element__like-button_active');

    _removeElement = () => this._element.remove();

    //слушатели (корзина, лайки, открыть большую картинку)
    _setEventListener = () => {
        this._trash.addEventListener('click', () => {
            this._handleDeleteIconClick(this._removeElement, this._cardID)
        });
        this._like.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('element__like-button_active')) {
                this._handleUnlikeClick(this._cardID, this._colorLike, this._changeLikeCounter)
            } else {
                this._handleLikeClick(this._cardID, this._colorLike, this._changeLikeCounter)
            }
        });
        this._image.addEventListener('click', () => { this._handleCardClick(this._name, this._link) })
    }

}
