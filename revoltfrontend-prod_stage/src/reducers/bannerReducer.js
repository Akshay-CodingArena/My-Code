import { SUCCESS, PENDING, FAILED } from "../constants/bannerConstants";

export const bannerReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        loading: false,
      };
    case FAILED:
      return {
        loading: false,
      };
    case PENDING:
      return {
        loading: true,
      };
    default:
      return state;
  }
};
