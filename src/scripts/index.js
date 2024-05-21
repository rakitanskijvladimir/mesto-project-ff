import { initialCards } from "./cards.js"; // импортирую данные в файл cards1
import { openModal, closeModal, handleEscapeClose } from "../components/modal.js"; // импортирую данные в папку components, файл cards1
import { createCard, addCard } from "../components/card.js"; // импортирую данные в папку components, файл cards2
import '../pages/index.css'; // импортирую css файл

// создаю переменные для работы с проектом
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfilePopup = document.getElementById('editProfilePopup');
const addCardPopup = document.getElementById('addCardPopup');
const placesList = document.querySelector('.places__list');
const editProfileForm = document.getElementById('editProfileForm');
const addCardForm = document.getElementById('addCardForm');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileJobInput = editProfileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');



// при клике открываю мод окно (редактирование) со значением указанном в переменных
profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
});

// при клике открываю мод окно (добавление)
profileAddButton.addEventListener('click', () => {
    openModal(addCardPopup);
});

//
editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closeModal(editProfilePopup);
});

//при клике открываю мод окно (добавление) вношу данные карточек и отправляю на сохранение
addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    addCard(newCardData, placesList);
    cardNameInput.value = '';
    cardLinkInput.value = '';
    closeModal(addCardPopup);
});

// закрываю мод окно и картику кликом рядом
  const closeModalOut = (popup) => {
    popup.classList.remove('popup_is-opened')
};
  const setCloseListener = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach((popup) => {
        popup.addEventListener('click', (event) => {
            if(event.target.classList.contains('popup') || event.target.classList.contains('popup__close'))
            closeModalOut(popup);
        })
    })
};
setCloseListener();

//добавляю карточки
initialCards.forEach((cardData) => {
    addCard(cardData, placesList);
});