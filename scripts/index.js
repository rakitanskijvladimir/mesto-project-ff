// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from "./cards.js";

function createCard (cardData, deleteCallback) {
    // клонирование шаблона 
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;

    // заполнение значения элементов карточки
    const imageElement = cardElement.querySelector('.card__image');
    imageElement.src=cardData.link;
    imageElement.alt=cardData.name;

    const titleElement = cardElement.querySelector('.card__title');
    titleElement.textContent = cardData.name;

    // добавляем обработчик клика на кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;
}
 
// функция для удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// функция для добавления карточек на страницу
function addCardsToPage (cards) {
    const placeContainer = document.querySelector('.places__list');
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, deleteCard);
        placeContainer.appendChild(cardElement);
    }) 

 }
 addCardsToPage(initialCards);
