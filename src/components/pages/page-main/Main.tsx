import {useState} from 'react';
import OffersList from '../../offers-list/OffersList';
import Map from '../../map/Map';
import {TOffer} from '../../../types/offer';
import {useAppSelector} from '../../hooks';
import CitiesList from '../../cities-list/CitiesList';

type TMainProps = {
  offers: TOffer[];
};

function Main({ offers }: TMainProps): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const [targetOffer, setTargetOffer] = useState<TOffer | undefined>(undefined);

  const hoverOfferInListHandler = (offer: TOffer) => {
    setTargetOffer(offer);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList selectedCity={selectedCity} offers={offers}/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <OffersList onOfferHover={hoverOfferInListHandler} selectedCity={selectedCity} offers={selectedCityOffers} />
          <div className="cities__right-section">
            <Map targetOffer={targetOffer} offers={selectedCityOffers} pageType={'cities'}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
