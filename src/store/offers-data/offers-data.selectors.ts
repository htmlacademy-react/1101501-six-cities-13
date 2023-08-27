import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getOffers = (
  state: Pick<TAppState, NameSpace.Offers>
): TInitialState['offers'] =>
  state[NameSpace.Offers].offers;
export const getOffersFetchingStatus = (
  state: Pick<TAppState, NameSpace.Offers>
): TInitialState['fetchOffersStatus'] =>
  state[NameSpace.Offers].fetchOffersStatus;
