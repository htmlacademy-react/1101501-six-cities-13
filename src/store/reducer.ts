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

const initialState: TInitialState = {

};

const reducer = createReducer(initialState, (builder) => {
  // builder;
  /*.addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchError, (state, action) => {
      state.error = action.payload;
    });*/
});

export default reducer;
