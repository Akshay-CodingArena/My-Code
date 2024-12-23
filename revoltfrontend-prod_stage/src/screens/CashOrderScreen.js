import Axios from "axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deliverOrder, orderdetail, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import clevertap from "clevertap-web-sdk";
import OtpTimer from "otp-timer";
import ApiService from "../apiService/apiService";

export default function CashOrderScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, setLoading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const shippingAddress = localStorage.getItem("shippingAddress");
  const shippingAddress_myArr = JSON.parse(shippingAddress);

  const [mobile, setMobile] = useState(
    shippingAddress_myArr?.mobile ? shippingAddress_myArr?.mobile : "",
  );
  const [email, setEmail] = useState(
    shippingAddress_myArr?.email ? shippingAddress_myArr?.email : "",
  );
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);

  async function loadRazorpay(order) {
    console.log(JSON.stringify(order));
    //
    let entry = JSON.parse(localStorage.getItem("cartItems"))?.subscription[0];
    let orderDetails = JSON.parse(localStorage.getItem("orderdetails"));
    let bookingDetails = JSON.parse(localStorage.getItem("bookinginfo"));
    console.log({
      "Model Name": entry.product_type,
      "Model Color": localStorage.getItem("selectedColor"),
      "Payment Plan": entry.plan_type,
      "Booking Amount": entry.booking_amount,
      Date: new Date(),
    });
    clevertap.event.push("Booking Payment Initiated", {
      "Model Name": entry.product_type,
      "Model Color": localStorage.getItem("selectedColor"),
      "Payment Plan": entry.plan_type,
      "Booking Amount": entry.booking_amount,
      Date: new Date(),
    });
    //
    var razorpayKey = "cash"; //'rzp_test_p9dRfJfoIuwhPL';

    try {
      let razorpay_payment_id = "cash";
      let razorpay_signature = "cash";
      let reason = "";

      console.log({
        order_id: order.order[0].id,
        customer_id: order.order[0].user_id,
        amount: order.order[0].booking_amount,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: order.order[0].razorpay_order_id,
        razorpaySignature: razorpay_signature,
      });
      const result_pay = await ApiService({
        url: `/api/v1/customer/cashorders/pay`,
        method: "post",
        payload: {
          order_id: order.order[0].id,
          customer_id: order.order[0].user_id,
          amount: order.order[0].booking_amount,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: order.order[0].razorpay_order_id,
          razorpaySignature: razorpay_signature,
          mobile: JSON.parse(localStorage.getItem("bookinginfo")).mobile
        },
      });
      sessionStorage.setItem("newBooking", true);
      // console.log(result_pay.data.data.order_id);
      if (result_pay.status === 200) {
        // navigate(`/order/${order.order[0].id}`);

        /////////
        clevertap.event.push("Booking Payment Successful", {
          "Model Name": entry.product_type,
          "Model Color": localStorage.getItem("selectedColor"),
          "Payment Plan": entry.plan_type,
          "Booking Amount": entry.booking_amount,
          "Payment Options": entry.plan_type_id,
          "Booking Id": orderDetails.data.booking_id,
          Date: new Date(),
        });
        let utm = window.location.search;
        ////////////
        // navigate(`/thankyou/${result_pay.data.data.order_id}`);
        navigate(`/thankyoubooking/${result_pay.data.data.order_id + utm}`);
      } else {
        clevertap.event.push("Booking Payment Failed", {
          "Model Name": entry.product_type,
          "Model Color": localStorage.getItem("selectedColor"),
          "Payment Plan": entry.plan_type,
          "Booking Amount": entry.booking_amount,
          "Payment Options": entry.plan_type_id,
          "Mobile Number": bookingDetails.mobile,
          Date: new Date(),
        });

        console.log("error");
      }
      // dispatch(payOrder(order, paymentResult));
    } catch (error) {
      console.log("error");
    }
    //};
  }

  async function checkOTP(checkbox) {
    // let mobile_no =  document.getElementById('mobile').value;
    let mobile_no = mobile;

    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      const result_pay = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
        mobile,
        email,
      });
      setOtpbtn(false);
      message.innerHTML = "";
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    try {
      const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, {
        mobile,
        otp,
        headers: { Authorization: process.env.REACT_APP_API_KEY },
      });

      console.log(data.status);

      if (data.status === true) {
        message.innerHTML = "";
        // console.log(JSON.stringify(order))
        await loadRazorpay(order);
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP.";
      }
    } catch (error) {
      console.log("error " + error);
    }

    // otp verify end
  };

  const dispatch = useDispatch();
  // function loadRazorpay(order) {
  // }

  useEffect(() => {
    // if ((!order)) {
    // console.log("order"+order);
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(orderdetail(orderId));
    window.orderId = orderId;
    // } else {
    //   // console.log("order"+JSON.stringify(order));
    //   //if (order?.order[0]?.isPaid == 0 || !order?.order[0]?.isPaid) {

    //     //loadRazorpay(order);

    //   //}
    // }
    // }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);
  }, []);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <section className="light-grey bookNow padding-top-100 padding-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-11 col-xl-12 text-center p-0    ">
            <div className="form-bg" id="ms-form">
              <form id="msform" className="form" onSubmit={submitHandler}>
                <ul id="progressbar">
                  <li className="active" id="account">
                    <strong>Your Details </strong>
                  </li>
                  <li className="active" id="personal">
                    <strong> Choose Model & MRP</strong>
                  </li>
                  <li className="active" id="payment">
                    <strong> Booking Payment </strong>
                  </li>
                  <li className="active" id="confirm">
                    <strong> Start My Revolt Plan </strong>
                  </li>
                </ul>

                {/* {
                    loading ? (
                        <div>
                             <br/>
                             <LoadingBox></LoadingBox>
                        </div> 
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox> 
                    ) : (
                        <></> 
                    )
                  } */}

                {/* 3rd tab start */}
                <div className="col-12">
                  <div className="text-center mt-5">
                    <h2 className="fs-title text-center">
                      <b>Please verfiy the OTP !</b>
                    </h2>
                  </div>
                </div>
                <fieldset>
                  <div className="submit-btns justify-content-center ">
                    {/* <button

                        type="button"
                        className="small_buttons   mr-5s sl-btn sb-btn"
                        value="Reload Page"
                        // onClick={(e) => checkOTP(e.target)}
                        //onClick={() => window.open(`/order/${orderId}`)}
                        onClick={refreshPage}
                      >
                      Reload Page
                      </button> */}

                    {/*  */}
                    <span id="message"></span>
                    <div className=" row">
                      <div
                        className="col-12 mt-5 testride_submit_wrapper"
                        style={{ width: "100%" }}
                      >
                        {/*  */}
                        {/* otp field start */}
                        {!otpbtn ? (
                          <>
                            <div className="form-group">
                              <div className="palceholder">
                                <label>OTP </label>
                                <span className="star">*</span>
                              </div>

                              <input
                                type="number"
                                id="otp"
                                className="form-control inputfield"
                                placeholder="OTP"
                                maxLength="6"
                                onChange={(e) => setOtp(e.target.value)}
                                required
                              ></input>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        <span id="message"></span>
                        {/* otp field end */}

                        {/*  */}
                        <div className="otp_btn_wrapper">
                          {otpbtn ? (
                            <input
                              type="button"
                              className="next action-button   "
                              value="Send OTP"
                              style={{ border: "1px solid #000" }}
                              disabled={!(mobile.length == 10)}
                              onClick={(e) => checkOTP(e.target)}
                            />
                          ) : (
                            <div className="group otp_wrapper">
                              <div>
                                <OtpTimer
                                  seconds={60}
                                  minutes={0}
                                  resend={checkOTP}
                                  text="Resend OTP After"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <span style={{ display: "none" }} id="message"></span>
                        <input
                          type="submit"
                          disabled={otpbtn}
                          name="next"
                          className="next action-button  "
                          value="Submit"
                          id="sumbtn"
                          // disabled={!mobileverify}
                        />
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </fieldset>

                {/* 3rd tab end  */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
