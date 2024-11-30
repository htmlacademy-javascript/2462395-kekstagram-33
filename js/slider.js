const CHROME_STEP = 0.1;
const SEPIA_STEP = 0.1;
const MARVIN_STEP = 1;
const PHOBOS_STEP = 0.1;
const HEAT_STEP = 0.1;
const MAX_CHROME = 1;
const MAX_SEPIA = 1;
const MAX_MARVIN = 100;
const MAX_PHOBOS = 3;
const MAX_HEAT = 3;
const MIN_HEAT = 1;

const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('input[name="effect"]');

noUiSlider.create(sliderElement, {
  start: [100],
  range: {
    'min': [0],
    'max': [100]
  },
  step: 1,
  connect: 'lower'
});

const effects = {
  'chrome': (value) => `grayscale(${value / MAX_CHROME})`,
  'sepia': (value) => `sepia(${value / MAX_SEPIA})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value * (MAX_PHOBOS / 100)}px)`,
  'heat': (value) => `brightness(${MIN_HEAT + (value / 100) * (MAX_HEAT - MIN_HEAT)})`,
  'none': () => ''
};

const applyEffect = (effect, value) => {
  previewImage.style.filter = effects[effect](value);
};

const updateSliderOptions = (effect) => {
  let step, max, start, min;
  switch (effect) {
    case 'chrome':
      step = CHROME_STEP;
      max = MAX_CHROME;
      start = MAX_CHROME;
      min = 0;
      break;
    case 'sepia':
      step = SEPIA_STEP;
      max = MAX_SEPIA;
      start = MAX_SEPIA;
      min = 0;
      break;
    case 'marvin':
      step = MARVIN_STEP;
      max = MAX_MARVIN;
      start = MAX_MARVIN;
      min = 0;
      break;
    case 'phobos':
      step = PHOBOS_STEP;
      max = MAX_PHOBOS;
      start = MAX_PHOBOS;
      min = 0;
      break;
    case 'heat':
      step = HEAT_STEP;
      max = MAX_HEAT;
      start = MAX_HEAT;
      min = MIN_HEAT;
      break;
    default:
      step = 1;
      max = 100;
      start = 100;
      min = 0;
  }
  sliderElement.noUiSlider.updateOptions({
    start: [start],
    step: step,
    range: {
      'min': [min],
      'max': [max]
    }
  });
};

const onSliderUpdate = (values, handle) => {
  const effectValue = values[handle];
  effectValueElement.value = effectValue;
  const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  applyEffect(selectedEffect, effectValue);
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

const onEffectChange = (evt) => {
  const radio = evt.target;
  const selectedEffect = radio.value;
  if (selectedEffect === 'none') {
    previewImage.style.filter = '';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    updateSliderOptions(selectedEffect);
    sliderElement.noUiSlider.set(100);
    effectValueElement.value = 100;
    applyEffect(selectedEffect, 100);
  }
};

export const addEffectListeners = () => {
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', onEffectChange);
  });
};

export const removeEffectListeners = () => {
  effectRadios.forEach((radio) => {
    radio.removeEventListener('change', onEffectChange);
  });
};

document.querySelector('#effect-none').checked = true;
document.querySelector('.img-upload__effect-level').classList.add('hidden');
