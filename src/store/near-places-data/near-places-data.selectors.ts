import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getNearPlaces = (
  state: Pick<TAppState, NameSpace.NearPlaces>
): TInitialState['nearPlaces'] =>
  state[NameSpace.NearPlaces].nearPlaces;
export const getNearPlacesFetchingStatus = (
  state: Pick<TAppState, NameSpace.NearPlaces>
): TInitialState['fetchNearPlacesStatus'] =>
  state[NameSpace.NearPlaces].fetchNearPlacesStatus;
