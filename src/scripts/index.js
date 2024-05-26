import { initialCards } from "./cards.js";
import { handleEscapeClose, closeModal } from "../components/modal.js";
import { createCard, deleteCard } from "../components/card.js";
import '../pages/index.css';
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfilePopup = document.getElementById('editProfilePopup');
const addCardPopup = document.getElementById('addCardPopup');
const imagePopup = document.getElementById('imagePopup'); 
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const editProfileForm = document.getElementById('editProfileForm');
const addCardForm = document.getElementById('addCardForm');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileJobInput = editProfileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

function addCard(cardData, placesList, handleCardClick, handleDeleteCard, handleLikeClick) { 
    const cardElement = createCard(cardData, handleCardClick, handleDeleteCard, handleLikeClick); 
    placesList.prepend(cardElement); 
  }

function handleCardClick(link, alt, name) {  popupImage.src = link;
  popupImage.alt = alt;  popupCaption.textContent = name;
  openModal(imagePopup);
}

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeClose);
}
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;  profileJobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;  closeModal(editProfilePopup);
});

addCardForm.addEventListener('submit', (evt) => {  evt.preventDefault();
  const newCardData = {    name: cardNameInput.value,
    link: cardLinkInput.value,  
};
  addCard(newCardData, placesList, handleCardClick, deleteCard);  
  cardNameInput.value = '';  cardLinkInput.value = '';
  closeModal(addCardPopup);
});

const closeModalOut = (popup) => { 
     closeModal(popup);
};

const setCloseListener = () => {  
    const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {    
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
        closeModalOut(popup);      
    }
    });  
});
};

setCloseListener();

initialCards.forEach((cardData) => { 
     addCard(cardData, placesList, handleCardClick, deleteCard); 
});