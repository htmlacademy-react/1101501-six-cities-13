import {TCity} from '../../types/offer';
import {useAppDispatch} from '../hooks';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {setActiveCity, fetchOffersFromCity} from '../../store/action';
import {CityNames} from '../../constants';

type TCitiesProps = {
  selectedCity: TCity;
}

function CitiesList({ selectedCity }: TCitiesProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CityNames.map((city, index) => {
        const key = `${city}-${index}`;
        return (
          <li key={key} className="locations__item">
            <Link className={classNames({
              'locations__item-link': true,
              'tabs__item': true,
              'tabs__item--active': selectedCity === city
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setActiveCity(city));
              dispatch(fetchOffersFromCity());
            }}
            to="/"
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
