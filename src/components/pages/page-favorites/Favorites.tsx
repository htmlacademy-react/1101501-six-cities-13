import OfferCard from '../../offer-card/OfferCard';
import {OfferCardPageType} from '../../../constants';
import {useAppSelector} from '../../hooks';
import {Helmet} from 'react-helmet-async';

function Favorites(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => !!offer.isFavorite);
  const cities:string[] = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  return (
    <>
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
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
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
      <footer className="footer container">
        {/* link to main */}
        <a className="footer__logo-link" href="#">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
        {/* link to main */}
      </footer>
    </>
  );
}

export default Favorites;
