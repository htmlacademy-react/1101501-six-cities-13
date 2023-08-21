import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {appDataSlice} from './app-data/app-data.slice';
import {offerDataSlice} from './offer-data/offer-data.slice';
import {offersDataSlice} from './offers-data/offers-data.slice';
import {reviewsDataSlice} from './reviews-data/reviews-data.slice';
import {favoritesDataSlice} from './favorites-data/favorites-data.slice';
import {nearPlacesDataSlice} from './near-places-data/near-places-data.slice';
import {userDataSlice} from './user-data/user-data.slice';

const rootReducer = combineReducers({
  [NameSpace.App]: appDataSlice.reducer,
  [NameSpace.User]: userDataSlice.reducer,
  [NameSpace.Offer]: offerDataSlice.reducer,
  [NameSpace.Offers]: offersDataSlice.reducer,
  [NameSpace.Reviews]: reviewsDataSlice.reducer,
  [NameSpace.Favorites]: favoritesDataSlice.reducer,
  [NameSpace.NearPlaces]: nearPlacesDataSlice.reducer,
});

export default rootReducer;
