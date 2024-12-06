import { validateHashtags, validateComments, hashtagInput, commentInput, initializeValidation, uploadForm } from './validation.js';
import { isEscapeKey } from './util.js';
import { initiateScale, removeScaleEventListeners } from './scale.js';
import { addEffectListeners, removeEffectListeners } from './slider.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './submit.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = document.querySelector('#upload-cancel');
const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const SUCCESS_SUBMIT = 'Форма успешно отправлена';
const ERROR_SUBMIT = 'Ошибка отправки данных';
let pristine;
let objectURL = '';

const resetForm = () => {
  uploadInput.value = '';
  scaleControlValue.value = '100%';
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = '';
  hashtagInput.value = '';
  commentInput.value = '';
  document.querySelector('#effect-none').checked = true;
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  if (pristine) {
    pristine.reset();
  }
};

const onCloseOverlay = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';

  if (objectURL) {
    URL.revokeObjectURL(objectURL);
  }

  previewImage.src = '';
  effectPreviews.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = '';
    resetForm();
  });

  document.removeEventListener('keydown', onDocumentKeydown);
  removeScaleEventListeners(scaleControlSmaller, scaleControlBigger);
  removeEffectListeners();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !uploadOverlay.classList.contains('hidden')) {
    const activeElement = document.activeElement;
    const errorMessage = document.querySelector('.error');

    if (errorMessage) {
      errorMessage.remove();
      return;
    }

    if (activeElement.classList.contains('text__hashtags') || activeElement.classList.contains('text__description')) {
      return;
    }
    onCloseOverlay();
  }
}

const onOpenOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  pristine = initializeValidation();
  initiateScale(previewImage, scaleControlSmaller, scaleControlBigger, scaleControlValue);
  addEffectListeners();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const hashtags = hashtagInput.value;
  const comments = commentInput.value;

  const isValid =
    pristine.validate() &&
    validateHashtags(hashtags) &&
    validateComments(comments);

  if (isValid) {
    submitButton.disabled = true;

    try {
      const formData = new FormData(uploadForm);
      await sendData(formData);
      showSuccessMessage(SUCCESS_SUBMIT);
      onCloseOverlay();
      resetForm();
    } catch (error) {
      showErrorMessage(ERROR_SUBMIT);
    } finally {
      submitButton.disabled = false;
    }
  }
};

const onFileChange = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
    objectURL = URL.createObjectURL(file);
    previewImage.src = objectURL;
    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${objectURL})`;
    });
    onOpenOverlay();
  }
};

uploadInput.addEventListener('change', onFileChange);
closeOverlayButton.addEventListener('click', onCloseOverlay);
uploadForm.addEventListener('submit', onFormSubmit);

export const uploadPhoto = () => {
  uploadInput.addEventListener('change', onOpenOverlay);
};
