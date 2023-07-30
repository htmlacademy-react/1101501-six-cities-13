import {TOffer} from './offer';

export type TOfferFull = Omit<TOffer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}
