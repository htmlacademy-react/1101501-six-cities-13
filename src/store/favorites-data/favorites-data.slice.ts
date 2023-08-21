import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';
import {NameSpace, RequestStatus} from '../../constants';
import {changeFavorite, fetchFavorites} from '../api-actions';
import {TOffer} from '../../types/offer';

type TFavoritesDataState = Pick<TInitialState, 'favoriteOffers' | 'fetchFavoriteOffersStatus'>;

const initialState: TFavoritesDataState = {
  favoriteOffers: [],
  fetchFavoriteOffersStatus: RequestStatus.Idle,
};

export const favoritesDataSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.fetchFavoriteOffersStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<TFavoritesDataState['favoriteOffers']>) => {
        state.fetchFavoriteOffersStatus = RequestStatus.Success;
        state.favoriteOffers = action.payload || [];
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.fetchFavoriteOffersStatus = RequestStatus.Rejected;
      })
      .addCase(changeFavorite.fulfilled, (state, action: PayloadAction<TOffer>) => {
        const updatedOffer = action.payload;

        if (!updatedOffer) {
          return;
        }

        if (!state.favoriteOffers.some((offer) => offer.id === updatedOffer.id)) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
        }
      });
  },
});
