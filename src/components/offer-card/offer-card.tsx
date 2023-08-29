import {TOffer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {AppRoute, FavoriteButtonPageType} from '../../constants';
import {calculateRatingInWidthPercent, capitalizedFirstLetterInWord} from '../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';

type TOfferCardProps = {
  offer: TOffer;
  cardType: string;
  targetOffer?: (offer: TOffer | null) => void;
}

function OfferCard({ offer, cardType, targetOffer }: TOfferCardProps): JSX.Element {
  const {isPremium, isFavorite, previewImage, title, type, rating, price, id} = offer;

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
          <FavoriteButton id={id} isActive={isFavorite} pageType={FavoriteButtonPageType.Default}/>
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
        <p className="place-card__type">{capitalizedFirstLetterInWord(type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
