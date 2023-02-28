//import { formValidationConfig, FormValidator } from "./FormValidator.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { formValidationConfig, initialCards } from "./constants.js";



//попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popups = document.querySelectorAll('.popup');

//кнопка открыть
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const addElementOpenButton = document.querySelector('.profile__add-button');
const bigImageOpenButton = document.querySelector('.element');

//кнопки закрыть
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//редактировать профиль
const profileUserName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__job');
const popupFormEdit = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_value_user-name');
const jobInput = document.querySelector('.popup__input_value_job');

//добавить картинку
const popupFormAdd = document.querySelector('.popup__form_add');
const elementNameInput = document.querySelector('.popup__input_value_element-name');
const elementLinkInput = document.querySelector('.popup__input_value_element-link');

//картинка
const bigImageLink = popupBigImage.querySelector('.popup__element-image');
const bigImageTitle = popupBigImage.querySelector('.popup__element-title');

//карточки
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element__template').content;

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  //popup.removeEventListener('mousedown', closePopupOverlay);
};

//закрыть попап по Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    if (popupOpened) {
      closePopup(popupOpened)
    }
  }
};

// закрыть попап по Overlay
popups.forEach((evt) =>
  evt.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  })
);

//submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//создать элемент
// function createElement(name, link) {
//   const elements = elementTemplate.querySelector('.element').cloneNode(true);
//   const elementImage = elements.querySelector('.element__image');
//   const elementTitle = elements.querySelector('.element__title');
//   const elementLikeButton = elements.querySelector('.element__like-button');
//   const elementTrashButton = elements.querySelector('.element__trash');

//   elementTitle.textContent = name;
//   elementImage.src = link;
//   elementImage.alt = name;

//   //лайки
//   elementLikeButton.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('element__like-button_active');
//   });

//   //корзина
//   elementTrashButton.addEventListener('click', function (evt) {
//     evt.target.closest('.element').remove();
//   });

//   //открытие попапа картинки
  
//   return elements;
// }


function openGalleryPopup (name, link) {
  openPopup(popupBigImage);
  bigImageTitle.textContent = name;
  bigImageLink.alt = name;
  bigImageLink.src = link;
};

function renderElement(name, link, callback) {
  const newCard = new Card({name, link}, '#element__template', callback).generateCard();
  elementsList.prepend(newCard);
}

initialCards.forEach(element => renderElement(element.name, element.link, openGalleryPopup));

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderElement(elementNameInput.value, elementLinkInput.value, openGalleryPopup)
  evt.target.reset();

  const submitButton = evt.target.querySelector('.popup__submit-button');
  submitButton.disabled = true;
  submitButton.classList.add('popup__submit-button_disabled');

  closePopup(popupAddElement);
}

//слушатели
//открыть попап
editProfileOpenButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileJob.textContent;
});

addElementOpenButton.addEventListener('click', function () {
  openPopup(popupAddElement);
});

//закрыть попап
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'))
  });
});

//закрыть по сабмиту
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
popupAddElement.addEventListener('submit', handleAddFormSubmit);

//закрыть по Esc


//Закрыть по Overlay
//popupAddElement.addEventListener('mousedown', closePopupOverlay);
//popupEditProfile.addEventListener('mousedown', closePopupOverlay);
//popupBigImage.addEventListener('mousedown', closePopupOverlay);

// Валидаторы


const popupFormEditValidator = new FormValidator(formValidationConfig, popupFormEdit);
popupFormEditValidator.enableValidation();

const popupFormAddValidator = new FormValidator(formValidationConfig, popupFormAdd);
popupFormAddValidator.enableValidation();


















