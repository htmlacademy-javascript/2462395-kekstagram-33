import { validateHashtags, validateComments, hashtagInput, commentInput, pristine } from './validation.js';
import { isEscapeKey } from './util.js';
import { initiateScale, removeScaleEventListeners } from './scale.js';
import { addEffectListeners, removeEffectListeners } from './slider.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './submit.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = document.querySelector('#upload-cancel');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const resetForm = () => {
  uploadInput.value = '';
  scaleControlValue.value = '100%';
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = '';
  hashtagInput.value = '';
  commentInput.value = '';
  document.querySelector('#effect-none').checked = true;
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
};

export const onCloseOverlay = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  previewImage.style = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  removeScaleEventListeners(scaleControlSmaller, scaleControlBigger);
  removeEffectListeners();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !uploadOverlay.classList.contains('hidden')) {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains('text__hashtags') || activeElement.classList.contains('text__description')) {
      return;
    }
    onCloseOverlay();
  }
}

const onOpenOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  pristine.validate();
  validateHashtags(hashtagInput.value);
  validateComments(commentInput.value);
  initiateScale(previewImage, scaleControlSmaller, scaleControlBigger, scaleControlValue);
  addEffectListeners();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;

    try {
      const formData = new FormData(uploadForm);
      await sendData(formData);
      showSuccessMessage('Форма успешно отправлена');
      onCloseOverlay();
      resetForm();
    } catch (error) {
      showErrorMessage('Ошибка отправки данных');
    } finally {
      submitButton.disabled = false;
    }
  }
};

closeOverlayButton.addEventListener('click', onCloseOverlay);
uploadForm.addEventListener('submit', onFormSubmit);

export const uploadPhoto = () => {
  uploadInput.addEventListener('change', onOpenOverlay);
};
