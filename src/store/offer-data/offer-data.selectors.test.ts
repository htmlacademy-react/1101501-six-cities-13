import {describe, expect, it} from 'vitest';
import {NameSpace, RequestStatus} from '../../constants';
import {getOffer, getOfferFetchingStatus} from './offer-data.selectors';
import {mockOfferFull} from '../../utils/mocks';

describe('OfferData selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offer: mockOfferFull,
      fetchOfferStatus: RequestStatus.Pending,
    }
  };

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Offer];
    const result = getOffer(state);
    expect(result).toBe(offer);
  });

  it('should return offer loading status from state', () => {
    const { fetchOfferStatus } = state[NameSpace.Offer];
    const result = getOfferFetchingStatus(state);
    expect(result).toBe(fetchOfferStatus);
  });
});
