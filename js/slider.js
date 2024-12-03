const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('input[name="effect"]');

const effectSettings = {
  chrome: {
    step: 0.1,
    min: 0,
    max: 1,
    start: 1,
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    step: 0.1,
    min: 0,
    max: 1,
    start: 1,
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    step: 1,
    min: 0,
    max: 100,
    start: 100,
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    step: 0.1,
    min: 0,
    max: 3,
    start: 3,
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    step: 0.1,
    min: 1,
    max: 3,
    start: 3,
    filter: (value) => `brightness(${value})`
  },
  none: {
    step: 1,
    min: 0,
    max: 100,
    start: 100,
    filter: () => ''
  }
};

noUiSlider.create(sliderElement, {
  start: [100],
  range: {
    'min': [0],
    'max': [100]
  },
  step: 1,
  connect: 'lower'
});

const applyEffect = (effect, value) => {
  const effectFilter = effectSettings[effect].filter;
  previewImage.style.filter = effectFilter(value);
};

const updateSliderOptions = (effect) => {
  const { step, min, max, start } = effectSettings[effect];
  sliderElement.noUiSlider.updateOptions({
    start: [start],
    step,
    range: { min: [min], max: [max] },
  });
};

const onSliderUpdate = (values, handle) => {
  const effectValue = parseFloat(values[handle]).toFixed(1);
  effectValueElement.value = +effectValue;
  const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  applyEffect(selectedEffect, effectValue);
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

const onEffectChange = (evt) => {
  const selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    previewImage.style.filter = '';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    updateSliderOptions(selectedEffect);
    sliderElement.noUiSlider.set(effectSettings[selectedEffect].start);
    effectValueElement.value = effectSettings[selectedEffect].start;
    applyEffect(selectedEffect, effectSettings[selectedEffect].start);
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
