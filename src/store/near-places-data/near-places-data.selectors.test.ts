import {describe, expect, it} from 'vitest';
import {NameSpace, RequestStatus} from '../../constants';
import {getNearPlaces, getNearPlacesFetchingStatus} from './near-places-data.selectors';
import {mockOffers} from '../../utils/mocks';

describe('NearPlacesData selectors', () => {
  const state = {
    [NameSpace.NearPlaces]: {
      nearPlaces: mockOffers,
      fetchNearPlacesStatus: RequestStatus.Pending,
    }
  };

  it('should return near places from state', () => {
    const { nearPlaces } = state[NameSpace.NearPlaces];
    const result = getNearPlaces(state);
    expect(result).toBe(nearPlaces);
  });

  it('should return near places loading status from state', () => {
    const { fetchNearPlacesStatus } = state[NameSpace.NearPlaces];
    const result = getNearPlacesFetchingStatus(state);
    expect(result).toBe(fetchNearPlacesStatus);
  });
});
