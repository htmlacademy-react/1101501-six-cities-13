import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';
import {NameSpace, RequestStatus} from '../../constants';
import {fetchOffer} from '../api-actions';

type TOfferDataState = Pick<TInitialState, 'offer' | 'fetchOfferStatus'>;

const initialState: TOfferDataState = {
  offer: null,
  fetchOfferStatus: RequestStatus.Idle,
};

export const offerDataSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.fetchOfferStatus = RequestStatus.Pending;
        state.offer = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<TOfferDataState['offer']>) => {
        state.fetchOfferStatus = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.fetchOfferStatus = RequestStatus.Rejected;
      });
  },
});
