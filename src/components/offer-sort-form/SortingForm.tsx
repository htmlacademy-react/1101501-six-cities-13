import {TSorting} from '../../types/sorting';
import {SortingMap} from '../../constants';
import {useState} from 'react';
import classNames from 'classnames';

type TSortingFormProps = {
  sortingType: TSorting;
  onChange: (sortingType: TSorting) => void;
}

function SortingForm({ sortingType, onChange }: TSortingFormProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleTypeClick = () => setIsOpened((prevIsOpened) => !prevIsOpened);
  const handleItemClick = (type: TSorting) => {
    onChange(type);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={handleTypeClick} className="places__sorting-type" tabIndex={0}>
        {SortingMap[sortingType]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames({
        'places__options': true,
        'places__options--custom':true,
        'places__options--opened': isOpened
      })}
      >{Object.keys(SortingMap).map((key: TSorting) => (
          <li
            key={key}
            className={classNames({
              'places__option': true,
              'places__option--active': key === sortingType
            })}
            onClick={() => handleItemClick(key)}
            tabIndex={0}
          >
            {SortingMap[key]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingForm;
