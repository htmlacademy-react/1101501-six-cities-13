import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getUser = (state: TAppState): TInitialState['user'] =>
  state[NameSpace.User].user;
export const getAuthorizationStatus = (state: TAppState): TInitialState['authorizationStatus'] =>
  state[NameSpace.User].authorizationStatus;
export const getLoginStatus = (state: TAppState): TInitialState['loginStatus'] =>
  state[NameSpace.User].loginStatus;
