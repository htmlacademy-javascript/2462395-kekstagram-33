import { showBigPhoto } from './big-photo.js';

const ERROR_DATA_UPLOAD = 'Ошибка загрузки данных с сервера';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.data-error');
  errorElement.querySelector('.data-error__title').textContent = message;

  document.body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export const clearPhotos = () => {
  const photoElements = picturesContainer.querySelectorAll('.picture');
  photoElements.forEach((element) => {
    element.remove();
  });
};

export const renderPhotos = (photos) => {
  try {
    clearPhotos();

    photos.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);

      const img = pictureElement.querySelector('.picture__img');
      img.src = photo.url;
      img.alt = photo.description;

      const likes = pictureElement.querySelector('.picture__likes');
      likes.textContent = photo.likes;

      const comments = pictureElement.querySelector('.picture__comments');
      comments.textContent = photo.comments.length;

      const onPictureElementClick = (evt) => {
        evt.preventDefault();
        showBigPhoto(photo);
      };

      pictureElement.addEventListener('click', onPictureElementClick);

      fragment.appendChild(pictureElement);
    });

    picturesContainer.appendChild(fragment);
  } catch (error) {
    showError(ERROR_DATA_UPLOAD);
  }
};
