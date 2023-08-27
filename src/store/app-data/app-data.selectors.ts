import {NameSpace} from '../../constants';
import {TAppState, TInitialState} from '../../types/state';

export const getSelectedCity = (state: Pick<TAppState, NameSpace.App>): TInitialState['city'] =>
  state[NameSpace.App].city;
export const getErrorMessage = (state: Pick<TAppState, NameSpace.App>): TInitialState['errorMessage'] =>
  state[NameSpace.App].errorMessage;
