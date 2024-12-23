import { axios as Axios } from "../utilities/axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_BOOKING_FAIL,
  USER_BOOKING_REQUEST,
  USER_BOOKING_SUCCESS,
  USER_UPGRADE_FAIL,
  USER_UPGRADE_REQUEST,
  USER_UPGRADE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
  USER_STATE_LIST_REQUEST,
  USER_STATE_LIST_SUCCESS,
  USER_STATE_LIST_FAIL,
} from "../constants/userConstants";
import { URL_API } from "../constants/cartConstants";
import clevertap from "clevertap-web-sdk";
import { getOS } from "../constants/getDevice";
import { getBrowser } from "../constants/getBrowser";
import {
  VENDOR_DETAILS_FAILED,
  VENDOR_DETAILS_REQUESTED,
  VENDOR_DETAILS_SUCCESS,
} from "../constants/vendorConstants";

export const getCompanyNames = () => async (dispatch, getState) => {
  dispatch({
    type: VENDOR_DETAILS_REQUESTED,
  });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/vendor/details`,
    );
    // localStorage.setItem("cartItems", JSON.stringify(data.data));
    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
