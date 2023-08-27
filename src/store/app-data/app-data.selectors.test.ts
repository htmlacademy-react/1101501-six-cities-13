import {describe, expect, it} from 'vitest';
import {NameSpace} from '../../constants';
import {getErrorMessage, getSelectedCity} from './app-data.selectors';

describe('AppData selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Paris',
      errorMessage: null,
    }
  };

  it('should return selected city from state', () => {
    const { city } = state[NameSpace.App];
    const result = getSelectedCity(state);
    expect(result).toBe(city);
  });

  it('should return error message status from state', () => {
    const { errorMessage } = state[NameSpace.App];
    const result = getErrorMessage(state);
    expect(result).toBe(errorMessage);
  });
});
