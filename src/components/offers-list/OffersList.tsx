import {TCity, TOffer} from '../../types/offer';
import OfferCard from '../offer-card/OfferCard';
import OfferSortForm from '../offer-sort-form/OfferSortForm';
import {ClassNameForOfferCardType} from '../../constants';

type TOffersListProps = {
  offers: TOffer[];
  onOfferHover: (TOffer) => void;
  selectedCity: TCity;
}

function OffersList({ offers, onOfferHover, selectedCity }: TOffersListProps): JSX.Element {
  const offersCount = offers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offersCount} places to stay in {selectedCity.name}
      </b>
      <OfferSortForm />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <OfferCard cardType={ClassNameForOfferCardType.Cities} key={offer.id} offer={offer} targetOffer={onOfferHover}/>)}
      </div>
    </section>
  );
}

export default OffersList;
