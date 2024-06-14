import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import "../pages/index.css";
import { api } from "./api.js";

let PROFILE = null;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.getElementById("editProfilePopup");
const avatarModalPopup = document.getElementById("avatarModalPopup")
const addCardPopup = document.getElementById("addCardPopup");
const imagePopup = document.getElementById("imagePopup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const editProfileForm = document.getElementById("editProfileForm");
const profileNameInput = editProfileForm.querySelector(".popup__input_type_name");
const profileJobInput = editProfileForm.querySelector(".popup__input_type_description");
const addCardForm = document.getElementById("addCardForm");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

import { enableValidation, clearValidation } from '../scripts/validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    enableValidation(validationConfig);

    const addCardPopup = document.querySelector('#addCardPopup');
    const addCardForm = addCardPopup.querySelector('#addCardForm');

    addCardPopup.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission logic here
        clearValidation(addCardForm, validationConfig);
    });

    addCardPopup.querySelector('.popup__close').addEventListener('click', () => {
        clearValidation(addCardForm, validationConfig);
    });
});



function addCard(
  cardData,
  placesList,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick
) {
  const cardElement = createCard(
    cardData,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  placesList.prepend(cardElement);
}

function handleCardClick(link, alt, name) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

profileImage.addEventListener("click", () => {
  
  
  openModal(avatarModalPopup);
})

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (validation(evt.target) == true) {
    console.log("форма проверена успешно");

    const newProfile = {
      name: profileNameInput.value,
      about: profileJobInput.value,
    }

    api.editProfile(newProfile)
      .then((profile) => {
        console.log(profile);
        PROFILE = profile;
        profileName.textContent = profile.name;
      })
  }
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editProfilePopup);
});




addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  api.addNewCard(newCardData)
    .then(cardData => {
      addCard(cardData, placesList, handleCardClick, deleteCard);

    })

  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModal(addCardPopup);
});

const closeModalOut = (popup) => {
  closeModal(popup);
};

const setCloseListener = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close")
      ) {
        closeModalOut(popup);
      }
    });
  });
};

setCloseListener();

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));


const fetchProfile = () => {
  api.fetchProfile()
    .then(profile => {
        PROFILE = profile;
        console.log("профиль: ", profile)
        profileName.textContent = profile.name
        profileDescription.textContent = profile.about
    })
}

fetchProfile();

const initialCards = () => {
  api.initialCards()
    .then(cards => {
      console.log('cards', cards)
      cards.forEach((card) => {
        const handleLikeCard = (likeButton) => {
          card.likes.forEach((likedPerson) => {
            if (likedPerson.name === profileName.textContent) {
              likeCard(likeButton)
            }
            console.log(likedPerson.name)
          })
        }

        const handleDeleteCard = (cardElement) => {
          api
            .deleteCard(card._id)
            .then(() => deleteCard(cardElement))
            .catch((error) => {
              console.error(error)
              alert("Можно удалять только собственные посты")
            })
        }

        addCard(
          card,
          placesList,
          handleCardClick,
          handleDeleteCard,
          handleLikeCard
        )
      })
    })
}
initialCards(editProfilePopup);

// validateProfile(editProfilePopup);

