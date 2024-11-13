import {createPhotoArray} from './create-photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const photos = createPhotoArray();

const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  const likes = pictureElement.querySelector('.picture__likes');
  likes.textContent = photo.likes;

  const comments = pictureElement.querySelector('.picture__comments');
  comments.textContent = photo.comments.length;

  fragment.appendChild(pictureElement);
});

picturesContainer.appendChild(fragment);
