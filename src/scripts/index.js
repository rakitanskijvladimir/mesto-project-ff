import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import "../pages/index.css";
import { api } from "./api.js";
import { enableValidation, clearValidation } from "../scripts/validation.js";
import {
  validationConfig,
  profileEditButton,
  profileAddButton,
  profileName,
  profileImage,
  profileDescription,
  imagePopup,
  popupImage,
  popupCaption,
  placesList,
  addCardPopup,
  addCardForm,
  cardNameInput,
  cardLinkInput,
  addButton,
  editProfilePopup,
  editProfileForm,
  profileNameInput,
  profileJobInput,
  editButton,
  avatarModalPopup,
  editAvatarForm,
  avatarNameInput,
  avatarButton,
} from "../utils/constants.js";

// создаю переменные для работы с данными профиля и карточками
let PROFILE = null;
let CARDS = null;

// запускаю валидацию
enableValidation(validationConfig);

// Создаю переменную (функцию) для закрытия попапов (всех) по клику на крестик и вне попапа
const setCloseListener = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close")
      ) {
        closeModal(popup);
      }
    });
  });
};
setCloseListener();

// плавное закрывание и открывание попапа
document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));

// здесь я добавляю карточку в код со всеми параметрами
function addCard({
  cardData,
  placesList,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick,
}, method = "prepend") {
  const cardElement = createCard({
    profile: PROFILE,
    cardData,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick,
  });
  // добавление происходит в начало страницы
  placesList[method](cardElement);
}

// создаю функцию для получения данных по карточками (link, alt, name)
function handleCardClick(link, alt, name) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

// Создаю переменную (функцию) для лайка карточки
const handleLikeClick = ({ _id }, likeButton, counter) => {
  // создаю переменную для поиска в карточках элемента по id, который = моему id
  const index = CARDS.findIndex((card) => card._id === _id);
  // создаю переменную в кот передаю объект карточки с кот работаю
  const card = CARDS[index];
  // создаю переменную для нахождения likeОФ в CARDS и определяю лайкал ли я ее
  const isLiked =
    card.likes.findIndex((like) => like._id === PROFILE._id) !== -1;
  // создаю переменную в кот обращаюсь к isLiked для получения либо likeОФ либо dislikeОФ
  const data = isLiked ? api.dislikeCard(_id) : api.likeCard(_id);
  // получаю в АРГУМЕНТ стрелочной функ ответ от сервера и далее использую его
  data
    .then((resp) => {
      // находим где она была и положение в массиве этой карточки и заменяем на ответ от сервера
      CARDS[index] = resp;
      // у счетчика меняем содержимое на вебе
      counter.textContent = resp.likes.length;
      likeCard(likeButton);
    })
    // в случае какой-либо ошибки получаю error
    .catch(console.error)
  // после успешного отображения карточки на странице в лог вывожу выполненное действие
    .finally(() => {
      console.log("лайк");
    });
};

//==== API запросы =======

// при клике на "аватар" открываю попап
profileImage.addEventListener("click", () => {
  // при отпрвки данных на сервер очищаю инпут и блочу кнопку
  clearValidation(editAvatarForm, validationConfig);
  openModal(avatarModalPopup);
});
// слушаю событие при отправке
editAvatarForm.addEventListener("submit", (evt) => {
  // для избежания перезагрузки страницы, прерываю дефолтное действие
  evt.preventDefault();
  // нахожу(использую) обработчик submita через объект evt
  evt.submitter.textContent = "Сохранение...";
  // создаю переменную и присваиваю ей ключ со значением (объект)
  const avatar = {
    avatar: avatarNameInput.value,
  };
  // отправляю запрос на сервер
  api
    .updateAvatar(avatar)
    //получаю ответ
    .then((response) => {
      // заменяю действующую карточку на полученную карточку с запроса
      profileImage.src = response.avatar;
      // закрываю попап
      closeModal(avatarModalPopup);
    })
    // в случае какой-либо ошибки получаю error
    .catch(console.error)
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      avatarButton.textContent = "Сохранить";
    });
});

