import {useAppSelector} from '../../hooks';
import CitiesList from '../../cities-list/CitiesList';
import Cities from '../../cities/Cities';

function Main(): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const offersFromCity = offers.filter((offer) => offer.city.name === activeCity);

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
