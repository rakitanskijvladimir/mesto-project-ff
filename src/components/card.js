// реструктуризировал код через объекты
export function createCard({profile, cardData, handleCardClick, handleDeleteCard, handleLikeClick}) {
// еще вариант 
// export function createCard(args) {
// const {profile, cardData, handleCardClick, handleDeleteCard, handleLikeClick} = args; 
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
  // проверяю карточки на лайки и сравниваю свои карточки с не своими, ставлю только не своим
  if (cardData.likes.findIndex((like) => like._id === profile._id) !== -1 ){
    likeButton.classList.add('card__like-button_is-active')
  }

  likeButton.addEventListener("click", () => {
    handleLikeClick(cardData, likeButton, counterLike)
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData);
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

  