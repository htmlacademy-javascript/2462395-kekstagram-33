const NAMES = [
  'Маша',
  'Вика',
  'Женя',
  'Света',
  'Гоша',
  'Саша',
  'Ксюша',
  'Паша',
  'Лида',
  'Сеня',
  'Коля',
  'Даша',
  'Оля',
  'Наташа',
  'Олег',
  'Люда',
  'Аня',
  'Ира',
  'Миша',
  'Митя',
  'Леша',
  'Рома',
  'Таня',
  'Степа',
  'Гриша',
];
const DESCRIPTIONS = [
  'Афганские дети впервые в своей жизни видят яблоко',
  'Мужчина пытается спасти несколько кошек из полностью затопленного дома',
  'Семьи беженцев из Латинской Америки нелегально пересекают границу США с Мексикой',
  'Полиция арестовывает группировку торговцев людьми в Мехико',
  'Обломки лодки, на которой 12 беженцев из Мавритании пытались добраться до Европы',
  'Немецкие экоактивисты протестуют против строительства угольной шахты',
  'Голод и нищета в Венесуэле',
  'Последствия урагана в Китае',
  'Гражданская война в Южной Африке',
  'Извержение вулкана в Исландии',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createIdGenerator = () => {
  let currentId = 0;
  return () => ++currentId;
};

const idPhotoGenerator = createIdGenerator();
const idCommentGenerator = createIdGenerator();

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const AVATARS = Array.from({ length: 6 }, (_, i) => `img/avatar-${i + 1}.svg`);
const URLS = Array.from({ length: 25 }, (_, i) => `photos/${i + 1}.jpg`);

const minLikes = 15;
const maxLikes = 200;
const maxComments = 30;

const createCommentArray = () => ({
  id: idCommentGenerator(),
  avatar: getRandomArrayElement(AVATARS),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoArray = () => ({
  id: idPhotoGenerator(),
  url: getRandomArrayElement(URLS),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(minLikes, maxLikes),
  comments: Array.from({ length: getRandomInteger(0, maxComments) }, createCommentArray),
});

const createAllPhotos = () => Array.from({ length: 25 }, createPhotoArray);

createAllPhotos();
