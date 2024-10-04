import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import "../pages/index.css";
import { api } from "./api.js";
import { enableValidation, clearValidation } from "../scripts/validation.js";

let PROFILE = null;
let CARDS = null;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.getElementById("editProfilePopup");
const avatarModalPopup = document.getElementById("avatarModalPopup");
const editAvatarForm = document.getElementById("editAvatarForm");
const avatarNameInput = editAvatarForm.querySelector(".popup__input_type_avatar");
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

// создаю слушатель при загрузке всего контента дом дерева, создаю конфиг для валидации(проверка) согл заданию
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
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
function addCard(
  cardData,
  placesList,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick
) {
  // здесь я создаю структуру карточки
  const cardElement = createCard(
    PROFILE,
    cardData,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  // добавление происходит в начало страницы
  placesList.prepend(cardElement);
}

// создаю функцию для получения данных по карточками (link, alt, name)
function handleCardClick(link, alt, name) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = name;
  openModal(imagePopup);
}
const handleLikeCard = (card, likeButton, counter) => {
  // если id любой карты не равен id моей карточки с сервера
  if (card.owner._id !== PROFILE._id) {
    // получаю лайк
    getLikeCard(card._id, likeButton, counter);
  }
};

//==== API запросы =======

// при клике на "аватар" открываю попап
profileImage.addEventListener("click", () => {
  const editAvatarForm = avatarModalPopup.querySelector("#editAvatarForm");
  // при отпрвки данных на сервер очищаю инпут и блочу кнопку
  clearValidation(editAvatarForm, validationConfig);
  openModal(avatarModalPopup);
});
// слушаю событие при отправке
editAvatarForm.addEventListener("submit", (evt) => {
  // для избежания перезагрузки страницы, прерываю дефолтное действие
  evt.preventDefault();
   // создаю переменную для привязки к кнопке и изменения текста кнопки при ожидании
   const avatarButton = editAvatarForm.querySelector(".button");
   avatarButton.textContent = "Сохранение...";
  // создаю переменную и присваиваю ей ключ со значением (объект)
  const avatar = {
    avatar: avatarNameInput.value,
  };
  // отправляю запрос на сервер
  api.updateAvatar(avatar)
    //получаю ответ
    .then((response) => {
      // console.log(response, "response");
      // заменяю действующую карточку на полученную карточку с запроса 
      profileImage.src = response.avatar;
     // закрываю попап
      closeModal(avatarModalPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      setTimeout(() => {
        avatarButton.textContent = 'Сохранить';
      }, 1000);
    });
});

// при клике на "карандаш" открываю попап с формой для заполнения
profileEditButton.addEventListener("click", () => {
  const editProfileForm = editProfilePopup.querySelector("#editProfileForm");
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
  // создаю переменную для привязки к кнопке и изменения текста кнопки при ожидании
  const editButton = editProfileForm.querySelector(".button");
  editButton.textContent = "Сохранение...";
  // если данные заполнены корректно, запрос отправляется
  const newProfile = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  };
  // посылаю запрос на сервер если валидный
  api.editProfile(newProfile)
    // получаю ответ
    .then((profile) => {
      PROFILE = profile;
      profileName.textContent = profile.name;
      profileName.textContent = profileNameInput.value;
      profileDescription.textContent = profileJobInput.value;
      closeModal(editProfilePopup);
    })
    .catch((error) => {
      console(error);
    })
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      setTimeout(() => {
        editButton.textContent = "Сохранить";
      }, 1000);
    });
});

