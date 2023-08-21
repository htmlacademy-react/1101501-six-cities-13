import store from '../store/store';
import {clearErrorAction} from '../store/api-actions';
import {fetchError} from '../store/app-data/app-data.slice';

export const processErrorHandle = (message: string): void => {
  store.dispatch(fetchError(message));
  store.dispatch(clearErrorAction());
};
