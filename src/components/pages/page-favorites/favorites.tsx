import OfferCard from '../../offer-card/offer-card';
import {AppRoute, OfferCardPageType, RequestStatus} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {setActiveCity} from '../../../store/app-data/app-data.slice';
import {TCity} from '../../../types/offer';
import FavoritesEmpty from '../page-favorites-empty/favorites-empty';
import Spinner from '../../loading/spinner';
import {getFavorites, getFavoritesFetchingStatus} from '../../../store/favorites-data/favorites-data.selectors';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavorites);
  const fetchFavoriteOffersStatus = useAppSelector(getFavoritesFetchingStatus);
  const cities:string[] = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const handleChangeCity = (city: TCity['name']) => {
    dispatch(setActiveCity(city));
  };

  if (fetchFavoriteOffersStatus === RequestStatus.Pending) {
    return <Spinner />;
  }

  return (
    <>
      {favoriteOffers.length > 0 ? (
        <main className="page__main page__main--favorites">
          <Helmet>
            <title>Six cities - Saved listing</title>
          </Helmet>
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          className="locations__item-link"
                          to={AppRoute.Root}
                          onClick={() => handleChangeCity(city)}
                        >
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteOffers.map((offer) => {
                        const cityName = offer.city.name;
                        if (city !== cityName) {
                          return null;
                        }
                        return <OfferCard key={offer.id} offer={offer} cardType={OfferCardPageType.Favorites}/>;
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <FavoritesEmpty />
      )}
      <footer className="footer container">
        <Link to={AppRoute.Root} className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </>
  );
}

export default Favorites;
