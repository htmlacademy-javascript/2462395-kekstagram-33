import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImage = bigPhoto.querySelector('.big-picture__img img');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const likesCount = bigPhoto.querySelector('.likes-count');
const photoCaption = bigPhoto.querySelector('.social__caption');
const socialComments = bigPhoto.querySelector('.social__comments');
const socialComment = bigPhoto.querySelector('.social__comment');
const socialCommentsCount = bigPhoto.querySelector('.social__comment-count');
const loadButton = bigPhoto.querySelector('.comments-loader');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const toggleModal = () => {
  bigPhoto.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

// создает один комментарий
const renderComment = (comment) => {
  const newComment = socialComment.cloneNode(true);

  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

// отрисовывает комментарии внутри большого фото
const renderComments = () => {
  socialComments.innerHTML = '';
  socialCommentsCount.innerHTML = '';
  commentFragment.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  socialCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }

  socialComments.appendChild(commentFragment);
};

// меняет данные большого фото
const show = (photo) => {
  const {url, likes, description} = photo;

  bigPhotoImage.src = url;
  likesCount.textContent = likes;
  photoCaption.textContent = description;
};

const onLoadButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPhoto();
  }
}

// закрывает окно
function closeBigPhoto() {
  commentsCount = COMMENTS_STEP;

  document.removeEventListener('keydown', onEscKeyDown);
  loadButton.removeEventListener('click', onLoadButtonClick);

  toggleModal();
}

const onCloseClick = () => {
  closeButton.removeEventListener('click', onCloseClick);

  closeBigPhoto();
};

// открывает большое фото
export const showBigPhoto = (photo) => {

  currentComments = photo.comments.slice();

  show(photo);

  renderComments();

  document.addEventListener('keydown', onEscKeyDown);
  closeButton.addEventListener('click', onCloseClick);
  loadButton.addEventListener('click', onLoadButtonClick);

  toggleModal();
};
