import OffersList from '../offers-list/OffersList';
import Map from '../map/Map';
import {memo, useCallback, useState} from 'react';
import {TCity, TOffer} from '../../types/offer';
import {MapPageType} from '../../constants';
import MainEmpty from '../pages/page-main-empty/MainEmpty';

type TCities = {
  city: TCity['name'];
  offers: TOffer[];
}

export function Cities({ city, offers }: TCities): JSX.Element {
  const cityInfo = offers.find((cityData) => cityData?.city.name === city)?.city;
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  const isNotEmptyOffers = Boolean(offers.length);

  const handleCardHover = useCallback((offer: TOffer) => {
    setActiveOffer(offer);
  }, []);

  return (
    isNotEmptyOffers
      ? (
        <div className="cities__places-container container">
          <OffersList onOfferHover={handleCardHover} selectedCity={cityInfo} offers={offers} />
          <div className="cities__right-section">
            <Map city={cityInfo} targetOffer={activeOffer} offers={offers} pageType={MapPageType.Cities}/>
          </div>
        </div>
      ) : (
        <MainEmpty />
      )
  );
}

export default memo(Cities);