// при клике на "+" открываю попап с формой для заполнения
profileAddButton.addEventListener("click", () => {
  const addCardForm = addCardPopup.querySelector("#addCardForm");
  // при отпрвки данных на сервер очищаю инпут и блочу кнопку
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});
// слушаю событие которое происходит с формой
addCardForm.addEventListener("submit", (evt) => {
  // для избежания перезагрузки страницы, прерываем дефолтное действие
  evt.preventDefault();
  // создаю переменную для привязки к кнопке и изменения текста кнопки при ожидании
  const addButton = addCardForm.querySelector(".button");
  addButton.textContent = "Сохранение...";
  // создаю новую переменну для получения данных с АПИ
  const newCardData = {
    name: cardNameInput.value, // получаем данные этой карты, name
    link: cardLinkInput.value, // получаем данные этой карты, link
  };
  cardNameInput.value = ""; // очищаю формы после отправки, name
  cardLinkInput.value = ""; // очищаю формы после отправки, link
  // посылаю запрос на сервер и передаю объект созданный выше
  api
    .addNewCard(newCardData)
    // при положительном ответе получаю ответ от сервера
    .then((cardData) => {
      // вызываю функцию addCard и передаю в нее аргументы
      addCard(
        cardData,
        placesList,
        handleCardClick,
        handleDeleteCard,
        handleLikeCard
      );
      closeModal(addCardPopup);
    })
    // в случае какой-либо ошибки получаю error
    .catch((error) => {
      console.error(error);
    })
    // после успешного отображения карточки на странице в попапе отображаю название кнопки
    .finally(() => {
      setTimeout(() => {
        addButton.textContent = "Создать";
      }, 1000);
    });
});

// Создаю переменную (функцию) для удаления карточки и распознание карточки по id (своя чужая)
const handleDeleteCard = (cardElement, card) => {
  if (card.owner._id === PROFILE._id) {
     // полысаю запрос на удаление с id на сервере
    api.deleteCard(card._id)
    // если все удачно, запускаю удаление на вебе
    .then(() => deleteCard(cardElement))
    // если есть ошибка возвращает error
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log('удаление завершено');
    });
  } else {
    alert("Можно удалять только собственные посты");
  }};

// Создаю переменную (функцию) для лайка карточки
const getLikeCard = (id, likeButton, counter) => {
  // создаю переменную для поиска в карточках элемента по id, который = моему id
  const index = CARDS.findIndex((card) => card._id === id);
  // создаю переменную в кот передаю объект карточки с кот работаю
  const card = CARDS[index];
  // создаю переменную для нахождения likeОФ в CARDS и определяю лайкал ли я ее
  const isLiked =
    card.likes.findIndex((like) => like._id === PROFILE._id) !== -1;
  // создаю переменную в кот обращаюсь к isLiked для получения либо likeОФ либо dislikeОФ
  const data = isLiked ? api.dislikeCard(id) : api.likeCard(id);
  // получаю в АРГУМЕНТ стрелочной функ ответ от сервера и далее использую его
  data.then((resp) => {
      // находим где она была и положение в массиве этой карточки и заменяем на ответ от сервера
      CARDS[index] = resp;
      // у счетчика меняем содержимое на вебе
      counter.textContent = resp.likes.length;
      likeCard(likeButton);
    })
    // в случае какой-либо ошибки получаю error
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log('лайк');
    });
};

// ====== PromisЫ ======

// Создаю переменную (функцию) для создания ПРОМИСОВ и объединения в нее 2х запросов
const initial = () => {
  // объединяю 2 функции и получаю ответ с сервера
  Promise.all([api.fetchProfile(), api.initialCards()])
    .then((resp) => {
      // ответ по профилю с данными карт
      PROFILE = resp[0];
      profileName.textContent = resp[0].name;
      profileImage.src = resp[0].avatar;
      profileDescription.textContent = resp[0].about;
      // ответ по лайкам, дислайкам и счетчикам с карт
      CARDS = resp[1];
      console.log(CARDS);
      CARDS.forEach((card) => {
        // вызываю функцию addCard, и передаю в нее все параметры карты
        addCard(
          card,
          placesList,
          handleCardClick,
          handleDeleteCard,
          handleLikeCard
        );
      });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('добавлено');
    });
};
initial();
