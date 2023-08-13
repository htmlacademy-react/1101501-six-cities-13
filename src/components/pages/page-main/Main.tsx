import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchOffers} from '../../../store/api-actions';
import CitiesList from '../../cities-list/CitiesList';
import Cities from '../../cities/Cities';
import {RequestStatus} from '../../../constants';
import Spinner from '../../loading/spinner';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const offersFetchingStatus = useAppSelector((state) => state.fetchOffersStatus);
  const offersFromCity = offers.filter((offer) => offer.city.name === activeCity);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if ((offersFetchingStatus === RequestStatus.Pending)) {
    return (
      <Spinner />
    );
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          {offersFromCity.length && <CitiesList selectedCity={activeCity}/>}
        </section>
      </div>
      {offersFromCity.length && <Cities city={activeCity} offers={offersFromCity} />}
    </main>
  );
}

export default Main;
