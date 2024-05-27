
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

export function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}
