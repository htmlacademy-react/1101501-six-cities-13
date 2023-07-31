import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction<string>('main/changeCity');
export const fillOffers = createAction<string>('main/fillOffers');
