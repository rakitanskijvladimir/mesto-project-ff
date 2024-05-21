import { openModal } from "./modal"// импортирую данные в файл modal

// создаю функцию для добавления карточек из файла cards
export function createCard(cardData, handleDeleteCard) {
  const cardTemplate = document.getElementById('card-template');
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // данные карт со значением
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // вешаю обработчик удаления карточки
  deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardElement);
  });

  // вешаю обработчик like
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
  });

  // вешаю обрабочит клика по каринкам для открытия на весь экран включая подпись
  cardImage.addEventListener('click', () => {
      const imagePopup = document.getElementById('imagePopup');
      const popupImage = imagePopup.querySelector('.popup__image');
      const popupCaption = imagePopup.querySelector('.popup__caption');

      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupCaption.textContent = cardTitle.textContent;
      openModal(imagePopup);
  });

  return cardElement;
}

// экспортирую функцию удаления картинки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// экспортирую функцию создания картинки и установления ее в начало массива
export function addCard(cardData, placesList) {
  const cardElement = createCard(cardData, deleteCard);
  placesList.prepend(cardElement);
}