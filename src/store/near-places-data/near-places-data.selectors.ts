import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getNearPlaces = (state: TAppState): TInitialState['nearPlaces'] =>
  state[NameSpace.NearPlaces].nearPlaces;
export const getNearPlacesFetchingStatus = (state: TAppState): TInitialState['fetchNearPlacesStatus'] =>
  state[NameSpace.NearPlaces].fetchNearPlacesStatus;
