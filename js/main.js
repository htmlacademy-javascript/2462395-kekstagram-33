const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

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

const createCommentArray = () => {
  const commentCount = getRandomInteger(0, MAX_COMMENTS);
  return Array.from({ length: commentCount }, () => ({
    id: idCommentGenerator(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }));
};

const createPhoto = () => ({
  id: idPhotoGenerator(),
  url: `photos/${getRandomInteger(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createCommentArray(),
});

const createPhotoArray = () => Array.from({ length: MAX_PHOTO_NUMBER }, createPhoto);

createPhotoArray();
