import './../pages/index.css';

//imports
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { formValidationConfig, initialCards } from "../scripts/constants.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

//создание экземпляра класса userInfo
const userInfo = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__job'});

//submit
function handleProfileFormSubmit(data) {
  console.log(data, 'DATA');
  console.log(data["profile__user-name"], 'DATA');
  userInfo.setUserInfo(data["profile__user-name"], data["profile__job"]);
  popupProfile.close();
}

//создане экземпляра класса PopupWithForm
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit-profile', handleFormSubmit: handleProfileFormSubmit});
popupProfile.setEventListeners();

//создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_big-image');

function createCard(name, link, handleCardClick) {
  const cardElement = new Card({name, link}, '#element__template', handleCardClick).generateCard()
  return cardElement
}

function renderElement(name, link, handleCardClick) {
  elementsList.prepend( createCard(name, link, handleCardClick) );
}

//создание экземпляра класса Section
const section = new Section({items: initialCards, renderer: renderElement}, '.elements__list', popupWithImage.open);
section.renderItems();

function handleAddFormSubmit(data) {
  renderElement(data["element-name"], data["element-link"], popupWithImage.open)
  popupAddCard.close(); 
}

//создане экземпляра класса PopupWithForm
const popupAddCard = new PopupWithForm({popupSelector: '.popup_type_add-element', handleFormSubmit: handleAddFormSubmit});
popupAddCard.setEventListeners();

//Валидаторы
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