import {
  FETCH_FEEDBACK_REQUEST,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_FAILURE,
} from "../constants/feedbackConstants";

const initialState = {
  data: [],
  loading: false,
  error: null,
  totalPages: 0,
  totalCount: 0,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    case FETCH_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
