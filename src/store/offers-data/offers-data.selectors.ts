import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getOffers = (state: TAppState): TInitialState['offers'] => state[NameSpace.Offers].offers;
export const getOffersFetchingStatus = (state: TAppState): TInitialState['fetchOffersStatus'] =>
  state[NameSpace.Offers].fetchOffersStatus;
