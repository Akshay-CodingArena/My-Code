import {
  VENDOR_DETAILS_FAILED,
  VENDOR_DETAILS_REQUESTED,
  VENDOR_DETAILS_SUCCESS,
} from "../constants/vendorConstants";

export const vendorReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case VENDOR_DETAILS_REQUESTED:
      return { loading: true };
    case VENDOR_DETAILS_SUCCESS:
      return { loading: false, company: action.payload };
    case VENDOR_DETAILS_FAILED:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
};
