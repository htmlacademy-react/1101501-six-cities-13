import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import OfferRating from './offer-rating';
import {OfferReviewLimit, RequestStatus} from '../../constants';
import {TReviewData} from '../../types/review';
import {TOfferFull} from '../../types/offerFull';
import {postReview} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../hooks';
import styles from './offer-review-form.module.css';
import {getReviewPostStatus} from '../../store/reviews-data/reviews-data.selectors';
import {resetPostStatus} from '../../store/reviews-data/reviews-data.slice';

type TChangeEvent = ChangeEvent<HTMLTextAreaElement>
type TFormEvent = FormEvent<HTMLFormElement>

type TOfferReviewFormProps = {
  offerId: TOfferFull['id'];
}

function OfferReviewForm({ offerId }: TOfferReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviewPostStatus = useAppSelector(getReviewPostStatus);
  const isRejectedSent = reviewPostStatus === RequestStatus.Rejected;
  const [reviewValue, setReviewValue] = useState<TReviewData['comment']>('');
  const isAwaitingSentReview = reviewPostStatus === RequestStatus.Pending;
  const [ratingValue, setRatingValue] = useState<TReviewData['rating']>(0);

  const isValidForm = ((ratingValue >= OfferReviewLimit.MinRating)
    && (OfferReviewLimit.ReviewMaxLength >= reviewValue.length)
    && (OfferReviewLimit.ReviewMinLength <= reviewValue.length)
  );

  const handleReviewChange = (evt: TChangeEvent) => {
    const {value} = evt.target;

    setReviewValue(value);
    if (reviewPostStatus === RequestStatus.Success || reviewPostStatus === RequestStatus.Rejected) {
      dispatch(resetPostStatus());
    }
  };

  const handleRatingChange = useCallback((rating: number) => {
    setRatingValue(rating);
  }, []);

  const handleFormSubmit = (evt: TFormEvent) => {
    evt.preventDefault();
    const reviewData = {rating: ratingValue, comment: reviewValue};
    dispatch(postReview({offerId: offerId, reviewData}));
  };

  useEffect(() => {
    if (reviewPostStatus === RequestStatus.Success) {
      setReviewValue('');
      setRatingValue(0);
    }
  }, [reviewPostStatus]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <OfferRating isAwaitingSentReview={isAwaitingSentReview} initialValue={ratingValue} onRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewValue}
        onChange={handleReviewChange}
        disabled={isAwaitingSentReview}
      />
      {isRejectedSent && <p className={styles.error}>Failed submit form. Please, try again :(</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isAwaitingSentReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
