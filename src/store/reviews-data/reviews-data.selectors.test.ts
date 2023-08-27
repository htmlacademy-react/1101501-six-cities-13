import {describe, expect, it} from 'vitest';
import {NameSpace, RequestStatus} from '../../constants';
import {mockReviews} from '../../utils/mocks';
import {getReviewPostStatus, getReviews, getReviewsFetchingStatus} from './reviews-data.selectors';

describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.Reviews]: {
      reviews: mockReviews,
      fetchReviewsStatus: RequestStatus.Pending,
      postReviewStatus: RequestStatus.Pending
    }
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return reviews loading status from state', () => {
    const { fetchReviewsStatus } = state[NameSpace.Reviews];
    const result = getReviewsFetchingStatus(state);
    expect(result).toBe(fetchReviewsStatus);
  });

  it('should return review sent status from state', () => {
    const { postReviewStatus } = state[NameSpace.Reviews];
    const result = getReviewPostStatus(state);
    expect(result).toBe(postReviewStatus);
  });
});
