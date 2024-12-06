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

  function onSuccessDocumentClick(evt) {
    const innerElement = successElement.querySelector('.success__inner');
    if (!innerElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  }

  successElement.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
  successElement.addEventListener('click', onSuccessDocumentClick);
};

export const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.data-error');
  errorElement.querySelector('.data-error__title').textContent = message;

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
    const innerElement = errorElement.querySelector('.error__inner');
    if (!innerElement.contains(evt.target)) {
      removeErrorMessage();
    }
  }

  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
  errorElement.addEventListener('click', onErrorDocumentClick);
};
