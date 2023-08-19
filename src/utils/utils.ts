import {MONTHS} from '../constants';

export const calculateRatingInWidthPercent = (value:number):string => `${(value * 100) / 5}%`;

export const getRandomPositiveNumber = (max: number, min = 0,):number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getFormatDate = (value: string):string => {
  const date = new Date(value);
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
