import {APIRoute, AuthorizationStatus, NameSpace, TIMEOUT_SHOW_ERROR} from '../constants';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchError, fetchOffers, requireAuthorization, setOffersLoadingStatus} from './action';
import {TAppDispatch, TAppState} from '../types/state';
import {AxiosInstance} from 'axios';
import {TOffer} from '../types/offer';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {setToken} from '../services/token';
import store from './store';

export const fetchOffersAction = createAsyncThunk<
  void, undefined, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.Data}/fetchOffers`,
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersLoadingStatus(true));
      const {data} = await api.get<TOffer[]>(APIRoute.Offers);
      dispatch(setOffersLoadingStatus(false));
      dispatch(fetchOffers(data));
    }
  );

export const checkAuthAction = createAsyncThunk<
  void, undefined, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.User}/checkAuth`,
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.get(APIRoute.Login);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<
  void, AuthData, {dispatch: TAppDispatch; state: TAppState; extra: AxiosInstance}
  >(
    `${NameSpace.User}/login`,
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      setToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    },
  );

export const clearErrorAction = createAsyncThunk(
  `${NameSpace.Data}/clearError`,
  () => {
    setTimeout(
      () => store.dispatch(fetchError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
