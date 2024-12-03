const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
let onScaleSmallerClick;
let onScaleBiggerClick;

const setScale = (imageElement, scaleControlValue, scale) => {
  scaleControlValue.value = `${scale}%`;
  imageElement.style.transform = `scale(${scale / 100})`;
};

export const initiateScale = (imageElement, scaleControlSmaller, scaleControlBigger, scaleControlValue) => {
  let currentScale = SCALE_MAX;

  const updateScale = (newScale) => {
    currentScale = newScale;
    setScale(imageElement, scaleControlValue, currentScale);
  };

  onScaleSmallerClick = () => {
    if (currentScale > SCALE_MIN) {
      updateScale(currentScale - SCALE_STEP);
    }
  };

  onScaleBiggerClick = () => {
    if (currentScale < SCALE_MAX) {
      updateScale(currentScale + SCALE_STEP);
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  updateScale(currentScale);
};

export const removeScaleEventListeners = (scaleControlSmaller, scaleControlBigger) => {
  if (onScaleSmallerClick) {
    scaleControlSmaller.removeEventListener('click', onScaleSmallerClick);
  }
  if (onScaleBiggerClick) {
    scaleControlBigger.removeEventListener('click', onScaleBiggerClick);
  }
};

