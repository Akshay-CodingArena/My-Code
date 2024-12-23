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
import { BOOKING_LEAD_LSQ_SUCCESS } from "../constants/productConstants";

export const booking =

  (
    createNewBooking,
    user_id,
    name,
    mobile,
    email,
    state,
    city,
    area,
    pincode,
    token,
    isDealer,
    isAdmin,
    url,
    model,
    booking_id,
    fetchData = false,
    source,
    add_comments
  ) =>
    async (dispatch, getState) => {
      dispatch({
        type: USER_BOOKING_REQUEST,
        payload: {
          name,
          mobile,
          email,
          state,
          city,
          area,
          pincode,
          token,
          isDealer,
          isAdmin,
          product_type: model,
          source,
          add_comments
        },
      });
      const {
        userSignin: { userInfo },
      } = getState();
      let outputj = {
        id: user_id,
        token: token,
        isAdmin: isAdmin,
        isSeller: isDealer,
        name: name,
        email: email,
        mobile: mobile,
        state: state,
        city: city,
        area: area,
        pincode: pincode,
        state_name: "",
        city_name: "",
        area_name: "",
        incentive: "",
        region: "",
        status: "1",
        coupon: "",
      };
      console.log(outputj);
      localStorage.setItem("bookinginfo", JSON.stringify(outputj));
      localStorage.setItem("shippingAddress", JSON.stringify(outputj));

      dispatch({ type: USER_BOOKING_SUCCESS, payload: outputj });

      try {
        let data;
        if (fetchData) {
          data = [
            {
              booking_id,
              createNewBooking,
            },
          ];
        } else {
          data = [
            {
              name: name,
              email: email,
              mobile: mobile,
              state: state,
              city: city,
              area: area,
              pincode: pincode,
              url: url,
              isSeller: isDealer === "Y" ? true : false,
              product_type: model,
              booking_id,
              createNewBooking,
              source,
              add_comments
            },
          ];
        }

        const res = await Axios.post(
          `${URL_API}/api/v1/common/lsq_booking_lead`,
          data
        );
        localStorage.setItem("bookingLeadDetails", JSON.stringify(res.data.data));
      } catch (error) {
        console.log(error);
      }
      // try {

      //   const {
      //     userSignin: { userInfo },
      //   } = getState();

      //   const { data } = await Axios.post(`${URL_API}/api/v1/customer/booking`, {
      //     name,
      //     mobile,
      //     email,
      //     state,
      //     city,
      //     area,
      //     token,
      //     isDealer

      //   });
      //  console.log(data);
      //   if(data.status == 'duplicate')
      //   {

      //     // localStorage.setItem('bookInfo', data))
      //     dispatch({
      //       type: USER_BOOKING_FAIL,
      //       payload:"User Already Registered"
      //     });
      //   }
      //   else{

      //   dispatch({ type: USER_BOOKING_SUCCESS, payload: data });

      //   if(userInfo?.isSeller){
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //   }
      //   else if(userInfo?.isAdmin){
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //   }
      //   else {
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('userInfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      //   }
      // }

      // } catch (error) {
      //   dispatch({
      //     type: USER_BOOKING_FAIL,
      //     payload:
      //       error.response && error.response.data.message
      //         ? error.response.data.message
      //         : error.message,
      //   });
      // }
    };

export const bookingSave =
  (
    createNewBooking,
    user_id,
    name,
    mobile,
    email,
    state,
    city,
    area,
    pincode,
    token,
    isDealer,
    isAdmin,
    url,
    model,
    color,
    booking_id,
    fetchData = false
  ) =>
    async (dispatch, getState) => {
      dispatch({
        type: USER_BOOKING_REQUEST,
        payload: {
          name,
          mobile,
          email,
          state,
          city,
          area,
          pincode,
          token,
          isDealer,
          isAdmin,
          product_type: model,
        },
      });
      const {
        userSignin: { userInfo },
      } = getState();
      console.log("colorrrrrrrrrrrr", color);
      let outputj = {
        id: user_id,
        token: token,
        isAdmin: isAdmin,
        isSeller: isDealer,
        name: name,
        email: email,
        mobile: mobile,
        state: state,
        city: city,
        area: area,
        bike_model: model,
        bike_color: color.color,
        pincode: pincode,
        state_name: "",
        city_name: "",
        area_name: "",
        incentive: "",
        region: "",
        status: "1",
        coupon: "",
      };
      console.log(outputj);
      localStorage.setItem("bookinginfo", JSON.stringify(outputj));
      localStorage.setItem("shippingAddress", JSON.stringify(outputj));

      dispatch({ type: USER_BOOKING_SUCCESS, payload: outputj });

      try {
        let data;
        if (fetchData) {
          data = [
            {
              booking_id,
              createNewBooking,
            },
          ];
        } else {
          data = {
            name: name,
            email: email,
            mobile: mobile,
            state: state,
            city: city,
            area: area,
            pincode: pincode,
            url: url,
            isSeller: isDealer === "Y" ? true : false,
            product_type: model,
            createNewBooking,
            bike_model: color.model_id,
            bike_color: color.color,
          };

          if (booking_id) {
            data["booking_id"] = booking_id;
          }
        }

        const res = await Axios.post(
          `${URL_API}/api/v1/customer/event/bookings`,
          data
        );
        localStorage.setItem("bookingLeadDetails", JSON.stringify(res.data.data));
        dispatch(BOOKING_LEAD_LSQ_SUCCESS, res.data.data);
      } catch (error) {
        console.log(error);
      }
      // try {

      //   const {
      //     userSignin: { userInfo },
      //   } = getState();

      //   const { data } = await Axios.post(`${URL_API}/api/v1/customer/booking`, {
      //     name,
      //     mobile,
      //     email,
      //     state,
      //     city,
      //     area,
      //     token,
      //     isDealer

      //   });
      //  console.log(data);
      //   if(data.status == 'duplicate')
      //   {

      //     // localStorage.setItem('bookInfo', data))
      //     dispatch({
      //       type: USER_BOOKING_FAIL,
      //       payload:"User Already Registered"
      //     });
      //   }
      //   else{

      //   dispatch({ type: USER_BOOKING_SUCCESS, payload: data });

      //   if(userInfo?.isSeller){
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //   }
      //   else if(userInfo?.isAdmin){
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //   }
      //   else {
      //     localStorage.setItem('bookinginfo', JSON.stringify(data));
      //     localStorage.setItem('userInfo', JSON.stringify(data));
      //     localStorage.setItem('shippingAddress', JSON.stringify(data));
      //     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      //   }
      // }

      // } catch (error) {
      //   dispatch({
      //     type: USER_BOOKING_FAIL,
      //     payload:
      //       error.response && error.response.data.message
      //         ? error.response.data.message
      //         : error.message,
      //   });
      // }
    };

// try {

//   const {
//     userSignin: { userInfo },
//   } = getState();

//   const { data } = await Axios.post(`${URL_API}/api/v1/customer/booking`, {
//     name,
//     mobile,
//     email,
//     state,
//     city,
//     area,
//     token,
//     isDealer

//   });
//  console.log(data);
//   if(data.status == 'duplicate')
//   {

//     // localStorage.setItem('bookInfo', data))
//     dispatch({
//       type: USER_BOOKING_FAIL,
//       payload:"User Already Registered"
//     });
//   }
//   else{

//   dispatch({ type: USER_BOOKING_SUCCESS, payload: data });

//   if(userInfo?.isSeller){
//     localStorage.setItem('bookinginfo', JSON.stringify(data));
//     localStorage.setItem('shippingAddress', JSON.stringify(data));
//   }
//   else if(userInfo?.isAdmin){
//     localStorage.setItem('bookinginfo', JSON.stringify(data));
//     localStorage.setItem('shippingAddress', JSON.stringify(data));
//   }
//   else {
//     localStorage.setItem('bookinginfo', JSON.stringify(data));
//     localStorage.setItem('userInfo', JSON.stringify(data));
//     localStorage.setItem('shippingAddress', JSON.stringify(data));
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//   }
// }

// } catch (error) {
//   dispatch({
//     type: USER_BOOKING_FAIL,
//     payload:
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//   });
// }

export const upgrade =
  (
    user_id,
    name,
    mobile,
    email,
    chassis,
    state,
    city,
    area,
    token,
    isDealer,
    isAdmin
  ) =>
    async (dispatch, getState) => {
      dispatch({
        type: USER_UPGRADE_REQUEST,
        payload: {
          name,
          mobile,
          email,
          chassis,
          state,
          city,
          area,
          token,
          isDealer,
          isAdmin,
        },
      });
      const {
        userSignin: { userInfo },
      } = getState();
      let outputj = {
        id: user_id,
        token: token,
        isAdmin: isAdmin,
        isSeller: isDealer,
        name: name,
        email: email,
        chassis: chassis,
        mobile: mobile,
        state: state,
        city: city,
        area: area,
        state_name: "",
        city_name: "",
        area_name: "",
        incentive: "",
        region: "",
        status: "1",
        coupon: "",
      };
      console.log(outputj);
      localStorage.setItem("upgrade", JSON.stringify(outputj));
      // localStorage.setItem('shippingAddress', JSON.stringify(outputj));

      dispatch({ type: USER_UPGRADE_SUCCESS, payload: outputj });
    };

export const register =
  (name, mobile, email, state, city, area, password) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, mobile, email, state, area, password },
    });
    try {
      const { data } = await Axios.post(`${URL_API}/api/v1/customer/register`, {
        name,
        mobile,
        email,
        state,
        city,
        area,
        password,
      });
      console.log(data);

      const listData = JSON.parse(localStorage.getItem("state_city_hub"));
      if (data.status == "duplicate") {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: "User Already Registered",
        });
      } else {
        ///clevertap start
        clevertap.onUserLogin.push({
          Site: {
            Name: name,
            Identity: mobile,
            Email: email,
            Phone: "+91" + mobile,
          },
        });

        clevertap.event.push("Registered", {
          Name: name,
          Mobile: mobile,
          Email: email,
          City: listData.city.filter((value, index) => value.city_id == city)[0]
            .city_name,
          State: listData.state.filter(
            (value, index) => value.state_id == state
          )[0].state_name,
          "Device Name": getOS(),
          "Browser Type": getBrowser(),
          Date: new Date(),
        });
        ///clevertap end

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        //console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("shippingAddress", JSON.stringify(data));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (mobile, password, otp) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { mobile, password } });
  try {
    const { data } = await Axios.post(`${URL_API}/api/v1/auth/signin`, {
      mobile,
      password,
      otp,
    });

    //console.log(data);
    if (data.token != null && data.token != "") {
      clevertap.onUserLogin.push({
        Site: {
          Name: mobile,
          Identity: mobile,
          Name: data.name,
          Phone: "+91" + data.mobile,
          Email: data.email,
          Identity: data.mobile,
        },
      });

      clevertap.event.push("Signed in", {
        "Mobile Number": "+91" + data.mobile,
        LoginType: data.user_type,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

      localStorage.setItem("shippingAddress", JSON.stringify(data));

      let response = await Axios.request({
        baseURL: "https://apix.revoltmotors.com",
        headers: { "Content-Type": "application/json" },
        url: "/api/v1/chatbot/addChatUser",
        method: "POST",
        data:
        {
          mobile: JSON.parse(localStorage.getItem("userInfo")).mobile,
          isLoggedinUser: true
        },
      });
      if (response.data.success) {
        localStorage.setItem("chatId", response.data.chatId);
      }
    } else {
      dispatch({
        type: USER_SIGNIN_FAIL,
        // payload:'Authentication Error'
        payload: "Password Entered is incorrect, please check and retry again.",
      });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("shippingAdd");
  localStorage.removeItem("order_details");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/signin";
};
export const bookingout = () => (dispatch) => {
  dispatch({ bookingInfo: {} });
};
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`${URL_API}/api/v1/customer/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/profile`,
      user,
      {
        headers: { Authorization: userInfo.token },
      }
    );
    if (data.status == true) {
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${URL_API}/api/v1/users/${user._id}`,
      user,
      {
        headers: { Authorization: userInfo.token },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`${URL_API}/api/v1/users`, {
      headers: {
        Authorization: userInfo.token,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`${URL_API}/api/v1/users/${userId}`, {
      headers: { Authorization: userInfo.token },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`${URL_API}/api/v1/auth/top_sellers`);
    //Axios.get('/api/v1/users/top-sellers');
    //console.log(data.data);
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};

export const getstatelist = () => async (dispatch) => {
  dispatch({ type: USER_STATE_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`${URL_API}/api/v1/common/getstatelist`);

    console.log(data.data);
    dispatch({ type: USER_STATE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_STATE_LIST_FAIL, payload: message });
  }
};

export const getcitylist = (state_id) => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await Axios.post("/api/v1/common/getcitylist");

    console.log(data.data);
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};