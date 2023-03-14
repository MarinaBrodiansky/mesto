  export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  export const formValidationConfig = {
    //formSelector: '.popup__form',  
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
 //попапы
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddElement = document.querySelector('.popup_type_add-element');
export const popupBigImage = document.querySelector('.popup_type_big-image');
export const popups = document.querySelectorAll('.popup');

//кнопка открыть
export const editProfileOpenButton = document.querySelector('.profile__edit-button');
export const addElementOpenButton = document.querySelector('.profile__add-button');
export const bigImageOpenButton = document.querySelector('.element');

//редактировать профиль
export const profileUserName = document.querySelector('.profile__user-name');
export const profileJob = document.querySelector('.profile__job');
export const popupFormEdit = document.querySelector('.popup__form_edit');
export const nameInput = document.querySelector('.popup__input_value_user-name');
export const jobInput = document.querySelector('.popup__input_value_job');

//добавить картинку
export const popupFormAdd = document.querySelector('.popup__form_add');
export const elementNameInput = document.querySelector('.popup__input_value_element-name');
export const elementLinkInput = document.querySelector('.popup__input_value_element-link');

//картинка
export const bigImageLink = popupBigImage.querySelector('.popup__element-image');
export const bigImageTitle = popupBigImage.querySelector('.popup__element-title');

//карточки
export const elementsList = document.querySelector('.elements__list');
export const elementTemplate = document.querySelector('#element__template').content;
  