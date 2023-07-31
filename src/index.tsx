import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import offers from './mocks/offers';
import offersFull from './mocks/offersFull';
import reviews from './mocks/reviews';
import {Provider} from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum AppSettings {
  OffersCount = 312,
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersCount={AppSettings.OffersCount} offers={offers} offersFull={offersFull} reviews={reviews}/>
    </Provider>
  </React.StrictMode>
);
