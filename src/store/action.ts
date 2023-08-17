import {createAction} from '@reduxjs/toolkit';
import {AppRoute, NameSpace} from '../constants';
import {TCity} from '../types/offer';

export const setActiveCity = createAction(`${NameSpace.Main}/changeCity`,
  (value: TCity['name']) => ({payload: value})
);

export const fetchError = createAction(`${NameSpace.Data}/fetchError`,
  (value: string | null) => ({payload: value})
);

export const redirectToRoute = createAction<AppRoute>(`${NameSpace.User}/redirectToRoute`);

