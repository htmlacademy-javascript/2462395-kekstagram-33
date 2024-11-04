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
const URLS = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg',
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
const AVATARS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
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

const createCommentArray = () => ({
  id: idCommentGenerator,
  avatar: getRandomArrayElement(AVATARS),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoArray = () => ({
  id: idPhotoGenerator,
  url: getRandomArrayElement(URLS),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  commentsNumber: getRandomInteger(0, 30),
  comments: createCommentArray,
});

const allPhotos = Array.from({length: 25}, createPhotoArray);
