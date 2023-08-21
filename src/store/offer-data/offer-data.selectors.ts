import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getOffer = (state: TAppState): TInitialState['offer'] => state[NameSpace.Offer].offer;
export const getOfferFetchingStatus = (state: TAppState): TInitialState['fetchOfferStatus'] =>
  state[NameSpace.Offer].fetchOfferStatus;
