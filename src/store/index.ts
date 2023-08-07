import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import {createAPI} from '../services/api';

const api = createAPI();
const index = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),
});

export default index;
