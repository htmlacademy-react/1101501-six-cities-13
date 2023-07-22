import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import offers from './mocks/offers';
import offersFull from './mocks/offersFull';
import reviews from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum AppSettings {
  OffersCount = 312,
}

root.render(
  <React.StrictMode>
    <App offersCount={AppSettings.OffersCount} offers={offers} offersFull={offersFull} reviews={reviews}/>
  </React.StrictMode>
);
