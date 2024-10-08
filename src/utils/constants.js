// создаю конфиг для передачи всех настроек валидации согл заданию
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// создаю переменные для работы с данными
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__title");
export const profileImage = document.querySelector(".profile__image");
export const profileDescription = document.querySelector(".profile__description");
export const imagePopup = document.getElementById("imagePopup");
export const popupImage = imagePopup.querySelector(".popup__image");
export const popupCaption = imagePopup.querySelector(".popup__caption");
export const placesList = document.querySelector(".places__list");
// попап карточек
export const addCardPopup = document.getElementById("addCardPopup");
export const addCardForm = document.forms['new-place'];
export const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
export const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
export const addButton = addCardForm.querySelector(".button");
// попап ред профиля
export const editProfilePopup = document.getElementById("editProfilePopup");
export const editProfileForm = document.forms['edit-profile'];
export const profileNameInput = editProfileForm.querySelector(".popup__input_type_name");
export const profileJobInput = editProfileForm.querySelector(".popup__input_type_description");
export const editButton = editProfileForm.querySelector(".button");
// попап аватара
export const avatarModalPopup = document.getElementById("avatarModalPopup");
export const editAvatarForm = document.forms['edit-avatar'];
export const avatarNameInput = editAvatarForm.querySelector(".popup__input_type_avatar");
export const avatarButton = editAvatarForm.querySelector(".button");

