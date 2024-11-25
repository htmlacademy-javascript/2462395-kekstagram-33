const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

export const setScale = (imageElement, scaleControlValue, scale) => {
  scaleControlValue.value = `${scale}%`;
  imageElement.style.transform = `scale(${scale / 100})`;
};

export const changeScale = (imageElement, scaleControlSmaller, scaleControlBigger, scaleControlValue) => {
  let currentScale = SCALE_MAX;

  const updateScale = (newScale) => {
    currentScale = newScale;
    setScale(imageElement, scaleControlValue, currentScale);
  };

  scaleControlSmaller.addEventListener('click', () => {
    if (currentScale > SCALE_MIN) {
      updateScale(currentScale - SCALE_STEP);
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (currentScale < SCALE_MAX) {
      updateScale(currentScale + SCALE_STEP);
    }
  });

  updateScale(currentScale);
};
