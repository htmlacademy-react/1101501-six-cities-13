import {ChangeEvent, FormEvent, useState} from 'react';
import OfferRating from './OfferRating';
import {OfferReviewLimit} from '../../constants';

type TChangeEvent = ChangeEvent<HTMLTextAreaElement>
type TFormEvent = FormEvent<HTMLFormElement>

type TOfferReviewFormData = {
  rating: number;
  review: string;
}

function OfferReviewForm(): JSX.Element {
  const [formData, setFormData] = useState<TOfferReviewFormData>({
    rating: 0,
    review: ''
  });

  const isValidForm = ((formData.rating >= OfferReviewLimit.MinRating)
    && (OfferReviewLimit.ReviewMaxLength >= formData.review.length)
    && (OfferReviewLimit.ReviewMinLength <= formData.review.length)
  );

  const handleReviewChange = (evt: TChangeEvent) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleRatingChange = (rating: number) => {
    setFormData({...formData, rating});
  };

  const submitFormHandler = (evt: TFormEvent) => {
    evt.preventDefault();
    setFormData({...formData, rating: 0, review: ''});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitFormHandler}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <OfferRating initialValue={formData.rating} onRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
      />
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
