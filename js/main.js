// import { createPhotoArray } from './create-photo.js';
import { renderPhotos } from './render-thumbnails.js';
import { uploadPhoto } from './upload-photo.js';
import { getData } from './api.js';
import { showErrorMessage } from './error.js';

// const photos = createPhotoArray();

const bootstrap = async () => {
  try {
    const photos = await getData();
    renderPhotos(photos);
    uploadPhoto();
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

// renderPhotos(photos);
// uploadPhoto();
