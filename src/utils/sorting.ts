import {TOffer} from '../types/offer';
import {TSorting} from '../types/sorting';

const sortLowToHighPrice = (a:TOffer, b:TOffer): number => a.price - b.price;
const sortHighToLowPrice = (a:TOffer, b:TOffer): number => b.price - a.price;
const sortByRating = (a:TOffer, b:TOffer): number => b.rating - a.rating;

export const sort: Record<TSorting, (offers: TOffer[]) => TOffer[]> = {
  'Popular': (offers: TOffer[]) => [...offers],
  'LowToHigh': (offers: TOffer[]) => [...offers].sort(sortLowToHighPrice),
  'HighToLow': (offers: TOffer[]) => [...offers].sort(sortHighToLowPrice),
  'TopRated': (offers: TOffer[]) => [...offers].sort(sortByRating),
};
