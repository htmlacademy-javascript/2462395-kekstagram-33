import { isEscapeKey } from './util.js';

const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
}, false);

export function validateHashtags(value) {
  if (!value.trim()) {
    return true;
  } // пустая строка

  const hashtags = value.split(' ').filter(Boolean); // разделяем по пробелам

  if (hashtags.length > MAX_HASHTAG_NUMBER) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i].toLowerCase();

    if (!HASHTAG_PATTERN.test(tag)) {
      return false;
    }

    if (hashtags.indexOf(tag) !== i) {
      return false;
    }
  }

  return true;
}

export function validateComments(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

// валидатор хэштегов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, их может быть не более 5, каждый максимум 20 символов, они не должны повторяться.'
);

// валидатор комментариев
pristine.addValidator(
  commentInput,
  validateComments,
  'Комментарий не может быть длиннее 140 символов.'
);

// валидация формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    uploadForm.submit();
  }
});

// нажатие на Esc не должно приводить к закрытию формы
hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});
