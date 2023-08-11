// import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {TOffer} from '../types/offer';
import {
  setActiveCity,
  fetchOffersFromCity,
  fetchOffers,
  requireAuthorization,
  fetchError,
  setOffersLoadingStatus
} from './action';
import {AuthorizationStatus, DEFAULT_LOCATION} from '../constants';

type TInitialState = {
  city: string;
  offers: TOffer[];
  offersFromCity: TOffer[];
  authorizationStatus: typeof AuthorizationStatus;
  error: string | null;
  isOffersLoading: boolean;
}

const initialState: TInitialState = {
  city: DEFAULT_LOCATION,
  offers: [],
  offersFromCity: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersFromCity, (state, action) => {
      state.offersFromCity = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(fetchError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export default reducer;
