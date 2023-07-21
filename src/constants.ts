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
  MaxRating = 5
}

export const OFFER_COMMENT_RATINGS = [
  { ratingValue: 1, ratingText: 'terribly' },
  { ratingValue: 2, ratingText: 'badly' },
  { ratingValue: 3, ratingText: 'not bad' },
  { ratingValue: 4, ratingText: 'good' },
  { ratingValue: 5, ratingText: 'perfect' },
] as const;
