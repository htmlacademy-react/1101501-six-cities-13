import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getUser = (
  state: Pick<TAppState, NameSpace.User>
): TInitialState['user'] =>
  state[NameSpace.User].user;
export const getAuthorizationStatus = (
  state: Pick<TAppState, NameSpace.User>
): TInitialState['authorizationStatus'] =>
  state[NameSpace.User].authorizationStatus;
export const getLoginStatus = (
  state: Pick<TAppState, NameSpace.User>
): TInitialState['loginStatus'] =>
  state[NameSpace.User].loginStatus;
