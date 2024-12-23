import { axios as Axios } from "../utilities/axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_UPGRADE_FAIL,
  ORDER_UPGRADE_REQUEST,
  ORDER_UPGRADE_SUCCESS,
  UPGRADE_ORDER_DETAILS_FAIL,
  UPGRADE_ORDER_DETAILS_REQUEST,
  UPGRADE_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_DETAILS_FAIL,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_UPGRADE_ORDER_DETAILS_FAIL,
  ADMIN_UPGRADE_ORDER_DETAILS_REQUEST,
  ADMIN_UPGRADE_ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  UPGRADE_ORDER_PAY_REQUEST,
  UPGRADE_ORDER_PAY_FAIL,
  UPGRADE_ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  UPGRADE_ORDER_LIST_FAIL,
  UPGRADE_ORDER_LIST_REQUEST,
  UPGRADE_ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  NOTIFY_LIST_REQUEST,
  NOTIFY_LIST_SUCCESS,
  NOTIFY_LIST_FAIL,
  TESTRIDE_LIST_REQUEST,
  TESTRIDE_LIST_SUCCESS,
  TESTRIDE_LIST_FAIL,
  ADMIN_TESTRIDE_DETAILS_FAIL,
  ADMIN_TESTRIDE_DETAILS_REQUEST,
  ADMIN_TESTRIDE_DETAILS_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import clevertap from "clevertap-web-sdk";

export const createOrder = (order) => async (dispatch, getState) => {
  let entry = order.orderItems.subscription[0];
  let bookingInfo = JSON.parse(order.bookingInfo_info);

  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    console.log(order);
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/orders`,
      {...order, mobile: JSON.parse(localStorage.getItem("bookinginfo")).mobile},
      {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
          Origin: window.location.origin,
        },
      },
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data });
    dispatch({ type: CART_EMPTY });

    localStorage.setItem("orderdetails", JSON.stringify(data));
    // localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//
export const casheOrder = (order) => async (dispatch, getState) => {
  let entry = order.orderItems.subscription[0];
  let bookingInfo = JSON.parse(order.bookingInfo_info);

  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    console.log(order);
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/orders`,
      {...order,
              mobile: JSON.parse(localStorage.getItem("bookinginfo")).mobile
            },
      {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      },
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data });
    dispatch({ type: CART_EMPTY });

    localStorage.setItem("orderdetails", JSON.stringify(data));
    // localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// /

//upgrade start
export const createUpgradeOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPGRADE_REQUEST, payload: order });
  try {
    console.log(order);
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/upgradeorders`,
      order,
      {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      },
    );

    dispatch({ type: ORDER_UPGRADE_SUCCESS, payload: data.data });
    // dispatch({ type: CART_EMPTY });

    localStorage.setItem("upgradeorderdetails", JSON.stringify(data));
    // localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_UPGRADE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const upgradeorderdetail = (orderId) => async (dispatch, getState) => {
  dispatch({ type: UPGRADE_ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/upgradeorderdetail/${orderId}`,
      {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    );
    // console.log(data.data);
    dispatch({ type: UPGRADE_ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPGRADE_ORDER_DETAILS_FAIL, payload: message });
  }
};
//upgrade end

export const adminUpgradeOrderDetails =
  (orderId) => async (dispatch, getState) => {
    dispatch({ type: ADMIN_UPGRADE_ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/upgradeadminorders/${orderId}`,
        {
          headers: { Authorization: `${userInfo.token}` },
        },
      );
      // console.log(data.data);
      dispatch({
        type: ADMIN_UPGRADE_ORDER_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADMIN_UPGRADE_ORDER_DETAILS_FAIL, payload: message });
    }
  };

export const adminOrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/adminorders/${orderId}`,
      {
        headers: { Authorization: `${userInfo.token}` },
      },
    );
    // console.log(data.data);
    dispatch({ type: ADMIN_ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADMIN_ORDER_DETAILS_FAIL, payload: message });
  }
};

