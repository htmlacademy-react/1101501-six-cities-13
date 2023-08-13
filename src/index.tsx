import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import reviews from './mocks/reviews';
import {Provider} from 'react-redux';
import store from './store/store';
import {checkAuth} from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>
);
