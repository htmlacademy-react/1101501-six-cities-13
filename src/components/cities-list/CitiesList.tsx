import {Link} from 'react-router-dom';
import {useAppDispatch} from '../hooks';
import {setActiveCity} from '../../store/action';
import {TCity} from '../../types/offer';
import {CityNames} from '../../constants';
import classNames from 'classnames';

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
              'tabs__item--active': selectedCity.name === city
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setActiveCity(city));
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
