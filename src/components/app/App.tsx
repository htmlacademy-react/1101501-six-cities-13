import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/page-main/Main';
import PageNotFound from '../pages/page-not-found/PageNotFound';
import Login from '../pages/page-login/Login';
import Offer from '../pages/page-offer/Offer';
import Favorites from '../pages/page-favorites/Favorites';
import Layout from '../layout/Layout';
import PrivateRoute from '../private-route/PrivateRoute';
import { AppRoute, AuthorizationStatus } from '../../constants';
import {TOffer} from '../../types/offer';

type TAppProps = {
  offers: TOffer[];
};

function App({ offers }: TAppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Offer}>
            <Route path=':id' element={<Offer />} />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={AuthorizationStatus.Auth}>
                <Favorites offers={offers}/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
