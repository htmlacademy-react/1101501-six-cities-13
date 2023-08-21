export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Reviews = '/comments',
  Favorite = '/favorite',
}

export enum NameSpace {
  App = 'APP',
  User = 'USER',
  Offer = 'OFFER',
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  NearPlaces = 'NEAR_PLACES',
  Reviews = 'REVIEWS'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Rejected = 'Rejected',
}

export enum OfferCardPageType {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places'
}

export enum MapPageType {
  Cities = 'cities',
  Offer = 'offer',
}

export enum FavoriteButtonPageType {
  Default = 'place-card',
  Offer = 'offer',
}

export enum FavoriteIconSize {
  Small = {width: 18, height: 19},
  Large = {width: 31, height: 33}
}

export enum OfferReviewLimit {
  ReviewMinLength = 50,
  ReviewMaxLength = 300,
  MinRating = 1,
}

export const CityNames: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum SortingMap {
    Popular = 'Popular',
    LowToHigh = 'Price: low to high',
    HighToLow = 'Price: high to low',
    TopRated = 'Top rated first',
}

export const OFFER_REVIEW_RATINGS = [
  { ratingValue: 1, ratingText: 'terribly' },
  { ratingValue: 2, ratingText: 'badly' },
  { ratingValue: 3, ratingText: 'not bad' },
  { ratingValue: 4, ratingText: 'good' },
  { ratingValue: 5, ratingText: 'perfect' },
] as const;

export const MONTHS = [
  'January','February','March','April','May','June','July',
  'August','September','October','November','December'
] as const;

export const ASSETS_BASE_URL = '/img';
export const URL_MARKER_DEFAULT = `${ASSETS_BASE_URL}/pin.svg`;
export const URL_MARKER_CURRENT = `${ASSETS_BASE_URL}/pin-active.svg`;

export const BACKEND_BASE_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 4000;

export const DEFAULT_LOCATION = 'Paris';

export const MAX_NEAR_PLACES_COUNT = 3;
export const MAX_REVIEWS_COUNT = 10;
