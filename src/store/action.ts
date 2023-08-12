import {createAction} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {TCity} from '../types/offer';

export const setActiveCity = createAction(`${NameSpace.Main}/changeCity`,
  (value: TCity['name']) => ({payload: value})
);

export const fetchError = createAction(`${NameSpace.Data}/fetchError`,
  (value: string | null) => ({payload: value})
);

