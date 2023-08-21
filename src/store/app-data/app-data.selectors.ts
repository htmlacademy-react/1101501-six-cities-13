import {NameSpace} from '../../constants';
import {TAppState, TInitialState} from '../../types/state';

export const getSelectedCity = (state: TAppState): TInitialState['city'] => state[NameSpace.App].city;
export const getErrorMessage = (state: TAppState): TInitialState['error'] => state[NameSpace.App].error;
