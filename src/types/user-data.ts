import {TTokenValue} from '../services/token';

export type TAuthUserData = {
  'name': string;
  'avatarUrl': string;
  'isPro': boolean;
  'email': string;
  'token': TTokenValue;
};