// при клике на "карандаш" открываю попап с формой для заполнения
profileEditButton.addEventListener("click", () => {
  // при отпрвки данных на сервер очищаю инпут и блочу кнопку
  clearValidation(editProfileForm, validationConfig);
  // значение поля "profileNameInput" = значению поля "profileName"
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});
// при клике на "карандаш" слушаю событие
editProfileForm.addEventListener("submit", (evt) => {
  // для избежания перезагрузки страницы, прерываю дефолтное действие
  evt.preventDefault();
  // нахожу(использую) обработчик submita через объект evt
  evt.submitter.textContent = "Сохранение...";
  // если данные заполнены корректно, запрос отправляется
  const newProfile = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  };
  // посылаю запрос на сервер если валидный
  api
    .editProfile(newProfile)
    // получаю ответ
    .then((profile) => {
      PROFILE = profile;
      profileName.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closeModal(editProfilePopup);
    })
    // в случае какой-либо ошибки получаю error
    .catch(console.error)
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      editButton.textContent = "Сохранить";
    });
});

// при клике на "+" открываю попап с формой для заполнения
profileAddButton.addEventListener("click", () => {
  // при отпрвки данных на сервер очищаю инпут и блочу кнопку
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});
// слушаю событие которое происходит с формой
addCardForm.addEventListener("submit", (evt) => {
  // для избежания перезагрузки страницы, прерываем дефолтное действие
  evt.preventDefault();
  // нахожу(использую) обработчик submita через объект evt
  evt.submitter.textContent = "Сохранение...";
  // создаю новую переменну для получения данных с АПИ
  const newCardData = {
    name: cardNameInput.value, // получаем данные этой карты, name
    link: cardLinkInput.value, // получаем данные этой карты, link
  };
  // посылаю запрос на сервер и передаю объект созданный выше
  api
    .addNewCard(newCardData)
    // при положительном ответе получаю ответ от сервера
    .then((cardData) => {
      // добавляю созданную карточку в массив карточек
      CARDS.push(cardData);
      // отображаю новую карточку в браузере
      addCard({
        cardData,
        placesList,
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
      });
      cardNameInput.value = ""; // очищаю форму после отправки, name
      cardLinkInput.value = ""; // очищаю форму после отправки, link
      closeModal(addCardPopup);
    })
    // в случае какой-либо ошибки получаю error
    .catch(console.error)
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      addButton.textContent = "Создать";
    });
});

// Создаю переменную (функцию) для удаления карточки и распознание карточки по id (своя чужая)
const handleDeleteCard = (cardElement, card) => {
  if (card.owner._id === PROFILE._id) {
    // полысаю запрос на удаление с id на сервере
    api
      .deleteCard(card._id)
      // если все удачно, запускаю удаление на вебе
      .then(() => deleteCard(cardElement))
      // в случае какой-либо ошибки получаю error
      .catch(console.error)
      // после успешного отображения карточки на странице в лог вывожу выполненное действие
      .finally(() => {
        console.log("удаление завершено");
      });
  } else {
    alert("Можно удалять только собственные посты");
  }
};

// ====== PromisЫ ======

// Создаю переменную (функцию) для создания ПРОМИСОВ и объединения в нее 2х запросов
const getInitialData = () => {
  // объединяю 2 функции и получаю ответ с сервера
  Promise.all([api.fetchProfile(), api.initialCards()])
    .then(([userData, cards]) => {
      // ответ по профилю с данными карт
      PROFILE = userData;
      profileName.textContent = userData.name;
      profileImage.src = userData.avatar;
      profileDescription.textContent = userData.about;
      // ответ по лайкам, дислайкам и счетчикам с карт
      CARDS = cards;
      console.log(CARDS);
      CARDS.forEach((cardData) => {
        // вызываю функцию addCard, и передаю в нее все параметры карты
        addCard({
          cardData,
          placesList,
          handleCardClick,
          handleDeleteCard,
          handleLikeClick,
        });
      });
    })
    // в случае какой-либо ошибки получаю error
    .catch(console.error)
    // после успешного отображения карточки на странице в лог вывожу выполненное действие
    .finally(() => {
      console.log("добавлено");
    });
};
getInitialData();
