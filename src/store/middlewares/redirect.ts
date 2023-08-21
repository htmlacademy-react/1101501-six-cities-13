import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import {NameSpace} from '../../constants';
import rootReducer from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === `${NameSpace.User}/redirectToRoute`) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
export default redirect;
