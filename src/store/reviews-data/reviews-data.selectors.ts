import {TAppState, TInitialState} from '../../types/state';
import {NameSpace} from '../../constants';

export const getReviews = (state: TAppState): TInitialState['reviews'] => state[NameSpace.Reviews].reviews;
export const getReviewsFetchingStatus = (state: TAppState): TInitialState['fetchReviewsStatus'] =>
  state[NameSpace.Reviews].fetchReviewsStatus;
