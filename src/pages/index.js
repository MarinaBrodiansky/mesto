import './../pages/index.css';

//imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { formValidationConfig, initialCards, popupEditProfile, popupAddElement, popupBigImage, popups, editProfileOpenButton, addElementOpenButton, 
  bigImageOpenButton, profileUserName, profileJob, popupFormEdit, nameInput, jobInput, popupFormAdd,
  elementNameInput, elementLinkInput, bigImageLink, bigImageTitle, elementsList, elementTemplate } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//создание экземпляра класса userInfo
const userInfo = new UserInfo({nameSelector: '.profile__user-name', jobSelector: '.profile__job'});

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
popupWithImage.setEventListeners();

function createCard(name, link) {
  const cardElement = new Card({name, link}, '#element__template', popupWithImage.open).generateCard()
  return cardElement
}

function renderElement(name, link) {
  elementsList.prepend( createCard(name, link) );
}

//создание экземпляра класса Section
const section = new Section({items: initialCards, renderer: renderElement}, '.elements__list');
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
  popupProfile.open();
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileJob.textContent;
});

addElementOpenButton.addEventListener('click', function () {
  popupFormAddValidator.resetValidation();
  popupAddCard.open();
});