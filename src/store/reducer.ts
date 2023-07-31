import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {TOffer} from '../types/offer';
import {changeCity, fillOffers} from './action';

type TInitialState = {
  city: string;
  offers: TOffer[];
}

const initialState: TInitialState = {
  city: 'Amsterdam',
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state) => {
      state.offers = offers;
    });
});

export default reducer;
