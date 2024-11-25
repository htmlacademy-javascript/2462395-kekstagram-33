import { createPhotoArray } from './create-photo.js';
import { renderPhotos } from './render-thumbnails.js';
import { uploadPhoto } from './upload-photo.js';

const photos = createPhotoArray();

renderPhotos(photos);

uploadPhoto();
