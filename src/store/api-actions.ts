import {APIRoute, NameSpace, TIMEOUT_SHOW_ERROR} from '../constants';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchError} from './action';
import {TOffer} from '../types/offer';
import {TAuthData} from '../types/auth-data';
import {TAuthUserData} from '../types/user-data';
import {setToken} from '../services/token';
import {TOfferFull} from '../types/offerFull';
import {TReview, TReviewData} from '../types/review';
import {AxiosInstance} from 'axios';

type TExtraArg = {extra: AxiosInstance};

export const fetchOffers = createAsyncThunk<
  TOffer[], undefined, TExtraArg
  >(
    `${NameSpace.Main}/fetchOffers`,
    async (_arg, {extra: api}) => {
      const {data} = await api.get<TOffer[]>(APIRoute.Offers);
      return data;
    }
  );

export const fetchOffer = createAsyncThunk<
  TOfferFull, TOfferFull['id'], TExtraArg
  >(
    `${NameSpace.Offer}/fetchOffer`,
    async (offerId, {extra: api}) => {
      const {data} = await api.get<TOfferFull>(`${APIRoute.Offers}/${offerId}`);
      return data;
    }
  );

export const fetchNearPlaces = createAsyncThunk<
  TOffer[], TOfferFull['id'], TExtraArg
  >(
    `${NameSpace.Offer}/fetchNearPlaces`,
    async (offerId, {extra: api}) => {
      const {data} = await api.get<TOffer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
      return data;
    }
  );

export const fetchReviews = createAsyncThunk<
  TReview[], TOfferFull['id'], TExtraArg
  >(
    `${NameSpace.Offer}/fetchOfferReviews`,
    async (offerId, {extra: api}) => {
      const {data} = await api.get<TReview[]>(`${APIRoute.Reviews}/${offerId}`);
      return data;
    }
  );

export const postReview = createAsyncThunk<
  TReview[], {reviewData: TReviewData; offerId: TOfferFull['id']}, TExtraArg
  >(
    `${NameSpace.Offer}/postOfferReview`,
    async ({reviewData, offerId}, {extra: api}) => {
      const {data} = await api.post<TReview[]>(`${APIRoute.Reviews}/${offerId}`, reviewData);
      return data;
    }
  );

export const checkAuth = createAsyncThunk<
  TAuthUserData, undefined, TExtraArg
  >(
    `${NameSpace.User}/checkAuth`,
    async (_arg, {extra: api}) => {
      const {data} = await api.get<TAuthUserData>(APIRoute.Login);
      return data;
    },
  );

export const logIn = createAsyncThunk<
  TAuthUserData, TAuthData, TExtraArg
  >(
    `${NameSpace.User}/login`,
    async ({email, password}, {extra: api}) => {
      const {data} = await api.post<TAuthUserData>(APIRoute.Login, {email, password});
      setToken(data.token);
      return data;
    },
  );

export const clearErrorAction = createAsyncThunk<
  void, undefined, TExtraArg
  >(
    `${NameSpace.Data}/clearError`,
    (_arg, {dispatch}) => {
      setTimeout(
        () => dispatch(fetchError(null)),
        TIMEOUT_SHOW_ERROR,
      );
    },
  );
