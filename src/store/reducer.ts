import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {TOffer} from '../types/offer';
import {changeCity, fillOffersFromCity} from './action';

type TInitialState = {
  city: string;
  offers: TOffer[];
  offersFromCity: TOffer[];

}

const initialState: TInitialState = {
  city: 'Paris',
  offers: offers,
  offersFromCity: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersFromCity, (state) => {
      state.offersFromCity = offers.filter((offer) => offer.city.name === state.city);
    });
});

export default reducer;
