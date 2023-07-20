import {TOffer} from '../../types/offer';
import OfferCard from '../offer-card/OfferCard';
import OfferSortForm from '../offer-sort-form/OfferSortForm';
import {useState} from 'react';

type OffersListType = {
  offers: TOffer[];
}

function OffersList({ offers }: OffersListType): JSX.Element {
  const offersCount = offers.length;
  const [targetOfferId, setTargetOfferId] = useState<string>('');

  // eslint-disable-next-line no-console
  console.log(targetOfferId);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offersCount} places to stay in Amsterdam
      </b>
      <OfferSortForm />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <OfferCard key={offer.id} offer={offer} targetOfferId={setTargetOfferId}/>)}
      </div>
    </section>
  );
}

export default OffersList;
