import {MAX_RATING_VALUE, MONTHS} from '../constants';

export const calculateRatingInWidthPercent = (value:number):string =>
  `${(Math.round(value) * 100) / MAX_RATING_VALUE}%`;

export const getRandomPositiveNumber = (max: number, min = 0,):number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const capitalizedFirstLetterInWord = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;


export const getFormatDate = (value: string):string => {
  const date = new Date(value);
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
