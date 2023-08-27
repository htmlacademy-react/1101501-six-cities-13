import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getOffer = (
  state: Pick<TAppState, NameSpace.Offer>
): TInitialState['offer'] =>
  state[NameSpace.Offer].offer;
export const getOfferFetchingStatus = (
  state: Pick<TAppState, NameSpace.Offer>
): TInitialState['fetchOfferStatus'] =>
  state[NameSpace.Offer].fetchOfferStatus;
