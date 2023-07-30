import {useState} from 'react';
import OffersList from '../../offers-list/OffersList';
import Map from '../../map/Map';
import {TOffer} from '../../../types/offer';

type TMainProps = {
  offers: TOffer[];
};

function Main({ offers }: TMainProps): JSX.Element {
  const [targetOffer, setTargetOffer] = useState<TOffer>(offers[0]);

  const hoverOfferInListHandler = (offer: TOffer) => {
    setTargetOffer(offer);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <OffersList onOfferHover={hoverOfferInListHandler} offers={offers} />
          <div className="cities__right-section">
            <Map targetOffer={targetOffer} offers={offers}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
