import { FAILED, PENDING, SUCCESS } from "../constants/bannerConstants";

export const bannerSuccess = () => {
  return {
    type: SUCCESS,
  };
};

export const bannerFailure = () => {
  return {
    type: FAILED,
  };
};

export const bannerPending = () => {
  return {
    type: PENDING,
  };
};
