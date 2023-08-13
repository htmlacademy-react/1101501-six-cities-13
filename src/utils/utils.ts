import {MONTHS} from '../constants';

export const calculateRatingInWidthPercent = (value) => `${(value * 100) / 5}%`;

export const getFormatDate = (value: string) => {
  const date = new Date(value);
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
