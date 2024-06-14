export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
      form.addEventListener('submit', function(event) {
          event.preventDefault();
      });

      setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach(input => {
      input.addEventListener('input', () => {
          checkInputValidity(form, input, config);
          toggleButtonState(inputs, submitButton, config);
      });
  });
  
  toggleButtonState(inputs, submitButton, config);
}

function checkInputValidity(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
  } else {
      input.setCustomValidity("");
  }

  if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, config);
  } else {
      hideInputError(form, input, config);
  }
}

function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
  } else {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
  }
}

function hasInvalidInput(inputs) {
  return Array.from(inputs).some(input => !input.validity.valid);
}

export function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  
  inputs.forEach(input => {
      hideInputError(form, input, config);
      input.value = '';
  });

  toggleButtonState(inputs, submitButton, config);
}
