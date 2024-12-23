import Axios from "axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  upgradeorderdetail,
  upgradeorderPay,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CheckoutSteps from "../../components/CheckoutSteps";
import {
  ORDER_UPGRADE_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
export default function UpgradeOrderScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const upgradeorderDetails = useSelector((state) => state.upgradeorderDetails);
  const { order, loading, setLoading, error } = upgradeorderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const upgradeorderPay = useSelector((state) => state.upgradeorderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = upgradeorderPay;

  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const {
  //   loading: loadingDeliver,
  //   error: errorDeliver,
  //   success: successDeliver,
  // } = orderDeliver;

  const dispatch = useDispatch();
  // function loadRazorpay(order) {
  // }
  function loadRazorpay(order) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      var razorpayKey = order.razor_key; //'rzp_test_p9dRfJfoIuwhPL';

      try {
        const options = {
          key: razorpayKey,
          amount: order?.order[0]?.booking_amount.toString(),
          currency: "INR", //order.order_gen.currency,
          order_id: order?.order[0]?.razorpay_order_id,
          name: "Revolt Motors",
          description: "Upgrade Transaction",
          //image: '/images/p1.png',
          handler: async function (response) {
            console.log("razorpay reposnse" + response);
            let razorpay_payment_id = response.razorpay_payment_id;
            let razorpay_signature = response.razorpay_signature;
            let reason = "";
            /*
            if(!response.razorpay_payment_id && error.code==='BAD_REQUEST_ERROR') {
              razorpay_payment_id = error.metadata.payment_id;
              reason =error.reason;
            }*/

            const result_pay = await Axios.post(
              `${URL_API}/api/v1/customer/upgradeorders/pay`,
              {
                order_id: order?.order[0]?.id,
                customer_id: order?.order[0]?.user_id,
                amount: order?.order[0]?.booking_amount,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: order?.order[0]?.razorpay_order_id,
                razorpaySignature: razorpay_signature,
              },
            );
            console.log(result_pay.data.data.order_id);
            if (result_pay.status === 200) {
              // navigate(`/order/${order?.order[0]?.id}`);
              // navigate(`/upgradethankyou/${result_pay.data.data.order_id}`);
              navigate(`/upgradethankyou/${orderId}`);
            } else {
              console.log("error");
            }
            // dispatch(upgradeorderPay(order, paymentResult));
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: order.order[0]?.city,
          },
          theme: {
            color: "#3a3939", //"callback_url":
          },
          // "callback_url": `${URL_API}/thankyou/${order?.order[0]?.id}`
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
    if (!order) {
      //console.log(order.id);
      console.log("inside successpay");
      // dispatch({ type: ORDER_UPGRADE_RESET });
      // dispatch({ type: UPGRADE_ORDER_DELIVER_RESET });
      dispatch(upgradeorderdetail(orderId));
      window.orderId = orderId;
    } else {
      console.log("inside else");
      if (order?.order[0]?.isPaid == 0 || !order?.order[0]?.isPaid) {
        console.log("inside function");
        loadRazorpay(order);
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(upgradeorderPay(order, paymentResult));
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
              {/* <form id="msform" className="form" onSubmit={submitHandler}>  */}
              <ul id="progressbar">
                <li className="" id="account">
                  <strong>Your Details </strong>
                </li>
                <li className="" id="personal">
                  <strong> Choose Model & MRP</strong>
                </li>
                <li className="active" id="payment">
                  <strong> Upgrade Booking Payment </strong>
                </li>
                <li className="" id="confirm">
                  <strong> Thankyou </strong>
                </li>
              </ul>

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

              {/* 3rd tab start */}
              <fieldset>
                <div className="submit-btns justify-content-center mt-4">
                  <button
                    type="button"
                    className="small_buttons   mr-5s sl-btn sb-btn"
                    value="Reload Page"
                    // onClick={(e) => checkOTP(e.target)}
                    //onClick={() => window.open(`/order/${orderId}`)}
                    onClick={refreshPage}
                  >
                    Reload Page
                  </button>
                </div>
              </fieldset>

              {/* 3rd tab end  */}
              {/* </form>   */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
