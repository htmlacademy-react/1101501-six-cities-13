// import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeFavorite,
  checkAuth, fetchFavorites,
  fetchNearPlaces,
  fetchOffer,
  fetchOffers,
  fetchReviews,
  logIn,
  logOut,
  postReview
} from './api-actions';
import {TOffer} from '../types/offer';
import {fetchError, setActiveCity} from './action';
import {AuthorizationStatus, DEFAULT_LOCATION, RequestStatus} from '../constants';
import {TAuthUserData} from '../types/user-data';
import {TOfferFull} from '../types/offerFull';
import {TReview} from '../types/review';

type TInitialState = {
  city: string;
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
  offersFromCity: TOffer[];
  error: string | null;
  user: TAuthUserData | null;
  loginStatus: RequestStatus;
  authorizationStatus: AuthorizationStatus;
}

const initialState: TInitialState = {
  city: DEFAULT_LOCATION,
  offers: [],
  fetchOffersStatus: RequestStatus.Idle,
  offer: null,
  fetchOfferStatus: RequestStatus.Idle,
  reviews: [],
  fetchReviewsStatus: RequestStatus.Idle,
  postReviewStatus: RequestStatus.Idle,
  favoriteOffers: [],
  fetchFavoriteOffersStatus: RequestStatus.Idle,
  nearPlaces: [],
  fetchNearPlacesStatus: RequestStatus.Idle,
  offersFromCity: [],
  error: null,
  user: null,
  loginStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers.pending, (state) => {
      state.fetchOffersStatus = RequestStatus.Pending;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.fetchOffersStatus = RequestStatus.Success;
      state.offers = action.payload;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.fetchOffersStatus = RequestStatus.Rejected;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.fetchOfferStatus = RequestStatus.Pending;
      state.offer = null;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.fetchOfferStatus = RequestStatus.Success;
      state.offer = action.payload;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.fetchOfferStatus = RequestStatus.Rejected;
    })
    .addCase(fetchNearPlaces.pending, (state) => {
      state.fetchNearPlacesStatus = RequestStatus.Pending;
    })
    .addCase(fetchNearPlaces.fulfilled, (state, action) => {
      state.fetchNearPlacesStatus = RequestStatus.Success;
      state.nearPlaces = action.payload;
    })
    .addCase(fetchNearPlaces.rejected, (state) => {
      state.fetchNearPlacesStatus = RequestStatus.Rejected;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.fetchReviewsStatus = RequestStatus.Pending;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.fetchReviewsStatus = RequestStatus.Success;
      state.reviews = action.payload;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.fetchReviewsStatus = RequestStatus.Rejected;
    })
    .addCase(postReview.pending, (state) => {
      state.postReviewStatus = RequestStatus.Pending;
    })
    .addCase(postReview.fulfilled, (state, action) => {
      state.postReviewStatus = RequestStatus.Success;
      state.reviews = [action.payload, ...state.reviews];
    })
    .addCase(postReview.rejected, (state) => {
      state.postReviewStatus = RequestStatus.Rejected;
    })
    .addCase(fetchFavorites.pending, (state) => {
      state.fetchFavoriteOffersStatus = RequestStatus.Pending;
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.fetchFavoriteOffersStatus = RequestStatus.Success;
      state.favoriteOffers = action.payload;
    })
    .addCase(fetchFavorites.rejected, (state) => {
      state.fetchFavoriteOffersStatus = RequestStatus.Rejected;
    })
    .addCase(changeFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;

      if (!updatedOffer) {
        return;
      }

      if (!state.favoriteOffers.some((offer) => offer.id === updatedOffer.id)) {
        state.favoriteOffers.push(updatedOffer);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
      }
    })
    .addCase(checkAuth.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(logIn.pending, (state) => {
      state.loginStatus = RequestStatus.Pending;
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.loginStatus = RequestStatus.Success;
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(logIn.rejected, (state) => {
      state.loginStatus = RequestStatus.Rejected;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchError, (state, action) => {
      state.error = action.payload;
    });
});

export default reducer;
