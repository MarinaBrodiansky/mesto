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

// закрыть попап по Overlay или крестику
popups.forEach((popup) =>
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
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

function openGalleryPopup (name, link) {
  openPopup(popupBigImage);
  bigImageTitle.textContent = name;
  bigImageLink.alt = name;
  bigImageLink.src = link;
};

function createCard(name, link, handleCardClick) {
  const cardElement = new Card({name, link}, '#element__template', handleCardClick).generateCard()
  return cardElement
}

function renderElement(name, link, handleCardClick) {
  elementsList.prepend( createCard(name, link, handleCardClick) );
}

initialCards.forEach(element => renderElement(element.name, element.link, openGalleryPopup));

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderElement(elementNameInput.value, elementLinkInput.value, openGalleryPopup)
  evt.target.reset();
  closePopup(popupAddElement) 
}

// Валидаторы
const popupFormEditValidator = new FormValidator(formValidationConfig, popupFormEdit);
popupFormEditValidator.enableValidation();

const popupFormAddValidator = new FormValidator(formValidationConfig, popupFormAdd);
popupFormAddValidator.enableValidation();

//слушатели
//открыть попап
editProfileOpenButton.addEventListener('click', function () {
  popupFormEditValidator.resetValidation();
  openPopup(popupEditProfile);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileJob.textContent;
});

addElementOpenButton.addEventListener('click', function () {
  popupFormAddValidator.resetValidation();
  openPopup(popupAddElement);
});

//закрыть по сабмиту
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
popupAddElement.addEventListener('submit', handleAddFormSubmit);















