import {createAction} from '@reduxjs/toolkit';
import {AppRoute, NameSpace} from '../constants';

export const redirectToRoute = createAction<AppRoute>(`${NameSpace.User}/redirectToRoute`);

