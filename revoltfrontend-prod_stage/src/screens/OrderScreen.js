import { axios as Axios } from "../utilities/axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deliverOrder, orderdetail, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import clevertap from "clevertap-web-sdk";
import ApiService from "../apiService/apiService";

export default function OrderScreen(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, setLoading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const [model, setModel] = useState("RV400BRZ");
  let colorInfo = JSON.parse(localStorage.getItem("colorInfo"));

  if (sessionStorage.getItem("oldBooking") == "done") {
    sessionStorage.setItem("oldBooking", true);
    window.location.href = window.location.origin;
  } else {
    sessionStorage.setItem("oldBooking", true);
  }

  const { userInfo } = userSignin;

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

  const dispatch = useDispatch();
  sessionStorage.setItem("orderCreated", true);
  // function loadRazorpay(order) {
  // }
  function loadRazorpay(order) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      //
      let entry = JSON.parse(localStorage.getItem("cartItems")).subscription[0];
      let orderDetails = JSON.parse(localStorage.getItem("orderdetails"));
      let bookingDetails = JSON.parse(localStorage.getItem("bookinginfo"));

      clevertap.event.push("Booking Payment Initiated", {
        "Model Name": entry.product_type,
        "Model Color": localStorage.getItem("selectedColor"),
        "Payment Plan": entry.plan_type,
        "Booking Amount": entry.booking_amount,
        Date: new Date(),
      });
      //
      var razorpayKey = order?.razor_key; //'rzp_test_p9dRfJfoIuwhPL';
      // var razorpayKey='rzp_live_pGsso02Apeh5X3';

      // let  orderAmount =100;
      //amount: order?.order_gen.amount.toString(),
      // currency: order?.order_gen.currency,
      // order_id: order?.order_gen.id,
      try {
        const options = {
          key: razorpayKey,
          amount: order?.order[0].booking_amount.toString(),
          currency: "INR", //order?.order_gen.currency,
          order_id: order?.order[0].razorpay_order_id,
          name: "Revolt Motors",
          description: "Booking transaction",
          //image: '/images/p1.png',
          handler: async function (response) {
            console.log(response);
            let razorpay_payment_id = response.razorpay_payment_id;
            let razorpay_signature = response.razorpay_signature;
            let reason = "";
            /*
            if(!response.razorpay_payment_id && error.code==='BAD_REQUEST_ERROR') {
              razorpay_payment_id = error.metadata.payment_id;
              reason =error.reason;
            }*/

            // const result_pay = await Axios.post(
            //   `${URL_API}/api/v1/customer/orders/pay`,
            //   {
            //     order_id: order?.order[0].id,
            //     customer_id: order?.order[0].user_id,
            //     amount: order?.order[0].booking_amount,
            //     razorpayPaymentId: razorpay_payment_id,
            //     razorpayOrderId: order?.order[0].razorpay_order_id,
            //     razorpaySignature: razorpay_signature,
            //   }
            // );

            const result_pay = await ApiService({
              url: "/api/v1/customer/orders/pay",
              method: "post",
              payload: {
                order_id: order?.order[0].id,
                customer_id: order?.order[0].user_id,
                amount: order?.order[0].booking_amount,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: order?.order[0].razorpay_order_id,
                razorpaySignature: razorpay_signature,
                mobile: JSON.parse(localStorage.getItem("bookinginfo")).mobile,
              },
            });

            console.log(result_pay);
            //console.log(result_pay.data.data.order_id);
            if (
              result_pay.status === 200 ||
              order?.order[0].booking_amount == 1
            ) {
              // navigate(`/order/${order?.order[0].id}`);

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
              ////////////
              // navigate(`/thankyou/${result_pay.data.data.order_id}`);
              let utm = window.location.search;
              dispatch({ type: ORDER_DETAILS_RESET });

              if (order?.order[0].booking_amount == 1) {
                navigate(
                  `/thankyoubooking/${result_pay.data.data.order_id + utm}`
                );
              } else {
                navigate(
                  `/thankyoubooking/${result_pay.data.data.order_id + utm}`
                );
              }
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
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: order?.shippingAddress[0]?.city,
          },
          theme: {
            color: "#3a3939", //"callback_url":
          },
          // "callback_url": `${URL_API}/thankyou/${order?.order[0].id}`
        };

        //   setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log(err);
        //  setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  useEffect(() => {
    console.log("useffect" + JSON.stringify(order));

    if (typeof order?.order != "undefined" || typeof order?.order == "") {
      console.log("order" + JSON.stringify(order));
      if (order?.order[0]?.isPaid == 0 || !order?.order[0]?.isPaid) {
        loadRazorpay(order);
      }
    } else if (successPay || successDeliver) {
      //console.log(order?.id);
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      window.orderId = orderId;
    }
  }, [successPay, successDeliver, order]);
  // }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);
  useEffect(() => {
    dispatch(orderdetail(orderId));
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
    <section className="light-grey bookNow newBookNow">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 rv-pr">
            <div className="carouselView">
              <div
                className={`placeholder-text ${
                  location.state?.model == "RV400BRZ" ? "brz" : ""
                }`}
              >
                {location.state?.model}
              </div>
              {Object.keys(colorInfo).length ? (
                <img
                  src={"/images/" + colorInfo.image}
                  className="rounded mx-auto d-block"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-xs-12 col-sm-4  p-3 formView">
            <div className="form-bg" id="ms-form">
              {loading ? (
                <div>
                  <br />
                  <LoadingBox></LoadingBox>
                </div>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <></>
              )}
            </div>

            <fieldset>
              <div className="submit-btns justify-content-center mt-4">
                <button
                  type="button"
                  className="small_buttons   mr-5s sl-btn sb-btn"
                  value="Reload Page"
                  onClick={refreshPage}
                >
                  Reload Page
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-11 col-xl-12 text-center p-0    "></div>
        </div>
      </div>
    </section>
  );
}
