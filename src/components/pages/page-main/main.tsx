import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchOffers} from '../../../store/api-actions';
import CitiesList from '../../cities-list/cities-list';
import Cities from '../../cities/cities';
import {RequestStatus} from '../../../constants';
import Spinner from '../../loading/spinner';
import {Helmet} from 'react-helmet-async';
import classNames from 'classnames';
import {getSelectedCity} from '../../../store/app-data/app-data.selectors';
import {getOffers, getOffersFetchingStatus} from '../../../store/offers-data/offers-data.selectors';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getSelectedCity);
  const offers = useAppSelector(getOffers);
  const offersFetchingStatus = useAppSelector(getOffersFetchingStatus);
  const offersFromCity = offers.filter((offer) => offer.city.name === activeCity);
  const isHasOffers = Boolean(offersFromCity.length);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (offersFetchingStatus === RequestStatus.Pending) {
    return <Spinner />;
  }

  return (
    <main className={classNames({
      'page__main': true,
      'page__main--index': true,
      'page__main--index-empty': !isHasOffers
    })}
    >
      <Helmet>
        <title>Six cities - Cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList selectedCity={activeCity}/>
        </section>
      </div>
      <div className="cities">
        <Cities city={activeCity} isHasOffers={isHasOffers} offers={offersFromCity} />
      </div>
    </main>
  );
}

export default Main;
