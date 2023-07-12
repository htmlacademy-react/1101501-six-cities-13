import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum AppSettings {
  OffersCount = 312,
}

root.render(
  <React.StrictMode>
    <App offersCount={AppSettings.OffersCount} />
  </React.StrictMode>
);
