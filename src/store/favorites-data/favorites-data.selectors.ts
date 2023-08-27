import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getFavorites = (state: Pick<TAppState, NameSpace.Favorites>): TInitialState['favoriteOffers'] =>
  state[NameSpace.Favorites].favoriteOffers;
export const getFavoritesFetchingStatus = (
  state: Pick<TAppState, NameSpace.Favorites>
): TInitialState['fetchFavoriteOffersStatus'] =>
  state[NameSpace.Favorites].fetchFavoriteOffersStatus;
