import {TCity, TOffer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import SortingForm from '../offer-sort-form/sorting-form';
import {OfferCardPageType, SortingMap} from '../../constants';
import {TSorting} from '../../types/sorting';
import {memo, useState} from 'react';
import {sort} from '../../utils/sorting';

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
        {offersCount} {offersCount > 1 ? 'places' : 'place'} to stay in {selectedCity?.name}
      </b>
      <SortingForm sortingType={sortingType} onChange={(newSortingType) => {
        setSortingType(newSortingType);
      }}
      />
      <div className="cities__places-list places__list tabs__content">
        {sortOffers.map((offer) => <OfferCard cardType={OfferCardPageType.Cities} key={offer.id} offer={offer} targetOffer={onOfferHover}/>)}
      </div>
    </section>
  );
}

export default memo(OffersList);
