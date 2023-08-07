import OffersList from '../offers-list/OffersList';
import Map from '../map/Map';
import {useState} from 'react';
import {TCity, TOffer} from '../../types/offer';

type TCities = {
  city: TCity;
  offers: TOffer[];
}

export function Cities({ city, offers }: TCities): JSX.Element {
  const activeCityOffers = offers.filter((offer) => offer.city.name === city.name);
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>(undefined);

  const handleCardHover = (offer: TOffer) => {
    setActiveOffer(offer);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <OffersList onOfferHover={handleCardHover} selectedCity={city} offers={activeCityOffers} />
        <div className="cities__right-section">
          <Map targetOffer={activeOffer} offers={activeCityOffers} pageType={'cities'}/>
        </div>
      </div>
    </div>
  );
}

export default Cities;
