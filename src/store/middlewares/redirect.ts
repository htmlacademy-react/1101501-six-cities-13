import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import reducer from '../reducer';
import {NameSpace} from '../../constants';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === `${NameSpace.User}/redirectToRoute`) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
