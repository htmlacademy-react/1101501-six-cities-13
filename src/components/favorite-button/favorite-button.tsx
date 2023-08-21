import {TFavoriteDataStatus, TOffer} from '../../types/offer';
import {changeFavorite} from '../../store/api-actions';
import classNames from 'classnames';
import {useAppDispatch} from '../hooks';
import {useState} from 'react';
import {FavoriteButtonPageType, FavoriteIconSize} from '../../constants';

type TFavoriteButtonProps = {
  id: TOffer['id'];
  isActive: TOffer['isFavorite'];
  pageType: FavoriteButtonPageType;
}

function FavoriteButton({id, isActive, pageType}: TFavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFavoriteOffer, setIsFavoriteOffer] = useState<boolean>(isActive);
  const iconSize = pageType === FavoriteButtonPageType.Offer ? FavoriteIconSize.Large : FavoriteIconSize.Small;

  const handleFavoriteOfferClick = () => {
    const changedFavoriteStatus = Number(!isFavoriteOffer) as TFavoriteDataStatus['status'];
    setIsFavoriteOffer(!isFavoriteOffer);
    dispatch(changeFavorite({id, status: changedFavoriteStatus}));
  };

  return (
    <button className={classNames({
      'button': true,
      [`${pageType}__bookmark-button`]: true,
      [`${pageType}__bookmark-button--active`]: isFavoriteOffer,
    })}
    type="button"
    onClick={handleFavoriteOfferClick}
    >
      <svg className={classNames({
        [`${pageType}__bookmark-icon`]: true
      })} {...iconSize}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
