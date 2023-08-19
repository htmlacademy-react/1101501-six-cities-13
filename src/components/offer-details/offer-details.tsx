import {TOfferFull} from '../../types/offerFull';
import OfferReviewForm from '../offer-review-form/offer-review-form';
import {JSX, useState} from 'react';
import classNames from 'classnames';
import {calculateRatingInWidthPercent} from '../../utils/utils';
import OfferReviews from '../offer-reviews/offer-reviews';
import {AuthorizationStatus} from '../../constants';
import {Helmet} from 'react-helmet-async';
import {TFavoriteDataStatus} from '../../types/offer';
import {changeFavorite} from '../../store/api-actions';
import {useAppDispatch} from '../hooks';

type TOfferDetailsProps = {
  offer: TOfferFull;
  authStatus: AuthorizationStatus;
}

function OfferDetails({ offer, authStatus }: TOfferDetailsProps): JSX.Element {
  const {
    images, title, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, id
  } = offer;
  const {isPro, name, avatarUrl} = host;

  const dispatch = useAppDispatch();
  const [isFavoriteOffer, setIsFavoriteOffer] = useState<boolean>(isFavorite);

  const handleFavoriteOfferClick = () => {
    const changedFavoriteStatus = Number(!isFavoriteOffer) as TFavoriteDataStatus['status'];
    setIsFavoriteOffer(!isFavoriteOffer);
    dispatch(changeFavorite({id, status: changedFavoriteStatus}));
  };

  return (
    <>
      <div className="offer__gallery-container container">
        <Helmet>
          <title>Six cities - {offer.title}</title>
        </Helmet>
        <div className="offer__gallery">
          {images.map((imageUrl) => (
            <div key={imageUrl} className="offer__image-wrapper">
              <img
                className="offer__image"
                src={imageUrl}
                alt={title}
              />
            </div>
          )
          )}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <button
              className={classNames(
                {
                  'offer__bookmark-button': true,
                  'button': true,
                  'offer__bookmark-button--active': isFavoriteOffer,
                }
              )}
              type="button"
              onClick={handleFavoriteOfferClick}
            >
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: calculateRatingInWidthPercent(rating) }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What`s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((item) => (<li key={item} className="offer__inside-item">{item}</li>))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={
                classNames({
                  'offer__avatar-wrapper': true,
                  'offer__avatar-wrapper--pro': isPro,
                  'user__avatar-wrapper': true,
                })
              }
              >
                <img
                  className="offer__avatar user__avatar"
                  src={avatarUrl}
                  width={74}
                  height={74}
                  alt={name}
                />
              </div>
              <span className="offer__user-name">{name}</span>
              {isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {description}
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <OfferReviews offerId={id} />
            {authStatus === AuthorizationStatus.Auth && (
              <OfferReviewForm offerId={id} />
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
