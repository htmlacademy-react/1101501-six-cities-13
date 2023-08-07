import {TCity, TOffer} from '../../types/offer';
import OfferCard from '../offer-card/OfferCard';
import SortingForm from '../offer-sort-form/SortingForm';
import {ClassNameForOfferCardType, SortingMap} from '../../constants';
import {TSorting} from '../../types/sorting';
import {useState} from 'react';
import {sort} from '../../utils/utils';

type TOffersListProps = {
  offers: TOffer[];
  onOfferHover: (TOffer) => void;
  selectedCity: TCity;
}

function OffersList({ offers, onOfferHover, selectedCity }: TOffersListProps): JSX.Element {
  const [sortingType, setSortingType] = useState<TSorting>(SortingMap.Popular);
  const sortOffers = sort[sortingType](offers);
  const offersCount = sortOffers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offersCount} places to stay in {selectedCity.name}
      </b>
      <SortingForm sortingType={sortingType} onChange={(newSortingType) => {
        setSortingType(newSortingType);
      }}
      />
      <div className="cities__places-list places__list tabs__content">
        {sortOffers.map((offer) => <OfferCard cardType={ClassNameForOfferCardType.Cities} key={offer.id} offer={offer} targetOffer={onOfferHover}/>)}
      </div>
    </section>
  );
}

export default OffersList;
