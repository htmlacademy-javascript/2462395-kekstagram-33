const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorLoadDataTemplate = document.querySelector('#data-error').content;

export const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(errorArea);

  const errorLoadDataArea = document.body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};
