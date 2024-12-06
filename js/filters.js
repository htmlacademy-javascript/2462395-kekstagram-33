import { debounce } from './util.js';
import { renderPhotos, clearPhotos } from './render-thumbnails.js';

const DEBOUNCE_TIME = 500;
const RANDOM_SORT_VALUE = 0.5;
const PHOTOS_LIMIT = 10;

export const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
let photos = [];

const setActiveFilterButton = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const filterDefault = debounce((event) => {
  clearPhotos();
  renderPhotos(photos);
  setActiveFilterButton(event.target);
}, DEBOUNCE_TIME);

const filterRandom = debounce((event) => {
  clearPhotos();
  const randomPhotos = [...photos]
    .sort(() => Math.random() - RANDOM_SORT_VALUE)
    .slice(0, PHOTOS_LIMIT);
  renderPhotos(randomPhotos);
  setActiveFilterButton(event.target);
}, DEBOUNCE_TIME);

const filterDiscussed = debounce((event) => {
  clearPhotos();
  const discussedPhotos = photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  renderPhotos(discussedPhotos);
  setActiveFilterButton(event.target);
}, DEBOUNCE_TIME);

const addFilterEventListener = (filterButton, filterFunction) => {
  filterButton.addEventListener('click', filterFunction);
};

addFilterEventListener(document.querySelector('#filter-default'), filterDefault);
addFilterEventListener(document.querySelector('#filter-random'), filterRandom);
addFilterEventListener(document.querySelector('#filter-discussed'), filterDiscussed);

export const initializeFilters = (loadedPhotos) => {
  if (!loadedPhotos || loadedPhotos.length === 0) {
    return;
  }
  photos = loadedPhotos;
  renderPhotos(photos);
  imgFilters.classList.remove('img-filters--inactive');
};
