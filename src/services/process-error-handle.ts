import store from '../store/store';
import {fetchError} from '../store/action';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(fetchError(message));
  store.dispatch(clearErrorAction());
};
