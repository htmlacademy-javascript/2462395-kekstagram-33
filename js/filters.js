import { debounce } from './util.js';
import { renderPhotos, clearPhotos } from './render-thumbnails.js';

export const DEBOUNCE_TIME = 500;
const RANDOM_SORT_VALUE = 0.5;
const PHOTOS_LIMIT = 10;

export const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
let photos = [];
let currentFilter = 'filter-default';

const setActiveFilterButton = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const applyFilter = () => {
  clearPhotos();
  let filteredPhotos = [];

  switch (currentFilter) {
    case 'filter-default':
      filteredPhotos = photos;
      break;
    case 'filter-random':
      filteredPhotos = [...photos]
        .sort(() => Math.random() - RANDOM_SORT_VALUE)
        .slice(0, PHOTOS_LIMIT);
      break;
    case 'filter-discussed':
      filteredPhotos = photos
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  renderPhotos(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter, DEBOUNCE_TIME);

const onFilterButtonClick = (event) => {
  const newFilter = event.target.id;
  if (newFilter !== currentFilter) {
    currentFilter = newFilter;
    setActiveFilterButton(event.target);
    debouncedApplyFilter();
  }
};

filterButtons.forEach((button) => {
  button.addEventListener('click', onFilterButtonClick);
});

export const initializeFilters = (loadedPhotos) => {
  if (!loadedPhotos || loadedPhotos.length === 0) {
    return;
  }
  photos = loadedPhotos;
  applyFilter(currentFilter);
  imgFilters.classList.remove('img-filters--inactive');
};
