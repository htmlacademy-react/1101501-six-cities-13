import {DEFAULT_LOCATION, NameSpace} from '../../constants';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TInitialState} from '../../types/state';

type TAppDataState = Pick<TInitialState, 'city' | 'error'>;

const initialState: TAppDataState = {
  city: DEFAULT_LOCATION,
  error: '',
};

export const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<TAppDataState['city']>) {
      state.city = action.payload;
    },
    fetchError(state, action: PayloadAction<TAppDataState['error']>) {
      state.error = action.payload;
    },
  },
});

export const { setActiveCity, fetchError } = appDataSlice.actions;
