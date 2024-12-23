import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUpgradeOrder } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import { useLocation } from "react-router-dom";

import { PRODUCT_DETAILS_RESET } from "../../constants/productConstants";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { ROOT_PATH } from "../../constants/cartConstants";
import NumberFormat from "react-number-format";

export default function UpgradePlaceOrderScreen(props) {
  const { search } = useLocation();
  //
  const statecityhub = localStorage.getItem("state_city_hub_upgrade");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //

  const navigate = useNavigate();

  const orderUpgrade = useSelector((state) => state.orderUpgrade);
  const { loading, success, error, order } = orderUpgrade;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  //  2200 = toPrice(
  // cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0) );

  const bookingInfo_info = localStorage.getItem("upgrade");
  const bookingInfo_myArr = JSON.parse(bookingInfo_info);

  const userlogin_info = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : "";

  const upgrade = localStorage.getItem("upgrade");
  const upgrade_product = JSON.parse(upgrade);

  const UpgradePlan = localStorage.getItem("UpgradePlan");
  const UpgradePlan_myArr = JSON.parse(UpgradePlan);
  const order_item = { booking_amount: "2200" };
  // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  // cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // cart.shippingPrice = 2200 > 100 ? toPrice(0) : toPrice(10);
  // cart.taxPrice = toPrice(0.15 * 2200);
  // cart.totalPrice = 2200  ;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    window.productvalue = 0;

    dispatch(
      createUpgradeOrder({
        bookingInfo_info,
        orderItems: order_item,
        dealerInfo: userlogin_info,
        search: search,
      }),
    );
  };

  useEffect(() => {
    var message = document.getElementById("message");
    message.innerHTML = "";
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (success) {
      if (order.id != "" && order.id != undefined) {
        navigate(`/upgradeorder/${order.id}`);

        // dispatch({ type: ORDER_CREATE_RESET });
        // dispatch({ type: PRODUCT_DETAILS_RESET });
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Try, Once Again!";
      }
    }
    //  console.log(search)
  }, [dispatch, order, navigate, success]);

  const slip_state = stateList.find(
    (c) => c.state_id == upgrade_product.state,
  )?.state_name;
  const slip_city = cityList.find(
    (c) => c.city_id == upgrade_product.city,
  )?.city_name;
  const slip_hub = hubList.find(
    (c) => c.hub_id == upgrade_product.area,
  )?.hub_name;

  const slip_country = upgrade_product.country;

  // const cart = useSelector((state) => state.upgradecart);
  // if (!cart?.paymentMethod) {
  //   //navigate('/upgradepayment');
  //    navigate(`/upgradeorder/${order.id}`);
  // }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      {UpgradePlan_myArr?.length === 0 || UpgradePlan_myArr === undefined ? (
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
                      <li id="confirm">
                        <strong> Start My Revolt Plan </strong>
                      </li>
                    </ul>

                    {/* 3rd tab start */}
                    <fieldset>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-12">
                            <p className="fs-title stepnumbering">
                              <b>Your RV400 is eligible for the upgrade!!</b>
                            </p>
                            <p className="fs-title stepnumbering"></p>
                          </div>
                          <div className="col-12">
                            <div className="check-table booking-table mt-3">
                              <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                                <tbody>
                                  <tr>
                                    <td>Name </td>
                                    <td>{upgrade_product?.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Email Id</td>
                                    <td>{upgrade_product?.email}</td>
                                  </tr>
                                  <tr>
                                    <td>Mobile</td>
                                    <td>{upgrade_product?.mobile}</td>
                                  </tr>
                                  {/* <tr>
              <td>Bike Model | Color</td>
              <td> {UpgradePlan_myArr?.product[0]?.model_family_name} | {UpgradePlan_myArr?.product[0]?.color} </td>
            </tr> */}
                                  <tr>
                                    <td>Plan</td>
                                    <td>
                                      Advance Payment for Hardware Upgrade
                                      Package{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Booking Amount</td>
                                    <td>
                                      <NumberFormat
                                        value={2200}
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
                            onClick={() => navigate(`/upgradeproduct`)}
                          >
                            Back
                          </button>
                          <input
                            type="button"
                            name="next"
                            className="next-1 action-button-1 sl-btn paymentOption"
                            defaultValue="Proceed to Payment"
                            onClick={placeOrderHandler}
                            // disabled={UpgradePlan_myArr?.product?.length === 0}
                          />
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
