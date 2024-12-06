import { renderPhotos } from './render-thumbnails.js';
import { uploadPhoto } from './upload-photo.js';
import { initializeFilters, DEBOUNCE_TIME, imgFilters } from './filters.js';
import { fetchData } from './api.js';
import { showErrorMessage } from './submit.js';
import { debounce } from './util.js';

const loadDataAndInitializeFilters = async () => {
  try {
    const photos = await fetchData();
    const debounceRenderPhotos = debounce(() => renderPhotos(photos), DEBOUNCE_TIME);
    initializeFilters(photos, debounceRenderPhotos);
    renderPhotos(photos);
    imgFilters.classList.remove('img-filters--inactive');
  } catch (error) {
    showErrorMessage(`Ошибка загрузки данных: ${error.message}`);
    imgFilters.classList.add('img-filters--inactive');
  }
};

loadDataAndInitializeFilters();
uploadPhoto();
