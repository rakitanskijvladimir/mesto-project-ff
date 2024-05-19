// // @todo: Темплейт карточки

// // @todo: DOM узлы

// // @todo: Функция создания карточки

// // @todo: Функция удаления карточки

// // @todo: Вывести карточки на страницу

import { initialCards } from "./cards.js";
import '../pages/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const editProfilePopup = document.getElementById('editProfilePopup');
  const addCardPopup = document.getElementById('addCardPopup');
  const imagePopup = document.getElementById('imagePopup');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  const editProfileForm = document.getElementById('editProfileForm');
  const addCardForm = document.getElementById('addCardForm');
  const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
  const profileJobInput = editProfileForm.querySelector('.popup__input_type_description');
  const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
  const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

  const cardTemplate = document.getElementById('card-template');
  const placesList = document.querySelector('.places__list');


  function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
  };

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.addEventListener('transitionend', function handleTransitionEnd() {
      popup.classList.remove('popup_is-animated');
      popup.removeEventListener('transitionend', handleTransitionEnd);
    });
  };

  function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closePopup(editProfilePopup);
  }

  function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    addCard(newCardData);
    cardNameInput.value = '';
    cardLinkInput.value = '';
    closePopup(addCardPopup);
  }

  function createCard(cardData) {
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
    });

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
    });

    cardImage.addEventListener('click', () => {
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupCaption.textContent = cardTitle.textContent;
      openPopup(imagePopup);
    });

    return cardElement;
  }

  function deleteCard(cardElement) {
    cardElement.remove();
  }

  function addCard(cardData) {
    const cardElement = createCard(cardData);
    placesList.insertBefore(cardElement, placesList.firstChild);
  }

  profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
  });

  profileAddButton.addEventListener('click', () => {
    openPopup(addCardPopup);
  });

  editProfileForm.addEventListener('submit', handleEditProfileSubmit);
  addCardForm.addEventListener('submit', handleAddCardSubmit);

  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup || event.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openPopup = document.querySelector('.popup:not([style*="display: none"])');
      if (openPopup) {
        closePopup(openPopup);
      }
    }
  });

  
  initialCards.forEach((cardData) => { 
    const cardElement = createCard(cardData);
    placesList.prepend(cardElement);
  });
});

