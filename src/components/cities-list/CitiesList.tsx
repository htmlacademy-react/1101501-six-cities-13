import {TOffer} from '../../types/offer';
import {useAppDispatch} from '../hooks';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {changeCity, fillOffersFromCity} from '../../store/action';

type TCitiesProps = {
  selectedCity: string;
  offers: TOffer[];
}

function CitiesList({ selectedCity, offers }: TCitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const allCities = [...new Set(offers.map((offer) => offer.city.name))];

  return (
    <ul className="locations__list tabs__list">
      {allCities.map((city, index) => {
        const key = `${city}-${index}`;
        return (
          <li key={key} className="locations__item">
            <Link className={classNames({
              'locations__item-link': true,
              'tabs__item': true,
              'tabs__item--active': selectedCity === city
            })}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeCity(city));
              dispatch(fillOffersFromCity);
            }}
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
