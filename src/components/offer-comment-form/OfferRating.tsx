import React, {ChangeEvent} from 'react';
import {OFFER_COMMENT_RATINGS} from '../../constants';

type TChangeEvent = ChangeEvent<HTMLInputElement>

type TOfferRatingProps = {
  onRatingChange: (ratingValue: number) => void;
  initialValue: number;
}

function OfferRating({ initialValue, onRatingChange }: TOfferRatingProps): JSX.Element {
  const ratings = [...OFFER_COMMENT_RATINGS].sort((a,b) => b.ratingValue - a.ratingValue);
  const changeRatingHandler = (evt: TChangeEvent) => {
    const ratingValue = Number(evt.target.value);
    onRatingChange(ratingValue);
  };

  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map((rating) => {
        const {ratingValue, ratingText} = rating;
        const generateIdValue = `${ratingValue}-${ratingValue > 1 ? 'stars' : 'star'}`;

        return (
          <React.Fragment key={ratingValue}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingValue}
              id={generateIdValue}
              type="radio"
              onChange={changeRatingHandler}
              checked={initialValue === ratingValue}
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

export default OfferRating;
