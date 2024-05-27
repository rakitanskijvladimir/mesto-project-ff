export function createCard(cardData, handleCardClick, handleDeleteCard, handleLikeClick) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // likeButton = (card) => card.classList.toggle("card__like-button_is-active")

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton)
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement);
  });

  cardImage.addEventListener("click", () => {
    handleCardClick(cardData.link, cardData.name, cardData.name);
  });
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  