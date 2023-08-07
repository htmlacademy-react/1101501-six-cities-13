import {createAction} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {TCity} from '../types/offer';

export const fetchOffers = createAction(`${NameSpace.Main}/fetchOffers`);
export const fetchOffersFromCity = createAction(`${NameSpace.Main}/fetchOffersFromCity`);
export const setActiveCity = createAction(`${NameSpace.Main}/changeCity`, (value: TCity) => ({
  payload: value,
}));
