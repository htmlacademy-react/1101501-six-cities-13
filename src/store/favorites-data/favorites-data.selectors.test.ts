import {describe, expect, it} from 'vitest';
import {NameSpace, RequestStatus} from '../../constants';
import {getFavorites, getFavoritesFetchingStatus} from './favorites-data.selectors';
import {mockOffers} from '../../utils/mocks';

describe('FavoritesData selectors', () => {
  const state = {
    [NameSpace.Favorites]: {
      favoriteOffers: mockOffers,
      fetchFavoriteOffersStatus: RequestStatus.Pending,
    }
  };

  it('should return favorite offers from state', () => {
    const { favoriteOffers } = state[NameSpace.Favorites];
    const result = getFavorites(state);
    expect(result).toBe(favoriteOffers);
  });

  it('should return favorite offers loading status from state', () => {
    const { fetchFavoriteOffersStatus } = state[NameSpace.Favorites];
    const result = getFavoritesFetchingStatus(state);
    expect(result).toBe(fetchFavoriteOffersStatus);
  });
});
