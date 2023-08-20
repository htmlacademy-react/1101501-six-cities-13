import {Routes, Route} from 'react-router-dom';
import Main from '../pages/page-main/main';
import PageNotFound from '../pages/page-not-found/page-not-found';
import Login from '../pages/page-login/login';
import Offer from '../pages/page-offer/offer';
import Favorites from '../pages/page-favorites/favorites';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {useAppSelector} from '../hooks';
import Spinner from '../loading/spinner';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return (
      <Spinner />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout authStatus={authStatus} />}>
            <Route index element={<Main />} />
            <Route path={AppRoute.Login} element={<Login authStatus={authStatus} />} />
            <Route path={AppRoute.Offer}>
              <Route path=':id' element={<Offer />} />
            </Route>
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authStatus={authStatus}>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;