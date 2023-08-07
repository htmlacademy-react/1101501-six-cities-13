import offers from '../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {TCity, TOffer} from '../types/offer';
import {setActiveCity, fetchOffersFromCity, fetchOffers} from './action';
import {CityMap} from '../constants';

type TInitialState = {
  city: TCity;
  offers: TOffer[];
  offersFromCity: TOffer[];

}

const initialState: TInitialState = {
  city: CityMap.Paris,
  offers: offers,
  offersFromCity: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersFromCity, (state) => {
      state.offersFromCity = offers.filter((offer) => offer.city.name === state.city.name);
    });
});

export default reducer;
