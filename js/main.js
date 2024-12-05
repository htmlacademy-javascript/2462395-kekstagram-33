import { renderPhotos } from './render-thumbnails.js';
import { uploadPhoto } from './upload-photo.js';
import { initializeFilters } from './filters.js';
import { fetchData } from './api.js';
// import { showSuccessMessage, showErrorMessage } from './submit.js';
// import { debounce } from './util.js';

const loadDataAndInitializeFilters = async () => {
  try {
    const photos = await fetchData();
    renderPhotos(photos);
    initializeFilters(photos);
  } catch (error) {
    throw new Error(`Ошибка загрузки данных: ${error.message}`);
  }
};

loadDataAndInitializeFilters();
uploadPhoto();
