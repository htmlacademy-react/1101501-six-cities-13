import {calculateRatingInWidthPercent, getFormatDate} from '../../utils/utils';
import {MAX_REVIEWS_COUNT, RequestStatus} from '../../constants';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useEffect} from 'react';
import {fetchReviews} from '../../store/api-actions';
import {TOfferFull} from '../../types/offerFull';
import Spinner from '../loading/spinner';

type TOfferReviewsProps = {
  offerId: TOfferFull['id'];
}

function OfferReviews({ offerId }: TOfferReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);
  const reviewsFetchingStatus = useAppSelector((state) => state.fetchReviewsStatus);
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const reviewsToRender = sortedReviews.slice(0, MAX_REVIEWS_COUNT);

  useEffect(() => {
    dispatch(fetchReviews(offerId));
  }, [dispatch, offerId]);

  if (reviewsFetchingStatus === RequestStatus.Pending) {
    return (
      <Spinner />
    );
  }

  if (reviewsFetchingStatus === RequestStatus.Rejected) {
    return;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewsToRender.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <li key={review.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={review.user.avatarUrl}
                  width={54}
                  height={54}
                  alt={review.user.name}
                />
              </div>
              <span className="reviews__user-name">{review.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: calculateRatingInWidthPercent(review.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime={review.date}>
                {getFormatDate(review.date)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OfferReviews;
