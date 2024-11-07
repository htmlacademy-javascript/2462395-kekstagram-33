import {
  MIN_PHOTO_NUMBER,
  MAX_PHOTO_NUMBER,
  MIN_LIKES,
  MAX_LIKES,
  MAX_COMMENTS,
  MIN_AVATAR_NUMBER,
  MAX_AVATAR_NUMBER,
  NAMES,
  DESCRIPTIONS,
  MESSAGES,
} from './data-photo.js';

import {createIdGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

const idPhotoGenerator = createIdGenerator();
const idCommentGenerator = createIdGenerator();

const createCommentArray = () => {
  const commentCount = getRandomInteger(0, MAX_COMMENTS);
  return Array.from({ length: commentCount }, () => ({
    id: idCommentGenerator(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }));
};

const createPhoto = () => ({
  id: idPhotoGenerator(),
  url: `photos/${getRandomInteger(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createCommentArray(),
});

const createPhotoArray = () => Array.from({ length: MAX_PHOTO_NUMBER }, createPhoto);

createPhotoArray();

export {createPhotoArray};
