import React, { useEffect, useState } from "react";
import { axios } from "../utilities/axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, casheOrder, orderdetail } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants";
import { useLocation } from "react-router-dom";
import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ROOT_PATH, URL_API } from "../constants/cartConstants";
import NumberFormat from "react-number-format";
import Loader from "../components/Loader";
// import CryptoJS from 'crypto-js';
import { booking } from "../actions/userActions";
import { BookingContinue } from "../components/BookingContinue";
import { numberFormatPrice } from "../utilities/utilities";

export default function PlaceOrderScreen(props) {
  const { search } = useLocation();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [submitbtn, setsubmitbtn] = useState(true);
  const [reload, setReload] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log("hello", params);

  const statecityhub = localStorage.getItem("state_city_hub");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  const [paybycash, setPaybycash] = useState(false);

  const listenerCallBackScroll = (e) => {
    console.log("scroll", window.scrollY);
    if (
      document.documentElement.clientHeight >
      document.querySelector("table")?.getBoundingClientRect().y
    ) {
      document.querySelector(".mobile-next-container").style.position = "fixed";
      document.querySelector(".mobile-next-container").style.bottom = "0px";
      document.querySelector(".mobile-next-container").style.display = "block";
      console.log("setted");
      // document.querySelector(".mobile-next-container").style.bottom = "0px !important"
    } else {
      document.querySelector(".mobile-next-container").style.display = "none";
    }
  };

  useEffect(() => {
    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
    let listener;
    if (document.documentElement.clientWidth < 575) {
      listener = window.addEventListener("scroll", listenerCallBackScroll);
    }
    return () => window.removeEventListener("scroll", listenerCallBackScroll);
  }, []);

  // useEffect(()=>{

  // })

  useEffect(() => {
    //  console.log("hiiiiiiiiiiiiiiiiiiii", sessionStorage.getItem("oldBooking"));
    sessionStorage.setItem("newBooking", true);
    if (
      sessionStorage.getItem("oldBooking") == "true" ||
      sessionStorage.getItem("oldBooking") == "done"
    ) {
      sessionStorage.setItem("oldBooking", false);
      if (sessionStorage.getItem("isVendor")) {
        window.location.href =
          window.location.origin + "/rmXMj4G36AWyyjYtrv400brzemp";
      } else {
        window.location.href = window.location.origin + "/book";
      }
    }
    if (params?.id) {
      //  const secretKey = process.env.REACT_APP_SECRET_KEY
      //  const tokenData = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(params.token), secretKey).toString(CryptoJS.enc.Utf8))
      let id = params.id;
      // id = CryptoJS.AES.decrypt(id, secretKey)
      console.log("Token Data is", id);
      BookingContinue(dispatch, navigate, id, setReload);
    } else {
      setReload(true);
    }
  }, []);
  //  const orderDetails = useSelector((state) => state.orderDetails);
  //  const { order } = orderDetails;

  //end cash

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  //  cart.itemsPrice = toPrice(
  // cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0) );

  const bookingInfo_info = localStorage.getItem("bookinginfo");
  const bookingInfo_myArr = JSON.parse(bookingInfo_info);

  let userlogin_info = localStorage?.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userlogin_info);
  userlogin_info = userlogin_info ? userlogin_info : "";
  console.log(userInfo_myArr?.isSeller);
  const shippingAddress = localStorage.getItem("shippingAddress");
  const shippingAddress_myArr = JSON.parse(shippingAddress);
  const [isDealer, setIsDealer] = useState(
    userInfo_myArr?.isSeller ? "Y" : "N"
  );

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);
  console.log("Bhollllllllllla", cartitem_myArr);
  const bookingPayload = JSON.parse(localStorage.getItem("bookingPayload"));
  const dealerInfo = JSON.parse(localStorage.getItem("userInfo"));

  //const cartitem_order =cartitem_myArry.product;
  //const subscription_myArr =cartitem_myArr.subscription;
  //const delivery_myarr =cartitem_myArr.delivery_batch;

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const shareLink = () => {
    let bookingDetails = JSON.parse(localStorage.getItem("bookingPayload"));
    let bookingLeadDetails = JSON.parse(
      localStorage.getItem("bookingLeadDetails")
    );
    let data = {
      color: cartitem_myArr?.product[0]?.color,
      model: cartitem_myArr?.product[0]?.model_family_name,
      productId: cartitem_myArr?.product[0]?.model_id,
      plan_id: cartitem_myArr?.subscription[0]?.id,
      booking_id: bookingLeadDetails.booking_id,
      lsq_opp_id: bookingLeadDetails.lsq_opp_id,
      customerId: bookingLeadDetails.customerId,
      bookingInfo: bookingPayload,
      dealerInfo,
    };

    // const plaintext = JSON.stringify(bookingLeadDetails.booking_id);
    // const secretKey = process.env.REACT_APP_SECRET_KEY;
    // Encrypt using AES
    // const ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(plaintext, secretKey).toString());
    // console.log('Encrypted:', ciphertext, JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(ciphertext), secretKey).toString(CryptoJS.enc.Utf8)));

    let formData = {
      email: bookingDetails.email,
      mobile: bookingDetails.mobile,
      link: window.location.href + "?id=" + bookingLeadDetails.booking_id,
      agentId: userInfo_myArr.id,
      booking_id: bookingLeadDetails.booking_id,
      customer_id: bookingLeadDetails.customerId,
      name: bookingDetails.name,
    };

    let sendBookingLink = async () => {
      try {
        await axios.post(URL_API + "/api/v1/auth/sendBookingLink", formData);
        document.querySelector("#email-modal").style.display = "block";
        document.querySelector("#email-success").style.display = "block";
      } catch {
        document.querySelector("#email-modal-error").style.display = "block";
        document.querySelector("#email-failed").style.display = "block";
        console.log("Some error occured");
      }
    };
    sendBookingLink();

    // alert("Email Sent Successfully")
    //CryptoJS.AES.decrypt(ciphertext, secretkey)

    // Generate the token

    // console.log("Token is", token)
  };
  const placeOrderHandler = () => {
    setsubmitbtn(false);
    // const order_array = userInfo_info.concat(cartitem_myArr);
    //dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    window.productvalue = 0;
    setLoader(true);
    const leadDetails = JSON.parse(localStorage.getItem("bookingLeadDetails"));
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch(
      createOrder({
        bookingInfo_info,
        orderItems: cartitem_myArr,
        dealerInfo: userlogin_info,
        search: search,
        payment: "Razorpay",
        customerId: leadDetails.customerId,
        lsq_opp_id: leadDetails.lsq_opp_id,
        booking_id: leadDetails.booking_id,
      })
    );
  };

  const paybycashHandler = () => {
    setPaybycash(true);
    setsubmitbtn(false);
    window.productvalue = 0;
    const leadDetails = JSON.parse(localStorage.getItem("bookingLeadDetails"));
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch(
      createOrder({
        bookingInfo_info,
        orderItems: cartitem_myArr,
        dealerInfo: userlogin_info,
        search: search,
        payment: "cash",
        customerId: leadDetails.customerId,
        lsq_opp_id: leadDetails.lsq_opp_id,
        booking_id: leadDetails.booking_id,
      })
    );
  };

  useEffect(async () => {
    var message = document.getElementById("message");
    if (message) {
      message.innerHTML = "";
      var goodColor = "#0C6";
      var badColor = "#ed1c24";

      if (success) {
        if (order.id != "" && order.id != undefined) {
          ///////////////////
          if (!paybycash) {
            let search = window.location.search;
            navigate(`/order/${order.id + search}`, {
              state: {
                model: JSON.parse(localStorage.getItem("cartItems"))?.product[0]
                  ?.model_family_name,
              },
            });

            dispatch({ type: ORDER_CREATE_RESET });
            dispatch({ type: PRODUCT_DETAILS_RESET });
          } else {
            navigate(`/cashorder/${order.id}`, {
              state: {
                model: JSON.parse(localStorage.getItem("cartItems"))?.product[0]
                  ?.model_family_name,
              },
            });
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch({ type: PRODUCT_DETAILS_RESET });
          }
          // ///////////////
        } else {
          message.style.color = badColor;
          message.innerHTML = "Please Try, Once Again!";
        }
      }
    }
    //  console.log(search)
  }, [order, success]);

  const slip_state = stateList?.find(
    (c) => c?.state_id == shippingAddress_myArr?.state
  )?.state_name;
  const slip_city = cityList?.find(
    (c) => c?.city_id == shippingAddress_myArr?.city
  )?.city_name;
  const slip_hub = hubList?.find(
    (c) => c?.hub_id == shippingAddress_myArr?.area
  )?.hub_name;

  const slip_country = shippingAddress_myArr?.country;
  let colorInfo = JSON.parse(localStorage.getItem("colorInfo"));
  console.log("Cartooooooooos", cartitem_myArr, hubList);

  return (
    <div>
      {loader ? <Loader /> : null}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      {cartitem_myArr?.length === 0 ||
      cartitem_myArr === undefined ||
      cartitem_myArr == null ? (
        <>
          {reload == true ? (
            <MessageBox>
              <Link to="/">Go Product</Link>
            </MessageBox>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <div>
          <section className="light-grey bookNow newBookNow">
            <div className="headerMobile">
              {" "}
              <h1>Book your Revolt </h1>
            </div>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-12 col-xs-12 col-sm-8 rv-pr">
                  <div className="carouselView mobileCarouselView">
                    <div
                      class={`placeholder-text ${
                        cartitem_myArr?.product[0]?.model_family_name ==
                        "RV400BRZ"
                          ? "brz"
                          : ""
                      }`}
                    >
                      {cartitem_myArr?.product[0]?.model_family_name}
                    </div>
                    <div
                      className="carouselView book-bike"
                      style={{ paddingBottom: "20px" }}
                    >
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
                </div>

                <div className="col-xs-12 col-sm-4 formView">
                  <div id="msformNew" className="form booking-form">
                    <div className="form-card">
                      {userInfo_myArr?.user_type == "Caller" ? (
                        <input
                          style={{ position: "relative", zIndex: "9" }}
                          type="button"
                          name="next"
                          className="next-1 action-button-1 sl-btn paymentOption"
                          defaultValue="Share"
                          onClick={shareLink}
                          disabled={cartitem_myArr?.product?.length === 0}
                        />
                      ) : null}
                      <div className="row" style={{ paddingBottom: "10px" }}>
                        <div className="col-12 order-2 order-sm-2 order-md-1">
                          {" "}
                          <p className="fs-title stepnumbering">
                            You're one step closer to owning the future. Please
                            pay your booking amount to reserve
                          </p>
                          <p className="fs-title stepnumbering">
                            {" "}
                            Your chosen{" "}
                            {cartitem_myArr?.product[0]?.model_family_name}.
                            Click and select your preferred payment method.
                          </p>
                        </div>
                        <div className="col-12 order-1 order-sm-1 order-md-2">
                          {" "}
                          <div className="check-table bookib-proceS  mt-3">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Name </td>
                                  <td>{shippingAddress_myArr?.name}</td>
                                </tr>
                                <tr>
                                  <td>Email Id</td>
                                  <td>{shippingAddress_myArr?.email}</td>
                                </tr>
                                <tr>
                                  <td>Mobile</td>
                                  <td>{shippingAddress_myArr?.mobile}</td>
                                </tr>
                                <tr>
                                  <td>Bike Model | Color</td>
                                  <td>
                                    {" "}
                                    {
                                      cartitem_myArr?.product[0]
                                        ?.model_family_name
                                    }{" "}
                                    | {cartitem_myArr?.product[0]?.color}{" "}
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td>Plan</td>
                                  <td>
                                    {cartitem_myArr?.subscription[0]?.plan_type}
                                  </td>
                                </tr> */}
                                <tr>
                                  <td>Booking Amount</td>
                                  <td>
                                    <NumberFormat
                                      value={
                                        cartitem_myArr?.subscription[0]
                                          ?.booking_amount
                                      }
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      thousandsGroupStyle="lakh"
                                      prefix="&#8377;"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Revolt Hub</td>
                                  <td>{slip_hub}</td>
                                </tr>
                                <tr>
                                  <td>Revolt Hub Pincode</td>
                                  <td>{bookingInfo_myArr?.pincode}</td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    <span id="message"></span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="submit-btns justify-content-center mt-4">
                        <button
                          type="button"
                          className="sl-btn sb-btn back_btn"
                          value="Back"
                          // onClick={(e) => checkOTP(e.target)}
                          onClick={() =>
                            navigate(
                              `/product/${sessionStorage.getItem("bikeId")}`
                            )
                          }
                        >
                          <img src="/images/right-arrow.svg" /> Back
                        </button>
                        {submitbtn && (
                          <input
                            type="button"
                            name="next"
                            className="next-1 action-button-1 sl-btn paymentOption"
                            defaultValue="Online Payment"
                            onClick={placeOrderHandler}
                            disabled={cartitem_myArr?.product?.length === 0}
                          />
                        )}
                      </div>

                      <div className="submit-btns justify-content-center mt-4">
                        {" "}
                        {isDealer == "Y" && submitbtn && (
                          <input
                            type="button"
                            name="next"
                            style={{ width: "100%" }}
                            className="next-1 action-button-1 sl-btn paymentOption"
                            defaultValue="Cash Payment"
                            onClick={paybycashHandler}
                            disabled={cartitem_myArr?.product?.length === 0}
                          />
                        )}
                        <img src="/images/next-arrow.svg" />
                      </div>
                      {/*<input type="button" name="pre" className="pre action-button-pre" value="Pre" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="email-modal" class="modal" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div
                    class="modal-body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      id="email-success"
                      className="success"
                      style={{ color: "green" }}
                    >
                      Payment link successfully sent! 🎉💳
                    </p>
                    <button
                      style={{ width: "fit-content" }}
                      className="next-1 action-button-1 sl-btn paymentOption"
                      onClick={() => navigate("/")}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="email-modal-error"
              class="modal"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div
                    class="modal-body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      id="email-failed"
                      className="error"
                      style={{ color: "red" }}
                    >
                      Some Error Occured
                    </p>
                    <button
                      style={{ width: "fit-content" }}
                      className="next-1 action-button-1 sl-btn paymentOption"
                      onClick={() => window.location.reload()}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mobile-next-container nextBlock">
                <ul className="d-flex justify-content-between">
                  <li>
                    <h5>Booking Amount</h5>
                  </li>
                  <li>
                    <h4>
                      {numberFormatPrice(
                        cartitem_myArr?.subscription[0]?.booking_amount
                      )}{" "}
                      <span>
                        Fully Refundable{" "}
                        <div class="rvtooltip">
                          <img src="/images/info-circle-grey.svg" />{" "}
                          <span class="tooltiptext">
                          Get a full refund if you cancel your booking within 90 days.
                          </span>
                        </div>
                      </span>
                    </h4>
                  </li>
                </ul>
                <div className="btn-block">
                  <button
                    type="button"
                    className="sl-btn sb-btn"
                    value="Back"
                    // onClick={(e) => checkOTP(e.target)}
                    onClick={() =>
                      navigate(`/product/${sessionStorage.getItem("bikeId")}`)
                    }
                  >
                    <img src="/images/right-arrow.svg" /> Back
                  </button>
                  {isDealer == "Y" && submitbtn && (
                    <button
                      type="button"
                      name="next"
                      className="next  action-button-1 sl-btn paymentOption"
                      onClick={paybycashHandler}
                      disabled={cartitem_myArr?.product?.length === 0}
                    >
                      Cash Payment <img src="/images/next-arrow.svg" />
                    </button>
                  )}
                  {submitbtn && (
                    <button
                      type="button"
                      name="next"
                      className={`next ${
                        isDealer == "Y" ? "cashbtn" : ""
                      } action-button-1 sl-btn paymentOption`}
                      defaultValue="Online Payment"
                      onClick={placeOrderHandler}
                      disabled={cartitem_myArr?.product?.length === 0}
                    >
                      Online Payment <img src="/images/next-arrow.svg" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {/* new design end */}
          {/*  */}
        </div>
      )}
    </div>
    /*<button
    type="button"
    className="primary block"
    onClick={loadRazorpay()}>
    Payment
   </button>*/
  );
}
