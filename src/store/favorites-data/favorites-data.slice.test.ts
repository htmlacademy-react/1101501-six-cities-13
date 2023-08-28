import {describe, expect, it} from 'vitest';
import {RequestStatus} from '../../constants';
import {mockOffer} from '../../utils/mocks';
import {favoritesDataSlice} from './favorites-data.slice';
import {changeFavorite, fetchFavorites} from '../api-actions';

describe('FavoritesData slice', () => {
  const action = {type: ''};
  const initialState = {favoriteOffers: [], fetchFavoriteOffersStatus: RequestStatus.Idle};

  it('should return initial state with empty action', () => {
    const expectedState = {favoriteOffers: [mockOffer], fetchFavoriteOffersStatus: RequestStatus.Pending};
    const result = favoritesDataSlice.reducer(expectedState, action);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = favoritesDataSlice.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should set "fetchFavoriteOffersStatus" to "RequestStatus.Pending" with "fetchFavorites.pending"', () => {
    const expectedState = {favoriteOffers: [], fetchFavoriteOffersStatus: RequestStatus.Pending};
    const result = favoritesDataSlice.reducer(undefined, fetchFavorites.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffers" to array with favorite offer, "RequestStatus.Success" with "fetchFavorites.fulfilled"', () => {
    const expectedState = {favoriteOffers: [mockOffer], fetchFavoriteOffersStatus: RequestStatus.Success};
    const result = favoritesDataSlice.reducer(undefined, fetchFavorites.fulfilled(
      [mockOffer], '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set "fetchFavoriteOffersStatus" to "RequestStatus.Rejected" with "fetchFavorites.rejected"', () => {
    const expectedState = {favoriteOffers: [], fetchFavoriteOffersStatus: RequestStatus.Rejected};
    const result = favoritesDataSlice.reducer(undefined, fetchFavorites.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should add offer to array "favoriteOffers" with "changeFavorite.fulfilled"', () => {
    const state = {favoriteOffers: []};
    const expectedState = {favoriteOffers: [mockOffer]};
    const result = favoritesDataSlice.reducer(state, changeFavorite.fulfilled(
      mockOffer, '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should remove offer to array "favoriteOffers" with "changeFavorite.fulfilled"', () => {
    const state = {favoriteOffers: [mockOffer]};
    const expectedState = {favoriteOffers: []};
    const result = favoritesDataSlice.reducer(state, changeFavorite.fulfilled(
      mockOffer, '', undefined
    ));

    expect(result).toEqual(expectedState);
  });
});
