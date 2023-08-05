import {TOffer} from '../../types/offer';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

type TOfferCardProps = {
  offer: TOffer;
  cardType: string;
  targetOffer?: (TOffer) => void;
}

function OfferCard({ offer, cardType, targetOffer }: TOfferCardProps): JSX.Element {
  const {isPremium, isFavorite, previewImage, title, type, rating, price} = offer;
  const [isFavoriteOffer, setIsFavoriteOffer] = useState<boolean>(isFavorite);
  const handleFavoriteOfferClick = () => {
    setIsFavoriteOffer(!isFavoriteOffer);
  };

  return (
    <article className={`${cardType}__card place-card`} onMouseOver={() => targetOffer && targetOffer(offer)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${
            isFavoriteOffer ? 'place-card__bookmark-button--active' : ''
          } button`} type="button" onClick={handleFavoriteOfferClick}
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
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
