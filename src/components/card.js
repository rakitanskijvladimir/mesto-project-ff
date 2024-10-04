export function createCard(profile, cardData, handleCardClick, handleDeleteCard, handleLikeClick) {
  const cardTemplate = document.getElementById("card-template");
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const counterLike = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  counterLike.textContent = cardData.likes.length
  // проверяю карточки на лайки и сравниваю свои карточки с не своиими, ставлю только не своим
  if (cardData.likes.findIndex((like) => like._id === profile._id) !== -1 ){
    likeButton.classList.add('card__like-button_is-active')
  }

  likeButton.addEventListener("click", () => {
<<<<<<< HEAD
    handleLikeClick(cardData, likeButton, counterLike)
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData);
=======
    handleLikeClick(likeButton, counterLike)
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData._id);
>>>>>>> 72b4ba7c04085ab0728eff24929d81aea2415ed9
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

  