import {TCity} from './types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ClassNameForOfferCardType {
  Cities = 'cities',
  Favorites = 'favorites',
}

export enum OfferCommentLimit {
  CommentMinLength = 50,
  CommentMaxLength = 300,
  MinRating = 1,
}

export const OFFER_COMMENT_RATINGS = [
  { ratingValue: 1, ratingText: 'terribly' },
  { ratingValue: 2, ratingText: 'badly' },
  { ratingValue: 3, ratingText: 'not bad' },
  { ratingValue: 4, ratingText: 'good' },
  { ratingValue: 5, ratingText: 'perfect' },
] as const;

export const CITIES: TCity[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8567801,
      longitude: 2.3315211,
      zoom: 10,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9461149,
      longitude: 6.9415238,
      zoom: 10,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8552034,
      longitude: 4.2930173,
      zoom: 10,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3547607,
      longitude: 4.7391566,
      zoom: 10,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5586627,
      longitude: 9.7630179,
      zoom: 10,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.238554,
      longitude: 6.6495462,
      zoom: 10,
    }
  },
];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
