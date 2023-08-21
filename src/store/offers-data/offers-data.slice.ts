import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';
import {NameSpace, RequestStatus} from '../../constants';
import {fetchOffers} from '../api-actions';

type TOffersDataState = Pick<TInitialState, 'offers' | 'fetchOffersStatus'>;

const initialState: TOffersDataState = {
  offers: [],
  fetchOffersStatus: RequestStatus.Idle,
};

export const offersDataSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.fetchOffersStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<TOffersDataState['offers']>) => {
        state.fetchOffersStatus = RequestStatus.Success;
        state.offers = action.payload || [];
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.fetchOffersStatus = RequestStatus.Rejected;
      });
  },
});
