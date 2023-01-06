const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__input_value_user-name');
let jobInput = popupForm.querySelector('.popup__input_value_job');
let profileUserName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__job');


function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileJob.textContent;
}

popupOpenButtonElement.addEventListener('click', openPopup);

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

popupCloseButtonElement.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileUserName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;    
    closePopup();
}

popupForm.addEventListener('submit', handleFormSubmit);