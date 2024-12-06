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

const applyFilter = (filterType) => {
  clearPhotos();
  let filteredPhotos = [];

  switch (filterType) {
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

const onFilterButtonClick = debounce((event) => {
  const newFilter = event.target.id;

  if (filterButtons) {
    if (newFilter !== currentFilter) {
      applyFilter(newFilter);
      setActiveFilterButton(event.target);
      currentFilter = newFilter;
    }
  }
}, DEBOUNCE_TIME);

filterButtons.forEach((button) => {
  button.addEventListener('click', (event) => onFilterButtonClick(event));
});

// const filterDefault = () => {
//   clearPhotos();
//   renderPhotos(photos);
// };

// const filterRandom = () => {
//   clearPhotos();
//   const randomPhotos = [...photos]
//     .sort(() => Math.random() - RANDOM_SORT_VALUE)
//     .slice(0, PHOTOS_LIMIT);
//   renderPhotos(randomPhotos);
// };

// const filterDiscussed = () => {
//   clearPhotos();
//   const discussedPhotos = photos
//     .slice()
//     .sort((a, b) => b.comments.length - a.comments.length);
//   renderPhotos(discussedPhotos);
// };

// const applyFilter = (event, filterFunction) => {
//   const currentButton = event.target;

//   if (!currentButton.classList.contains('img-filters__button--active')) {
//     debounce(() => {
//       filterFunction();
//       setActiveFilterButton(currentButton);
//     }, DEBOUNCE_TIME)();
//   }
// };

// const addFilterEventListener = (filterButton, filterFunction) => {
//   filterButton.addEventListener('click', (event) => applyFilter(event, filterFunction));
// };

// addFilterEventListener(document.querySelector('#filter-default'), filterDefault);
// addFilterEventListener(document.querySelector('#filter-random'), filterRandom);
// addFilterEventListener(document.querySelector('#filter-discussed'), filterDiscussed);

export const initializeFilters = (loadedPhotos) => {
  if (!loadedPhotos || loadedPhotos.length === 0) {
    return;
  }
  photos = loadedPhotos;
  applyFilter(currentFilter);
  imgFilters.classList.remove('img-filters--inactive');
};
