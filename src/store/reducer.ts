// import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {checkAuth, fetchOffers, logIn} from './api-actions';
import {TOffer} from '../types/offer';
import {fetchError, setActiveCity} from './action';
import {AuthorizationStatus, DEFAULT_LOCATION, RequestStatus} from '../constants';
import {TAuthUserData} from '../types/user-data';

type TInitialState = {
  city: string;
  offers: TOffer[];
  offersFromCity: TOffer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  fetchOffersStatus: RequestStatus;
  user: TAuthUserData | null;
  loginStatus: RequestStatus;
}

const initialState: TInitialState = {
  city: DEFAULT_LOCATION,
  offers: [],
  offersFromCity: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  fetchOffersStatus: RequestStatus.Idle,
  user: null,
  loginStatus: RequestStatus.Idle
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
    .addCase(checkAuth.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
      state.user = null;
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
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchError, (state, action) => {
      state.error = action.payload;
    });
});

export default reducer;
