import OffersList from '../offers-list/OffersList';
import Map from '../map/Map';
import {useState} from 'react';
import {TCity, TOffer} from '../../types/offer';
import {MapPageType} from '../../constants';

type TCities = {
  city: TCity['name'];
  offers: TOffer[];
}

export function Cities({ city, offers }: TCities): JSX.Element {
  const cityInfo = offers.find((cityData) => cityData?.city.name === city)?.city;
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>(undefined);

  const handleCardHover = (offer: TOffer) => {
    setActiveOffer(offer);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <OffersList onOfferHover={handleCardHover} selectedCity={cityInfo} offers={offers} />
        <div className="cities__right-section">
          <Map city={cityInfo} targetOffer={activeOffer} offers={offers} pageType={MapPageType.Cities}/>
        </div>
      </div>
    </div>
  );
}

export default Cities;
