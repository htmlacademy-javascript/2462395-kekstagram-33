const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

// изменение масштаба
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

// слайдер
noUiSlider.create(sliderElement, {
  start: [100],
  range: {
    'min': [0], 'max': [100]
  },
  step: 1,
  connect: 'lower'
});

const effects = {
  'chrome': (value) => `grayscale(${value / 100})`,
  'sepia': (value) => `sepia(${value / 100})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value * 0.03}px)`,
  'heat': (value) => `brightness(${1 + value * 0.02})`,
  'none': () => ''
};

const applyEffect = (effect, value) => {
  previewImage.style.filter = effects[effect](value);
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  const effectValue = values[handle];
  effectValueElement.value = effectValue;
  const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  applyEffect(selectedEffect, effectValue);
});

const effectRadios = document.querySelectorAll('input[name="effect"]');
effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    sliderElement.noUiSlider.set(100);
    effectValueElement.value = 100;
    const selectedEffect = radio.value;
    if (selectedEffect === 'none') {
      previewImage.style.filter = '';
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      applyEffect(selectedEffect, 100);
    }
  });
});

document.querySelector('#effect-none').checked = true;
document.querySelector('.img-upload__effect-level').classList.add('hidden');
