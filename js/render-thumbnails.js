import { showBigPhoto } from './big-photo.js';
import { fetchData } from './api.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

// сообщение об ошибке
const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.data-error');
  errorElement.querySelector('.data-error__title').textContent = message;

  document.body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export const renderPhotos = async () => {
  try {
    const photos = await fetchData();
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

    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);
  } catch (error) {
    showError('Ошибка загрузки данных с сервера');
  }
};
