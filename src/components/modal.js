// экспортирую функцию плавного открывания мод окна и картинки
export function openModal(popup) {
        popup.classList.add('popup_is-opened');
       popup.classList.add('popup_is-animated');
        document.addEventListener('keydown', handleEscapeClose) 
}

// экспортирую функцию плавного закрывания мод окна и картинки
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeClose) 
}

// закрываю мод окно и картику нажатием на esc 
export function handleEscapeClose (event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup)
        }
    }
}