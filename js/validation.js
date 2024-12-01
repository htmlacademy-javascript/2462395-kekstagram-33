import { onCloseOverlay } from './upload-photo.js';

const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

export const uploadForm = document.querySelector('.img-upload__form');
export const hashtagInput = uploadForm.querySelector('.text__hashtags');
export const commentInput = uploadForm.querySelector('.text__description');

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
}, false);

// разделение строки на массив
const splitHashtags = (input) => {
  if (!input.trim()) {
    return [];
  }
  return input.trim().toLowerCase().split(/\s+/);
};

// проверка формата
const isHashtagValidFormat = (hashtag) => HASHTAG_PATTERN.test(hashtag);

// проверка на уникальность
const areHashtagsUnique = (hashtags) => {
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// проверка на количество
const isHashtagsCountValid = (hashtags) => hashtags.length <= MAX_HASHTAG_NUMBER;

// общая проверка валидации хэштегов
export const validateHashtags = (hashtags) =>
  isHashtagsCountValid(hashtags) &&
  areHashtagsUnique(hashtags) &&
  hashtags.every(isHashtagValidFormat);

export function validateComments(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

const ValidationErrors = {
  HASHTAGS: {
    FORMAT: 'Хэштег должен начинаться с #, может содержать только буквы и цифры.',
    ONLY_HASH: 'Хэштег не может состоять из одной #.',
    MAX_COUNT: 'Хэштегов должно быть не больше пяти.',
    NO_REPEAT: 'Хэштеги не должны повторяться.',
  },
  COMMENT: {
    TOO_LONG: 'Комментарий не может быть длиннее 140 символов.',
  },
};

pristine.addValidator(
  hashtagInput,
  (value) => splitHashtags(value).every(isHashtagValidFormat),
  ValidationErrors.HASHTAGS.FORMAT
);

pristine.addValidator(
  hashtagInput,
  (value) => splitHashtags(value).every(isHashtagValidFormat),
  ValidationErrors.HASHTAGS.ONLY_HASH
);

pristine.addValidator(
  hashtagInput,
  (value) => isHashtagsCountValid(splitHashtags(value)),
  ValidationErrors.HASHTAGS.MAX_COUNT
);

pristine.addValidator(
  hashtagInput,
  (value) => areHashtagsUnique(splitHashtags(value)),
  ValidationErrors.HASHTAGS.NO_REPEAT
);

pristine.addValidator(
  commentInput,
  validateComments,
  ValidationErrors.COMMENT.TOO_LONG
);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    uploadForm.submit();

    onCloseOverlay();
  }
});
