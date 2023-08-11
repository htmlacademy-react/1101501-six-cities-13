import {createAction} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {TCity, TOffer} from '../types/offer';

export const fetchOffers = createAction(`${NameSpace.Main}/fetchOffers`,
  (value: TOffer[]) => ({payload: value})
);
export const setActiveCity = createAction(`${NameSpace.Main}/changeCity`,
  (value: TCity['name']) => ({payload: value})
);
export const requireAuthorization = createAction(`${NameSpace.User}/requireAuthorization`,
  (value: string) => ({payload: value})
);
export const fetchOffersFromCity = createAction(`${NameSpace.Main}/fetchOffersFromCity`,
  (value: TOffer[]) => ({payload: value})
);
export const fetchError = createAction(`${NameSpace.Data}/fetchError`,
  (value: string | null) => ({payload: value})
);
export const setOffersLoadingStatus = createAction(`${NameSpace.Data}/setOffersLoadingStatus}`,
  (value: boolean) => ({payload: value})
);

