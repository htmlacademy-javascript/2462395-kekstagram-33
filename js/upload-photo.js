import { validateHashtags, validateComments } from './validation.js';
import { isEscapeKey } from './util.js';
import { changeScale } from './effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = document.querySelector('#upload-cancel');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  validateHashtags();
  validateComments();
  changeScale(previewImage, scaleControlSmaller, scaleControlBigger, scaleControlValue);
};

const closeUploadOverlay = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  previewImage.style = '';
};

closeOverlayButton.addEventListener('click', closeUploadOverlay);

document.addEventListener('keydown', () => {
  if (isEscapeKey && !uploadOverlay.classList.contains('hidden')) {
    closeUploadOverlay();
  }
});

export const uploadPhoto = () => {
  uploadInput.addEventListener('change', openUploadOverlay);
};

changeScale(previewImage, scaleControlSmaller, scaleControlBigger, scaleControlValue);
