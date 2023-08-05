import {useEffect} from 'react';
import {useAppSelector} from '../../hooks';
import CitiesList from '../../cities-list/CitiesList';
import {useDispatch} from 'react-redux';
import {fetchOffers} from '../../../store/action';
import Cities from '../../cities/Cities';

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  },[dispatch]);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList selectedCity={activeCity} offers={offers}/>
        </section>
      </div>
      <Cities city={activeCity} offers={offers} />
    </main>
  );
}

export default Main;
