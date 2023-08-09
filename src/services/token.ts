const AUTH_TOKEN_VALUE = 'six-cities-token';

export type TTokenValue = string;

export const getToken = (): TTokenValue => localStorage?.getItem(AUTH_TOKEN_VALUE) || '';
export const setToken = (value: TTokenValue): void => localStorage?.setItem(AUTH_TOKEN_VALUE, value);
export const removeToken = (): void => localStorage?.removeItem(AUTH_TOKEN_VALUE);
