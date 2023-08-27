import store from '../store/store';
import {TCity, TOffer} from './offer';
import {AuthorizationStatus, RequestStatus} from '../constants';
import {TOfferFull} from './offerFull';
import {TReview} from './review';
import {TAuthUserData} from './user-data';

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export type TInitialState = {
  city: TCity['name'];
  offers: TOffer[];
  fetchOffersStatus: RequestStatus;
  offer: TOfferFull | null;
  fetchOfferStatus: RequestStatus;
  reviews: TReview[];
  fetchReviewsStatus: RequestStatus;
  postReviewStatus: RequestStatus;
  favoriteOffers: TOffer[];
  fetchFavoriteOffersStatus: RequestStatus;
  nearPlaces: TOffer[];
  fetchNearPlacesStatus: RequestStatus;
  errorMessage: string | null;
  user: TAuthUserData | null;
  loginStatus: RequestStatus;
  authorizationStatus: AuthorizationStatus;
}
