import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import reviews from './mocks/reviews';
import {Provider} from 'react-redux';
import index from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={index}>
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>
);
