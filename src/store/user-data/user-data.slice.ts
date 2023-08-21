import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';
import {AuthorizationStatus, NameSpace, RequestStatus} from '../../constants';
import {checkAuth, logIn, logOut} from '../api-actions';

type TUserDataState = Pick<TInitialState, 'user' | 'loginStatus' | 'authorizationStatus'>;

const initialState: TUserDataState = {
  user: null,
  loginStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown
};

export const userDataSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<TUserDataState['user']>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logIn.pending, (state) => {
        state.loginStatus = RequestStatus.Pending;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<TUserDataState['user']>) => {
        state.loginStatus = RequestStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state) => {
        state.loginStatus = RequestStatus.Rejected;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
