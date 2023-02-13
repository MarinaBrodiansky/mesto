const initialCards = [
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

//попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupBigImage = document.querySelector('.popup_type_big-image');
//const popups = document.querySelectorAll('.popup');

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
const ElementNameInput = document.querySelector('.popup__input_value_element-name');
const ElementLinkInput = document.querySelector('.popup__input_value_element-link');

//картинка
const bigImageLink = popupBigImage.querySelector('.popup__element-image');
const bigImageTitle = popupBigImage.querySelector('.popup__element-title');

//карточки
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element__template').content;

//открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
};

//закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//закрыть попап по Esc
function closePopupEsc(evt) {
  if (evt.key ==='Escape') {    
    const popupOpened = document.querySelector('.popup_opened')
    if (popupOpened) {
      closePopup(popupOpened)
    }
  }
};

// закрыть попап по Overlay
function closePopupOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if(evt.target === popupOpened) {
    closePopup(popupOpened)
  }
};

//submit
function editHandleFormSubmit (evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);    
}

//создать элемент
function createElement(name, link) {    
    const elements = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elements.querySelector('.element__image');
    const elementTitle = elements.querySelector('.element__title');
    const elementLikeButton = elements.querySelector('.element__like-button');
    const elementTrashButton = elements.querySelector('.element__trash');

    elementTitle.textContent = name;    
    elementImage.src = link;
    elementImage.alt = name;

    //лайки
    elementLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
      });
    
    //корзина
    elementTrashButton.addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });

    //открытие попапа картинки
    elementImage.addEventListener('click', function() {
        openPopup(popupBigImage);
        bigImageTitle.textContent = name;
        bigImageTitle.alt = name;
        bigImageLink.src = link;
    });    

    return elements;
}

function renderElement (name, link) {
    elementsList.prepend(createElement(name, link));
}


initialCards.forEach(element => renderElement(element.name, element.link, element.name));

function addHandleFormSubmit (evt) {
    evt.preventDefault();
    elementsList.prepend(createElement(ElementNameInput.value, ElementLinkInput.value));
    evt.target.reset();
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
})

//закрыть по сабмиту
popupFormEdit.addEventListener('submit', editHandleFormSubmit);
popupAddElement.addEventListener('submit', addHandleFormSubmit);

//закрыть по Esc
document.addEventListener('keydown', closePopupEsc);

//Закрыть по Overlay
document.addEventListener('mousedown', closePopupOverlay);


    

















