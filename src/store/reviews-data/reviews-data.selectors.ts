import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getReviews = (
  state: Pick<TAppState, NameSpace.Reviews>
): TInitialState['reviews'] =>
  state[NameSpace.Reviews].reviews;
export const getReviewsFetchingStatus = (
  state: Pick<TAppState, NameSpace.Reviews>
): TInitialState['fetchReviewsStatus'] =>
  state[NameSpace.Reviews].fetchReviewsStatus;
export const getReviewPostStatus = (
  state: Pick<TAppState, NameSpace.Reviews>
): TInitialState['postReviewStatus'] =>
  state[NameSpace.Reviews].postReviewStatus;
