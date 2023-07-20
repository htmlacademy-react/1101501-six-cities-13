import {TOffer} from '../../types/offer';
import {useState} from 'react';

type TOfferCardProps = {
  offer: TOffer;
  targetOfferId: (id: string) => void;
}

function OfferCard({ offer, targetOfferId }: TOfferCardProps): JSX.Element {
  const {isPremium, isFavorite, previewImage, title, type, rating, price, id} = offer;
  const [isFavoriteOffer, setIsFavoriteOffer] = useState<boolean>(isFavorite);
  const isFavoriteOfferClickHandler = () => {
    setIsFavoriteOffer(!isFavoriteOffer);
  };

  return (
    <article className="cities__card place-card" onMouseOver={() => targetOfferId(id)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${
            isFavoriteOffer ? 'place-card__bookmark-button--active' : ''
          } button`} type="button" onClick={isFavoriteOfferClickHandler}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating * 100) / 5}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
