import {APIRoute, NameSpace, TIMEOUT_SHOW_ERROR} from '../constants';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchError} from './action';
import {TAppDispatch, TAppState} from '../types/state';
import {AxiosInstance} from 'axios';
import {TOffer} from '../types/offer';
import {TAuthData} from '../types/auth-data';
import {TAuthUserData} from '../types/user-data';
import {setToken} from '../services/token';

export const fetchOffers = createAsyncThunk<
  TOffer[], undefined, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.Main}/fetchOffers`,
    async (_arg, {extra: api}) => {
      const {data} = await api.get<TOffer[]>(APIRoute.Offers);
      return data;
    }
  );

export const checkAuth = createAsyncThunk<
  TAuthUserData, undefined, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.User}/checkAuth`,
    async (_arg, {extra: api}) => {
      const {data} = await api.get<TAuthUserData>(APIRoute.Login);
      return data;
    },
  );

export const logIn = createAsyncThunk<
  TAuthUserData, TAuthData, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.User}/login`,
    async ({login: email, password}, {extra: api}) => {
      const {data} = await api.post<TAuthUserData>(APIRoute.Login, {email, password});
      setToken(data.token);
      return data;
    },
  );

export const clearErrorAction = createAsyncThunk<void, undefined, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}>(
  `${NameSpace.Data}/clearError`,
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(fetchError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
