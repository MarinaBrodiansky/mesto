import './../pages/index.css';

//imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { formValidationConfig, initialCards, popupEditProfile, 
  popupAddElement, popupBigImage, popups, editProfileOpenButton, 
  addElementOpenButton, bigImageOpenButton, profileUserName, 
  profileJob, popupFormEdit, nameInput, jobInput, popupFormAdd,
  elementNameInput, elementLinkInput, bigImageLink, bigImageTitle, 
  elementsList, elementTemplate, popupFormAvatar} 
  from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

//создание экземпляра класа Api
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    'content-type': 'application/json',
    Authorization: 'dec641ac-fc27-4805-b368-ba2e5680c0a5'
  }
})

//загрузка юзера
let user, section;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0].name, res[0].about, res[0].avatar);
    user = res[0];
    section = new Section({items: res[1], renderer: renderElement}, '.elements__list');
    section.renderItems();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))

//удаление карточки
const handleCardDeleteClick = (deleteCardFunc, cardId) => {
  api.deleteCard(cardId)
    .then((res) => {
      deleteCardFunc();
      popupWithSubmit.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
}

//лайк
const handleLikeClick = (cardId, colorLike, changeLikeCounter) => {
  api.likeCard(cardId)
    .then((res) => {
      colorLike();
      changeLikeCounter(res.likes.length);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
}

// анлайк
const handleUnlikeClick = (cardId, colorLike, changeLikeCounter) => {
  api.unlikeCard(cardId)
  .then((res) => {
      colorLike();
      changeLikeCounter(res.likes.length);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
}

//создание экземпляра класса userInfo
const userInfo = new UserInfo({nameSelector: '.profile__user-name', jobSelector: '.profile__job', imageSelector: '.profile__avatar'});

//submit
function handleAvatarFormSubmit(data) {
  popupAvatar.setSubmitButtonText('Сохранение...');
  api.editAvatar(data["avatar"])
  .then((res) => {
    console.log(res, 'AVATAR')
    userInfo.setAvatar(res.avatar);
    popupAvatar.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {popupAvatar.setSubmitButtonText('Сохранить')})
}

//создане экземпляра класса PopupWithForm Аватар
const popupAvatar = new PopupWithForm({popupSelector: '.popup_type_change-avatar', handleFormSubmit: handleAvatarFormSubmit})
popupAvatar.setEventListeners();

const openAvatarPopupButton = document.querySelector('.profile__avatar-container');
openAvatarPopupButton.addEventListener('click', () => {popupAvatar.open()})

//submit
function handleProfileFormSubmit(data) {
  popupProfile.setSubmitButtonText('Сохранение...');
  api.editUserInfo(data["profile__user-name"], data["profile__job"])
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupProfile.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {popupProfile.setSubmitButtonText('Сохранить')})
}

//создане экземпляра класса PopupWithForm
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit-profile', handleFormSubmit: handleProfileFormSubmit});
popupProfile.setEventListeners();

//создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_big-image');
popupWithImage.setEventListeners();

//создание экземпляра класса PopupWithSubmit
const popupWithSubmit = new PopupWithSubmit('.popup_type_confirm', handleCardDeleteClick);
popupWithSubmit.setEventListeners();

function createCard(data) {
  const cardElement = new Card(data, '#element__template', popupWithImage.open, popupWithSubmit.open, user._id, handleLikeClick, handleUnlikeClick).generateCard()
  return cardElement;
}

function renderElement(data) {
  section.addItem(createCard(data))
}

function handleAddFormSubmit(data) {
  popupAddCard.setSubmitButtonText('Сохранение...');
  api.addCard(data["element-name"], data["element-link"])
  .then((res) => {
    renderElement(res);
    popupAddCard.close(); 
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {popupAddCard.setSubmitButtonText('Сохранить')})
}

//создание экземпляра класса PopupWithForm
const popupAddCard = new PopupWithForm({popupSelector: '.popup_type_add-element', handleFormSubmit: handleAddFormSubmit});
popupAddCard.setEventListeners();

//Валидаторы
const popupFormEditValidator = new FormValidator(formValidationConfig, popupFormEdit);
popupFormEditValidator.enableValidation();

const popupFormAddValidator = new FormValidator(formValidationConfig, popupFormAdd);
popupFormAddValidator.enableValidation();

const popupFormAvatarValidator = new FormValidator(formValidationConfig, popupFormAvatar);
popupFormAvatarValidator.enableValidation();


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

openAvatarPopupButton.addEventListener('click', function() {
  popupFormAvatarValidator.resetValidation();
  popupAvatar.open();
})