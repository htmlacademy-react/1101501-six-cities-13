import {describe, expect, it} from 'vitest';
import {NameSpace, RequestStatus} from '../../constants';
import {mockOffers} from '../../utils/mocks';
import {getOffers, getOffersFetchingStatus} from './offers-data.selectors';

describe('OffersData selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: mockOffers,
      fetchOffersStatus: RequestStatus.Pending,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return offers loading status from state', () => {
    const { fetchOffersStatus } = state[NameSpace.Offers];
    const result = getOffersFetchingStatus(state);
    expect(result).toBe(fetchOffersStatus);
  });
});
