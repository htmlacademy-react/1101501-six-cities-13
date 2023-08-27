import {describe, expect, it} from 'vitest';
import {appDataSlice, fetchError, setActiveCity} from './app-data.slice';
import {DEFAULT_LOCATION} from '../../constants';

describe('AppData slice', () => {
  const action = {type: ''};
  const initialState = {city: DEFAULT_LOCATION, errorMessage: null};

  it('should return initial state with empty action', () => {
    const expectedState = {city: 'Brussels', errorMessage: 'error'};
    const result = appDataSlice.reducer(expectedState, action);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = appDataSlice.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should return active city with "setActiveCity" action', () => {
    const expectedSelectedCity = 'Brussels';
    const result = appDataSlice.reducer(initialState, setActiveCity(expectedSelectedCity));

    expect(result.city).toBe(expectedSelectedCity);
  });

  it('should return error message with "fetchError" action', () => {
    const expectedSelectedCity = 'error';
    const result = appDataSlice.reducer(initialState, fetchError(expectedSelectedCity));

    expect(result.errorMessage).toBe(expectedSelectedCity);
  });
});
