import { closeUploadOverlay } from './upload-photo.js';
import { sendData } from './api.js';
import { uploadForm, pristine } from './validation.js';

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();

  if (isValid) {
    await sendData(new FormData(formElement));

    closeUploadOverlay();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

uploadForm.addEventListener('submit', onFormSubmit);
