import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import OfferRating from './offer-rating';
import {OfferReviewLimit} from '../../constants';
import {TReviewData} from '../../types/review';
import {TOfferFull} from '../../types/offerFull';
import {postReview} from '../../store/api-actions';
import {useAppDispatch} from '../hooks';
import styles from './offer-review-form.module.css';

type TChangeEvent = ChangeEvent<HTMLTextAreaElement>
type TFormEvent = FormEvent<HTMLFormElement>

type TOfferReviewFormProps = {
  offerId: TOfferFull['id'];
}

function OfferReviewForm({ offerId }: TOfferReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isRejectedSent, setIsRejectedSent] = useState<boolean>(false);
  const [reviewValue, setReviewValue] = useState<TReviewData['comment']>('');
  const [ratingValue, setRatingValue] = useState<TReviewData['rating']>(0);
  /*const [reviewData, setReviewData] = useState<TReviewData>({
    rating: 0,
    comment: ''
  });*/

  const isValidForm = ((ratingValue >= OfferReviewLimit.MinRating)
    && (OfferReviewLimit.ReviewMaxLength >= reviewValue.length)
    && (OfferReviewLimit.ReviewMinLength <= reviewValue.length)
  );

  const handleReviewChange = (evt: TChangeEvent) => {
    const {value} = evt.target;

    setReviewValue(value);
    if (isRejectedSent) {
      setIsRejectedSent(!isRejectedSent);
    }
  };

  const handleRatingChange = useCallback((rating: number) => {
    setRatingValue(rating);
  }, []);

  const handleFormSubmit = (evt: TFormEvent) => {
    evt.preventDefault();
    const reviewData = {rating: ratingValue, comment: reviewValue};
    dispatch(postReview({offerId: offerId, reviewData}))
      .then((response) => {
        if (response.error) {
          setIsRejectedSent(!isRejectedSent);
        }

        setReviewValue('');
        setRatingValue(0);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <OfferRating initialValue={ratingValue} onRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewValue}
        onChange={handleReviewChange}
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
          disabled={!isValidForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
