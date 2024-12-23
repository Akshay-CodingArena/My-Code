import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, casheOrder, orderdetail } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { useLocation } from "react-router-dom";

import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ROOT_PATH } from "../constants/cartConstants";
import NumberFormat from "react-number-format";

export default function PlaceOrderScreenMobile(props) {
  const { search } = useLocation();
  const [submitbtn, setsubmitbtn] = useState(true);

  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  //

  //cash
  const [paybycash, setPaybycash] = useState(false);

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
    userInfo_myArr?.isSeller ? "Y" : "N",
  );

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  //const cartitem_order =cartitem_myArr.product;
  //const subscription_myArr =cartitem_myArr.subscription;
  //const delivery_myarr =cartitem_myArr.delivery_batch;

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    setsubmitbtn(false);
    // const order_array = userInfo_info.concat(cartitem_myArr);
    //dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    window.productvalue = 0;

    dispatch(
      createOrder({
        bookingInfo_info,
        orderItems: cartitem_myArr,
        dealerInfo: userlogin_info,
        search: search,
        payment: "Razorpay",
      }),
    );
  };

  const paybycashHandler = () => {
    setPaybycash(true);
    setsubmitbtn(false);
    window.productvalue = 0;

    dispatch(
      createOrder({
        bookingInfo_info,
        orderItems: cartitem_myArr,
        dealerInfo: userlogin_info,
        search: search,
        payment: "cash",
      }),
    );
  };

  useEffect(async () => {
    var message = document.getElementById("message");
    message.innerHTML = "";
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (success) {
      if (order.id != "" && order.id != undefined) {
        ///////////////////
        if (!paybycash) {
          navigate(`/orderMobile/${order.id}`);

          dispatch({ type: ORDER_CREATE_RESET });
          dispatch({ type: PRODUCT_DETAILS_RESET });
        } else {
          navigate(`/cashorder/${order.id}`);
          dispatch({ type: ORDER_CREATE_RESET });
          dispatch({ type: PRODUCT_DETAILS_RESET });
        }
        // ///////////////
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Try, Once Again!";
      }
    }
    //  console.log(search)
  }, [dispatch, order, navigate, success]);

  const slip_state = stateList?.find(
    (c) => c?.state_id == shippingAddress_myArr?.state,
  )?.state_name;
  const slip_city = cityList?.find(
    (c) => c?.city_id == shippingAddress_myArr?.city,
  )?.city_name;
  const slip_hub = hubList?.find(
    (c) => c?.hub_id == shippingAddress_myArr?.area,
  )?.hub_name;

  const slip_country = shippingAddress_myArr?.country;

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      {cartitem_myArr?.length === 0 || cartitem_myArr === undefined ? (
        <MessageBox>
          <Link to="/">Go Product</Link>
        </MessageBox>
      ) : (
        <div>
          {/*  */}
          {/* new design start */}
          <section className="light-grey bookNow padding-top-100 padding-bottom-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-9 col-md-7 col-lg-11 col-xl-12 text-center p-0">
                  <div className="form-bg form-default" id="ms-form">
                    {/* <form id="msform" className="form" onSubmit={submitHandler}>  */}
                    {/* <ul id="progressbar">  
                      <li className="active"  id="account"><strong>Your Details </strong></li>  
                      <li  className="active" id="personal"><strong> Choose Model & MRP</strong></li>  
                      <li className="active" id="payment"><strong> Booking Payment </strong></li>  
                      <li id="confirm"><strong> Start My Revolt Plan </strong></li>  
                  </ul>   */}

                    {/* 3rd tab start */}
                    <fieldset>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-12">
                            <p className="fs-title stepnumbering">
                              You're one step closer to owning the future.
                              Please pay your booking amount to reserve
                              <br />
                              your chosen RV400. Click and select your preferred
                              payment method.
                            </p>
                          </div>
                          <div className="col-12">
                            <div className="check-table booking-table mt-3">
                              <table className="table table-striped tableNSEbooking table-bordered tableNSE">
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
                                  <tr>
                                    <td>Plan</td>
                                    <td>
                                      {
                                        cartitem_myArr?.subscription[0]
                                          ?.plan_type
                                      }
                                    </td>
                                  </tr>
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
                                    <td>Pincode</td>
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
                            className="sl-btn sb-btn"
                            value="Back"
                            // onClick={(e) => checkOTP(e.target)}
                            onClick={() =>
                              navigate(`/product/RM0400RRCP1CWBLK`)
                            }
                          >
                            Back
                          </button>
                          {submitbtn && (
                            <input
                              type="button"
                              name="next"
                              className="next-1 action-button-1 sl-btn paymentOption"
                              defaultValue="Proceed to Payment"
                              onClick={placeOrderHandler}
                              disabled={cartitem_myArr?.product?.length === 0}
                            />
                          )}
                          {isDealer == "Y" && submitbtn && (
                            <input
                              type="button"
                              name="next"
                              className="next-1 action-button-1 sl-btn paymentOption"
                              defaultValue="Cash Payment"
                              onClick={paybycashHandler}
                              disabled={cartitem_myArr?.product?.length === 0}
                            />
                          )}
                        </div>
                        {/*<input type="button" name="pre" className="pre action-button-pre" value="Pre" /> */}
                      </div>
                    </fieldset>

                    {/* 3rd tab end  */}
                    {/* </form>   */}
                  </div>
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
