import React, {ChangeEvent, memo} from 'react';
import {OFFER_REVIEW_RATINGS} from '../../constants';

type TChangeEvent = ChangeEvent<HTMLInputElement>

type TOfferRatingProps = {
  onRatingChange: (ratingValue: number) => void;
  initialValue: number;
  isAwaitingSentReview: boolean;
}

function OfferRating({ initialValue, onRatingChange, isAwaitingSentReview }: TOfferRatingProps): JSX.Element {
  const ratings = [...OFFER_REVIEW_RATINGS].sort((a, b) => b.ratingValue - a.ratingValue);

  const handleRatingChange = (evt: TChangeEvent) => {
    const ratingValue = Number(evt.target.value);
    onRatingChange(ratingValue);
  };

  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map((rating) => {
        const {ratingValue, ratingText} = rating;
        const generateIdValue = `${ratingValue}-stars`;

        return (
          <React.Fragment key={ratingValue}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingValue}
              id={generateIdValue}
              type="radio"
              onChange={handleRatingChange}
              checked={initialValue === ratingValue}
              disabled={isAwaitingSentReview}
            />
            <label
              htmlFor={generateIdValue}
              className="reviews__rating-label form__rating-label"
              title={ratingText}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default memo(OfferRating);