export const adminTestrideDetail = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_TESTRIDE_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/admintestride/${orderId}`,
      {
        headers: { Authorization: `${userInfo.token}` },
      },
    );
    // console.log(data.data);
    dispatch({ type: ADMIN_TESTRIDE_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADMIN_TESTRIDE_DETAILS_FAIL, payload: message });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/orders/${orderId}`,
      {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    );
    // console.log(data.data);
    localStorage.setItem(
      "orderdetails",
      JSON.stringify({
        data: { booking_id: data.data.booking_ref_id, orderData: data.data },
      }),
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const detailsOrderEncrypted =
  (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/orderid/${orderId}`,
        {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      );
      // console.log(data.data);
      localStorage.setItem(
        "orderdetails",
        JSON.stringify({
          data: { booking_id: data.data.booking_ref_id, orderData: data.data },
        }),
      );
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
  };

export const orderdetail = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/orderdetail/${orderId}`,
      {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    );
    // console.log(data.data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const upgradeorderPay =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: UPGRADE_ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      // const { data } = Axios.put(`${URL_API}/api/v1/customer/upgradeorders/${order.id}/pay`, paymentResult, {
      const { data } = Axios.put(
        `${URL_API}/api/v1/customer/upgradeorderdetail/${order.id}`,
        paymentResult,
        {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      );
      dispatch({ type: UPGRADE_ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: UPGRADE_ORDER_PAY_FAIL, payload: message });
    }
  };

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `${URL_API}/api/v1/customer/orders/${order.id}/pay`,
        paymentResult,
        {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

export const listOrderMine = (customerId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/orders/mine/${customerId}`,
      {
        headers: {
          Authorization: userInfo.token,
        },
      },
    );
    console.log(data.data);
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const upgradelistOrders =
  (
    user_id,
    mobile,
    selectfromdate,
    selecttodate,
    selectedState,
    selectedCity,
    selectedHub,
    paystatus,
    user_type,
    isDealer,
    isAdmin,
    isFinanceTeam,
    orderChangeStatus,
    orderCreatedBY,
    searchText,
    utm,
  ) =>
  async (dispatch, getState) => {
    dispatch({ type: UPGRADE_ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/upgradeorderlist`,
        {
          user_id,
          mobile,
          selectfromdate,
          selecttodate,
          selectedState,
          selectedCity,
          selectedHub,
          paystatus,
          user_type,
          isDealer,
          isAdmin,
          isFinanceTeam,
          orderChangeStatus,
          orderCreatedBY,
          searchText,
          utm,
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );
      console.log(data);
      dispatch({ type: UPGRADE_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

export const listOrders =
  (
    user_id,
    mobile,
    selectfromdate,
    selecttodate,
    selectedState,
    selectedCity,
    selectedHub,
    paystatus,
    schemestatus,
    user_type,
    isDealer,
    isAdmin,
    isFinanceTeam,
    orderChangeStatus,
    orderCreatedBY,
    searchText,
    utm,
    payby,
  ) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/orderlist`,
        {
          user_id,
          mobile,
          selectfromdate,
          selecttodate,
          selectedState,
          selectedCity,
          selectedHub,
          paystatus,
          schemeStatus: schemestatus,
          user_type,
          isDealer,
          isAdmin,
          isFinanceTeam,
          product_type: orderChangeStatus,
          orderCreatedBY,
          searchText,
          utm,
          payby,
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );
      console.log(data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

export const listNotify =
  (
    user_id,
    selectfromdate,
    selecttodate,
    selectedState,
    selectedCity,
    selectedHub,
  ) =>
  async (dispatch, getState) => {
    dispatch({ type: NOTIFY_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/notifylist`,
        {
          user_id,
          selectfromdate,
          selecttodate,
          selectedState,
          selectedCity,
          selectedHub,
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );

      dispatch({ type: NOTIFY_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTIFY_LIST_FAIL, payload: message });
    }
  };

export const listTestrides =
  (
    user_id,
    selectfromdate,
    selecttodate,
    selectedState,
    selectedCity,
    selectedHub,
    isDealer,
    isAdmin,
    bike_model
  ) =>
  async (dispatch, getState) => {
    dispatch({ type: TESTRIDE_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/testridelist`,
        {
          user_id,
          selectfromdate,
          selecttodate,
          selectedState,
          selectedCity,
          selectedHub,
          isDealer,
          isAdmin,
          bike_model
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );

      dispatch({ type: TESTRIDE_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TESTRIDE_LIST_FAIL, payload: message });
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(
      `${URL_API}/api/v1/customer/orders/${orderId}`,
      {
        headers: { Authorization: userInfo.token },
      },
    );
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `${URL_API}/api/v1/customer/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: userInfo.token },
      },
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/customer/orders/summary`,
      {
        headers: { Authorization: userInfo.token },
      },
    );
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCotacts =
  (user_id, selectfromdate, selecttodate, selectedState, selectedCity) =>
  async (dispatch, getState) => {
    dispatch({ type: CONTACT_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/contactlist`,
        { user_id, selectfromdate, selecttodate, selectedState, selectedCity },
        {
          headers: { Authorization: userInfo.token },
        },
      );

      dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_LIST_FAIL, payload: message });
    }
  };

export const order_status_update =
  (
    order_id,
    booking_ref_id,
    user_id,
    user_type,
    orderStatus,
    orderChangeStatus,
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADMIN_TESTRIDE_DETAILS_REQUEST,
      payload: {
        order_id,
        booking_ref_id,
        user_id,
        user_type,
        orderStatus,
        orderChangeStatus,
      },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/orderstatusupdate`,
        {
          order_id,
          booking_ref_id,
          user_id,
          user_type,
          orderStatus,
          orderChangeStatus,
        },
        {
          headers: { Authorization: `${userInfo.token}` },
        },
      );
      console.log(data.data);
      dispatch({ type: ADMIN_TESTRIDE_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADMIN_TESTRIDE_DETAILS_FAIL, payload: message });
    }
  };

export const CallerOrderDetails =
  (searchText, searchSetType, page) => async (dispatch, getState) => {
    dispatch({
      type: ADMIN_ORDER_DETAILS_REQUEST,
      payload: { searchText, searchSetType, page },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      console.log(page);
      const url =
        page == "booking"
          ? `${URL_API}/api/v1/customer/callerorder`
          : `${URL_API}/api/v1/customer/upgradecallerorder`;

      console.log(url);
      const { data } = await Axios.post(
        url,
        { searchText, searchSetType },
        {
          headers: { Authorization: `${userInfo.token}` },
        },
      );
      // console.log(data.data);
      dispatch({ type: ADMIN_ORDER_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADMIN_ORDER_DETAILS_FAIL, payload: message });
    }
  };

export const CallerbookingDetails =
  (searchText, searchSetType, page) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_LIST_REQUEST,
      payload: { searchText, searchSetType, page },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      console.log(page);
      const url =
        page == "booking"
          ? `${URL_API}/api/v1/customer/callerorder`
          : `${URL_API}/api/v1/customer/upgradecallerorder`;

      console.log(url);
      const { data } = await Axios.post(
        url,
        { searchText, searchSetType },
        {
          headers: { Authorization: `${userInfo.token}` },
        },
      );
      // console.log(data.data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };
