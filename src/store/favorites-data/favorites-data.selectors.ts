import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getFavorites = (state: TAppState): TInitialState['favoriteOffers'] =>
  state[NameSpace.Favorites].favoriteOffers;
export const getFavoritesFetchingStatus = (state: TAppState): TInitialState['fetchFavoriteOffersStatus'] =>
  state[NameSpace.Favorites].fetchFavoriteOffersStatus;
