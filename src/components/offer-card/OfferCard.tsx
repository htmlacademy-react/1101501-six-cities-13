import {TFavoriteDataStatus, TOffer} from '../../types/offer';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {useAppDispatch} from '../hooks';
import {changeFavorite} from '../../store/api-actions';
import {calculateRatingInWidthPercent} from '../../utils/utils';

type TOfferCardProps = {
  offer: TOffer;
  cardType: string;
  targetOffer?: (TOffer) => void;
}

function OfferCard({ offer, cardType, targetOffer }: TOfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isPremium, isFavorite, previewImage, title, type, rating, price, id} = offer;
  const [isFavoriteOffer, setIsFavoriteOffer] = useState<boolean>(isFavorite);

  const handleFavoriteOfferClick = () => {
    const changedFavoriteStatus = Number(!isFavoriteOffer) as TFavoriteDataStatus['status'];
    setIsFavoriteOffer(!isFavoriteOffer);
    dispatch(changeFavorite({id, status: changedFavoriteStatus}));
  };

  return (
    <article className={`${cardType}__card place-card`}
      onMouseOver={() => targetOffer?.(offer)}
      onMouseOut={() => targetOffer?.(null)}
    >
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
            <span style={{width: calculateRatingInWidthPercent(rating)}}/>
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
