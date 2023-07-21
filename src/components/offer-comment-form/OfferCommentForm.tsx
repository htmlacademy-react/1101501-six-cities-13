import {ChangeEvent, FormEvent, useState} from 'react';
import OfferRating from './OfferRating';
import {OfferCommentLimit} from '../../constants';

type TChangeEvent = ChangeEvent<HTMLTextAreaElement>
type TFormEvent = FormEvent<HTMLFormElement>

type TOfferCommentFormData = {
  rating: number;
  review: string;
}

function OfferCommentForm(): JSX.Element {
  const [formData, setFormData] = useState<TOfferCommentFormData>({
    rating: 0,
    review: ''
  });

  const isValidForm = ((formData.rating >= OfferCommentLimit.MinRating)
    && (OfferCommentLimit.CommentMaxLength >= formData.review.length)
    && (OfferCommentLimit.CommentMinLength <= formData.review.length)
  );

  const changeCommentHandler = (evt: TChangeEvent) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const changeRatingHandler = (rating: number) => {
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
      <OfferRating onRatingChange={changeRatingHandler} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={changeCommentHandler}
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

export default OfferCommentForm;
