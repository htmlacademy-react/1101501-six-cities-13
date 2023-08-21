import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';
import {NameSpace, RequestStatus} from '../../constants';
import {fetchNearPlaces} from '../api-actions';

type TNearPlacesDataState = Pick<TInitialState, 'nearPlaces' | 'fetchNearPlacesStatus'>;

const initialState: TNearPlacesDataState = {
  nearPlaces: [],
  fetchNearPlacesStatus: RequestStatus.Idle,
};

export const nearPlacesDataSlice = createSlice({
  name: NameSpace.NearPlaces,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearPlaces.pending, (state) => {
        state.fetchNearPlacesStatus = RequestStatus.Pending;
      })
      .addCase(fetchNearPlaces.fulfilled, (state, action: PayloadAction<TNearPlacesDataState['nearPlaces']>) => {
        state.fetchNearPlacesStatus = RequestStatus.Success;
        state.nearPlaces = action.payload || [];
      })
      .addCase(fetchNearPlaces.rejected, (state) => {
        state.fetchNearPlacesStatus = RequestStatus.Rejected;
      });
  },
});
