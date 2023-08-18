import {ChangeEvent, FormEvent, useState} from 'react';
import OfferRating from './OfferRating';
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
  const [isRejectedSent, setisRejectedSent] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<TReviewData>({
    rating: 0,
    comment: ''
  });

  const isValidForm = ((reviewData.rating >= OfferReviewLimit.MinRating)
    && (OfferReviewLimit.ReviewMaxLength >= reviewData.comment.length)
    && (OfferReviewLimit.ReviewMinLength <= reviewData.comment.length)
  );

  const handleReviewChange = (evt: TChangeEvent) => {
    const {value} = evt.target;

    setReviewData({...reviewData, comment: value});
    if (isRejectedSent) {
      setisRejectedSent(!isRejectedSent);
    }
  };

  const handleRatingChange = (rating: number) => {
    setReviewData({...reviewData, rating});
  };

  const submitFormHandler = (evt: TFormEvent) => {
    evt.preventDefault();
    dispatch(postReview({offerId: offerId, reviewData}))
      .then((response) => {
        if (response.error) {
          setisRejectedSent(!isRejectedSent);
        }

        setReviewData({...reviewData, rating: 0, comment: ''});
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitFormHandler}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <OfferRating initialValue={reviewData.rating} onRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.comment}
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
