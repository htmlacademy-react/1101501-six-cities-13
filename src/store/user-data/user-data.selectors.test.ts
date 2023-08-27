import {describe, expect, it} from 'vitest';
import {AuthorizationStatus, NameSpace, RequestStatus} from '../../constants';
import {getAuthorizationStatus, getLoginStatus, getUser} from './user-data.selectors';
import {mockUser} from '../../utils/mocks';

describe('UserData selectors', () => {
  const state = {
    [NameSpace.User]: {
      user: mockUser,
      loginStatus: RequestStatus.Idle,
      authorizationStatus: AuthorizationStatus.Unknown
    }
  };

  it('should return user data from state', () => {
    const { user } = state[NameSpace.User];
    const result = getUser(state);
    expect(result).toBe(user);
  });

  it('should return login status from state', () => {
    const { loginStatus } = state[NameSpace.User];
    const result = getLoginStatus(state);
    expect(result).toBe(loginStatus);
  });

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });
});
