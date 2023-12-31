import {DEFAULT_LOCATION, NameSpace} from '../../constants';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';

type TAppDataState = Pick<TInitialState, 'city' | 'errorMessage'>;

const initialState: TAppDataState = {
  city: DEFAULT_LOCATION,
  errorMessage: null,
};

export const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<TAppDataState['city']>) {
      state.city = action.payload;
    },
    fetchError(state, action: PayloadAction<TAppDataState['errorMessage']>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setActiveCity, fetchError } = appDataSlice.actions;
