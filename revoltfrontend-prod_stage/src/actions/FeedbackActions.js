import {
  FETCH_FEEDBACK_REQUEST,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_FAILURE,
} from "../constants/feedbackConstants";

export const fetchFeedbackRequest = () => ({
  type: FETCH_FEEDBACK_REQUEST,
});
export const fetchFeedbackSuccess = (data) => ({
  type: FETCH_FEEDBACK_SUCCESS,
  payload: data,
});
export const fetchFeedbackFailure = (error) => ({
  type: FETCH_FEEDBACK_FAILURE,
  payload: error,
});
