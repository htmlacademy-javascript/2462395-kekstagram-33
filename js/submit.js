import { isEscapeKey } from './util.js';

export const showSuccessMessage = (message) => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');
  successElement.querySelector('.success__title').textContent = message;

  document.body.appendChild(successElement);

  const removeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessDocumentKeydown);
    document.removeEventListener('click', onSuccessDocumentClick);
  };

  const onSuccessButtonClick = () => {
    removeSuccessMessage();
  };

  function onSuccessDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  }

  // клик на произовльную область экрана
  function onSuccessDocumentClick(evt) {
    if (!successElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  }

  successElement.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
};

export const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  errorElement.querySelector('.error__title').textContent = message;

  document.body.appendChild(errorElement);

  const removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorDocumentKeydown);
    document.removeEventListener('click', onErrorDocumentClick);
  };

  const onErrorButtonClick = () => {
    removeErrorMessage();
  };

  function onErrorDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
    }
  }

  function onErrorDocumentClick(evt) {
    if (!errorElement.contains(evt.target)) {
      removeErrorMessage();
    }
  }

  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
  document.addEventListener('click', onErrorDocumentClick);
};
