import { axios as Axios } from "../utilities/axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  STATE_CITY_HUB_REQUEST,
  STATE_CITY_HUB_SUCCESS,
  STATE_CITY_HUB_FAIL,
  STATE_CITY_HUB_UPGRADE_REQUEST,
  STATE_CITY_HUB_UPGRADE_SUCCESS,
  STATE_CITY_HUB_UPGRADE_FAIL,
  STATE_CITY_HUB_SC_REQUEST,
  STATE_CITY_HUB_SC_SUCCESS,
  STATE_CITY_HUB_SC_FAIL,
  BOOKING_LEAD_LSQ_SUCCESS,
  BOOKING_LEAD_LSQ_FAILED,
  BOOKING_LEAD_LSQ_REQUEST,
  ALL_PRODUCT_DETAILS_SUCCESS,
  ALL_PRODUCT_DETAILS_FAIL,
  ALL_PRODUCT_DETAILS_REQUEST,
} from "../constants/productConstants";
import { URL_API } from "../constants/cartConstants";

export const listProducts =
  ({
    pageNumber = "",
    //dealer = '',
    name = "",
    category = "",
    order = "",
    // min = 0,
    // max = 0,
    //rating = 0,
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products?pageNumber=${pageNumber}&name=${name}&category=${category}&order=${order}`,
      );
      localStorage.setItem(
        "bikePrice",
        data?.productPlan?.ex_price + data?.productPlan?.charger,
      );
      // localStorage.setItem("bikePrice",data?.productOffer[0]?.revisedPrice)
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${URL_API}/api/v1/products/categories`);

    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listStateCityHub = () => async (dispatch) => {
  dispatch({
    type: STATE_CITY_HUB_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/common/getallstatelist`,
    );
    localStorage.setItem("state_city_hub", JSON.stringify(data.data));
    let updated_date = new Date();
    localStorage.setItem("updated_date", updated_date);

    dispatch({ type: STATE_CITY_HUB_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: STATE_CITY_HUB_FAIL, payload: error.message });
  }
};

export const listStateCityHub_upgrade = () => async (dispatch) => {
  dispatch({
    type: STATE_CITY_HUB_UPGRADE_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/common/getallstatelist_upgrade`,
    );
    localStorage.setItem("state_city_hub_upgrade", JSON.stringify(data.data));
    dispatch({ type: STATE_CITY_HUB_UPGRADE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: STATE_CITY_HUB_UPGRADE_FAIL, payload: error.message });
  }
};
export const listStateCityHub_SC = () => async (dispatch) => {
  dispatch({
    type: STATE_CITY_HUB_SC_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/common/getservicecenter`,
    );

    dispatch({ type: STATE_CITY_HUB_SC_SUCCESS, payload: data.data });
    localStorage.setItem("state_city_hub_SC", JSON.stringify(data.data));
  } catch (error) {
    dispatch({ type: STATE_CITY_HUB_SC_FAIL, payload: error.message });
  }
};
export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`${URL_API}/api/v1/products/${productId}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });

    localStorage.setItem("cartItems", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsProductAll = () => async (dispatch) => {
  dispatch({ type: ALL_PRODUCT_DETAILS_REQUEST, payload: "" });
  try {
    console.log("req");
    const { data } = await Axios.get(`${URL_API}/api/v1/products`);
    console.log("response received", data);
    dispatch({ type: ALL_PRODUCT_DETAILS_SUCCESS, payload: data.data });

    // localStorage.setItem("cartItems", JSON.stringify(data.data));
  } catch (error) {
    console.log("Got error", error);
    dispatch({
      type: ALL_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong",
    });
  }
};

export const productBycolor =
  (productId, modelColor, selectedPlan, booking_info) =>
  async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
      payload: {
        productId,
        modelColor,
        selectedPlan,
        booking_info,
      },
    });

    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/products/${productId}/${modelColor}`,
        {
          productId,
          modelColor,
       //   selectedPlan,
          booking_info,
          headers: { Authorization: process.env.REACT_APP_API_KEY },
        },
      );
      localStorage.setItem("cartItems", JSON.stringify(data.data));
      localStorage.setItem("colorInfo", JSON.stringify(data.data.product[0]));
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post("/api/products", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };


export const bookingLeadlsq = (payload) => async (dispatch, getState) => {
  // dispatch({ type: BOOKING_LEAD_LSQ_REQUEST });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    const { data } = await Axios.post(
      `${URL_API}/api/v1/common/lsq_booking_lead_update`,
      payload,
    );
    dispatch({
      type: BOOKING_LEAD_LSQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_LEAD_LSQ_FAILED, payload: message });
  }
};

export const bookingUpdateCash = (data) => async (dispatch, getState) => {
  // dispatch({ type: BOOKING_LEAD_LSQ_REQUEST });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    const res = await Axios.post(
      `${URL_API}/api/v1/customer/event/bookings`,
      data,
    );
    dispatch({
      type: BOOKING_LEAD_LSQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_LEAD_LSQ_FAILED, payload: message });
  }
};