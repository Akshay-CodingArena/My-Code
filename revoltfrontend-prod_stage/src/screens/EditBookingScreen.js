import Axios from "axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CheckoutSteps from "../components/CheckoutSteps";
import Pdf from "react-to-pdf";
import OtpTimer from "otp-timer";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import NumberFormat from "react-number-format";
import { bookingLeadlsq, detailsProductAll } from "../actions/productActions";

export default function EditBookingScreen(props) {
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //
  const [SlotAvilable, setSlotAvilable] = useState([]);

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [bookingId, setBookingId] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderInfo = useSelector((state) => state);
  console.log("order info is", orderInfo);
  console.log("orderdetails", orderDetails);
  const { order, loading, setLoading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { product } = useSelector((state) => state.allProducts);
  const [selectedProduct, setSelectedProduct] = useState();

  console.log("products", product);
  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);
  const [termCondition, setTermsCondition] = useState(false);
  const handleTerms = () => setTermsCondition(false);

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

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
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

  useEffect(() => {
    dispatch(detailsOrder(orderId));
    dispatch(detailsProductAll());
  }, []);

  const submitbooking = async () => {
    // e.preventDefault();
    // TODO: dispatch update product
    let bookingdata = {
      booking_ref_id: order?.booking_ref_id,
      bookingId: bookingId,
      name: name,
      mobile: mobile,
      email: email,
      state: selectedState,
      city: selectedCity,
      area: selectedHub,
      userId: userInfo?.id,
      bike_color: selectedColor,
      productId: product?.[selectedModel].filter(
        (value) => value.color == selectedColor,
      )[0]["model_id"],
      user_type: userInfo?.isAdmin
        ? "admin"
        : userInfo?.isSeller
          ? "dealer"
          : "customer",
    };
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/editbooking`,
        bookingdata,
        { headers: { Authorization: userInfo.token } },
      );
      if (data.data.status) {
        // navigate(`/thankyou/${orderId}`);
        navigate(`/thankyoubooking/${orderDetails.order.order_id}`);
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  const updateLsq = () => {
    let data = {
      mobile: mobile,
      name: name,
      color: selectedColor,
      model_id: selectedProduct,
      plan: order?.shippingAddress[0]?.plan_type,
      customerId: order?.order[0]?.customerId,
      lsq_opp_id: order?.order[0]?.lsq_opp_id,
      booking_id: order?.order[0]?.booking_id,
      amount: order?.order[0]?.booking_amount,
      product_type: selectedModel,
    };
    console.log("REQ" + JSON.stringify(data));
    dispatch(bookingLeadlsq(data));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp
    if (isAdmin) {
      submitbooking();
      let URL = URL_API + "/api/v1/common/freshdesk_records/booking";
      console.log("order is", order);
      let state_city_hub = JSON.parse(localStorage.getItem("state_city_hub"));
      const formData = {
        freshdesk_version: order?.order[0]?.freshdesk_version,
        freshdesk_org_contact_id: order?.order[0].freshdesk_org_contact_id,
        freshdesk_contact_id: order?.order[0].freshdesk_contact_id,
        freshdesk_booking_record_id:
          order?.order[0].freshdesk_booking_record_id,
        name: name,
        color: selectedColor,
        booking_date: order.order[0]?.createdAt,
        hub_state: state_city_hub.state.filter((city) =>
          city.state_id == selectedState ? true : false,
        )[0]?.state_name,
        booking_ref_id: order?.booking_ref_id,
        booking_id: order?.order[0].booking_id,
        revolt_purchase_plan: order?.shippingAddress[0]?.plan_type,
        payment_id: order?.order[0]?.razorpay_payment_id,
        cancel_date: order?.order[0]?.createdAt,
        payment: order?.order[0]?.paymentMethod,
        model: selectedModel,
        customer_pincode: order?.order[0]?.pincode,
        email: email,
        booking_amount: "" + order?.order[0]?.booking_amount,
        hub_city: state_city_hub.city.filter((city) =>
          city.city_id == selectedCity ? true : false,
        )[0]?.city_name,
        sales_date: null,
        mobile: mobile,
        cancellation_reason: null,
        created_by: null,
        refund_id: null,
        refund_date: null,
        hub: state_city_hub.hub.filter((city) =>
          city.hub_id == selectedHub ? true : false,
        )[0]?.hub_name,
        order_id: order?.order[0]?.razorpay_order_id,
        status: null,
      };
      Axios.put(URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
        },
      });
      sessionStorage.setItem("newBooking", false);

      updateLsq();
    } else {
      try {
        const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, {
          mobile,
          otp,
          headers: { Authorization: process.env.REACT_APP_API_KEY },
        });

        if (data.status === true) {
          message.innerHTML = "";
          submitbooking();
          updateLsq();
        } else {
          message.style.color = badColor;
          message.innerHTML = "Please Enter Valid OTP.";
        }
      } catch (error) {}
    }
  };

  // const slip_state = stateList.find((c) => c.state_id == order?.shippingAddress[0].state)?.state_name;
  // const slip_city =  cityList.find((c) => c.city_id == order?.shippingAddress[0].city)?.city_name;
  // const slip_hub =  hubList.find((c) => c.hub_id == order?.shippingAddress[0].area)?.hub_name;

  const slip_country = order?.shippingAddress[0]?.country;

  ///
  const [selectedState, setSelectedState] = React.useState(
    order?.shippingAddress[0]?.state ? order?.shippingAddress[0]?.state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    order?.shippingAddress[0]?.city ? order?.shippingAddress[0]?.city : "",
  );
  const [selectedHub, setSelectedHub] = React.useState(
    order?.shippingAddress[0]?.area ? order?.shippingAddress[0]?.area : "",
  );
  const [selectedModel, setSelectedModel] = React.useState(
    order?.order[0].name,
  );
  const [selectedColor, setSelectedColor] = React.useState(
    order?.order[0].bike_color,
  );
  let availableCity = cityList.filter(
    (c) => c.state_id == selectedState && c.status == 1,
  );
  let availableHub = hubList.filter(
    (c) => c.city_id == selectedCity && c.status == 1,
  );

  const availableStateList = stateList.filter((c) => c.status == 1);
  const isAdmin = userInfo?.isAdmin ? "Y" : "N";

  ///
  useEffect(() => {
    if (order?.order[0]?.user_id) {
      if (order?.order[0]?.user_id !== userInfo?.id && isAdmin == "N") {
        navigate("/");
      }
    }
    console.log("Booking data to send", order);
    setBookingId(order?.order[0].booking_id);
    setName(order?.shippingAddress[0].name);
    setMobile(order?.shippingAddress[0].mobile);
    setEmail(order?.shippingAddress[0].email);
    setSelectedState(order?.shippingAddress[0]?.state);
    setSelectedCity(order?.shippingAddress[0]?.city);
    setSelectedHub(order?.shippingAddress[0]?.area);
    setSelectedColor(order?.order[0].bike_color);
    setSelectedModel(order?.order[0].name);

    if (!userInfo) {
      navigate(`/signin`);
    }
  }, [order]);

  const checkBookingSlot = async (e) => {
    setSelectedHub(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`,
      );

      setSlotAvilable(data.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Booking Update</h3>
                    </div>
                    <div className="col-6 text-end"></div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="table-sectiondata booking-table half-width change-wdh">
                    {/* <div className='col-8'></div> */}
                    <div className="right col-4">
                      <div className="main-logo">
                        <img
                          className="nr-logo"
                          alt=""
                          src={`/images/new-logo.png`}
                        />
                        <img
                          className="fl-logo"
                          alt=""
                          src={`/images/logo-name.svg`}
                        />
                      </div>
                    </div>
                    <form className="form" onSubmit={submitHandler}>
                      <table className="mt-10 table table-striped tableNSEbooking table-bordered tableNSE">
                        <tbody>
                          {order.order[0].isPaid != 0 ? (
                            <tr>
                              {/* <td> Current Status</td>
                                                                <td> 
                                                                {order.order[0].order_status=='Created' ?
                                                                                <b> Active </b>
                                                                        :
                                                                       <b>  {order.order[0].order_status}</b> }
                                                                </td> */}
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <td> Booking ID</td>
                            <td>
                              {order.order[0].isPaid == 0 ? (
                                <b>Not Booked</b>
                              ) : (
                                <b>{order.booking_ref_id}</b>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Name*</td>
                            <td>
                              <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                required
                                disabled={isAdmin == "N" ? true : false}
                                onChange={(e) => setName(e.target.value)}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>Email Id*</td>
                            <td>
                              <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                required
                                disabled={isAdmin == "N" ? true : false}
                                onChange={(e) => setEmail(e.target.value)}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>Mobile*</td>
                            <td>
                              <input
                                id="mobile"
                                type="number"
                                placeholder="Enter mobile"
                                value={mobile}
                                pattern="d{10}"
                                maxLength={10}
                                required
                                disabled={isAdmin == "N" ? true : false}
                                onChange={(e) => setMobile(e.target.value)}
                                onInput={(e) =>
                                  (e.target.value = e.target.value.slice(0, 10))
                                }
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>Hub Address</td>
                            <td>
                              <b>
                                {order.order[0].dealer_name},{" "}
                                {order.order[0].dealer_city},{" "}
                                {order.order[0].state_name}, {slip_country}
                              </b>

                              {/*  */}
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">State</label>
                                  <select
                                    id="state"
                                    className="form-control"
                                    placeholder="Select State"
                                    required
                                    value={selectedState}
                                    onChange={(e) => {
                                      setSelectedState(e.target.value);
                                      setSelectedHub("");
                                    }}
                                  >
                                    <option>--Choose State--</option>
                                    {availableStateList.map((value, key) => {
                                      return (
                                        <option
                                          value={value.state_id}
                                          name={value.state_name}
                                          key={key}
                                        >
                                          {value.state_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">City</label>
                                  <select
                                    id="city"
                                    className="form-control"
                                    placeholder="City"
                                    value={selectedCity}
                                    onChange={(e) =>
                                      setSelectedCity(e.target.value)
                                    }
                                    required
                                  >
                                    <option>--Choose City--</option>
                                    {availableCity.map((e, key) => {
                                      return (
                                        <option value={e.city_id} key={key}>
                                          {e.city_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>

                              <div className="col-12 col-md-12">
                                <div className="form-group">
                                  <label className="label">Hub</label>
                                  <select
                                    id="area"
                                    placeholder="Dealer Hub"
                                    className="form-control"
                                    required
                                    value={selectedHub}
                                    onChange={(e) =>
                                      setSelectedHub(e.target.value)
                                    }
                                    //    onChange={(e) => checkBookingSlot(e.target.value)}
                                  >
                                    <option value="">--Dealer Hub --</option>
                                    {availableHub.map((e, key) => {
                                      return (
                                        <option value={e.hub_id} key={key}>
                                          {e.hub_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {/* <span id="message" className="mt-1 text-left pl-2">{SlotAvilable?.city_stock != "ok" ? SlotAvilable?.city_stock : ""}</span>  */}
                                </div>
                              </div>
                              {/*  */}
                            </td>
                          </tr>
                          <tr>
                            <td>Bike Model | Color</td>
                            <td>
                              <div>
                                <b>
                                  {selectedModel} | {selectedColor}
                                </b>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">Model</label>
                                  <select
                                    id="Model"
                                    className="form-control"
                                    placeholder="Select State"
                                    required
                                    value={selectedModel}
                                    onChange={(e) => {
                                      setSelectedModel(e.target.value);
                                      setSelectedColor("");
                                    }}
                                  >
                                    <option>--Choose Your Model--</option>
                                    {Object.keys(product || {})?.map(
                                      (value, key) => {
                                        return (
                                          <option
                                            value={value}
                                            name={value}
                                            key={key}
                                          >
                                            {value}
                                          </option>
                                        );
                                      },
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">Color</label>
                                  <select
                                    id="Model"
                                    className="form-control"
                                    placeholder="Select State"
                                    required
                                    value={selectedColor || ""}
                                    onChange={(e) => {
                                      setSelectedColor(e.target.value);
                                      setSelectedProduct(
                                        product?.[selectedModel].filter(
                                          (value) => value == e.target.value,
                                        )?.model_id,
                                      );
                                    }}
                                  >
                                    <option>--Choose Your Color--</option>
                                    {Object.values(
                                      product?.[selectedModel] || {},
                                    )?.map((value, key) => {
                                      return (
                                        <option
                                          value={value.color}
                                          name={value.color}
                                          key={key}
                                        >
                                          {value.color}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td colspan="2">
                              <div>
                                <label></label>
                                {order.order[0].order_status == "Created" ? (
                                  <>
                                    {/*  */}
                                    {isAdmin != "Y" ? (
                                      <div className=" row">
                                        <div className="col-12 testride_submit_wrapper">
                                          {/*  */}
                                          {/* otp field start */}
                                          {!otpbtn ? (
                                            <>
                                              <div className="form-group">
                                                <div className="palceholder">
                                                  <label>OTP </label>
                                                  <span className="star">
                                                    *
                                                  </span>
                                                </div>

                                                <input
                                                  type="number"
                                                  id="otp"
                                                  className="form-control inputfield"
                                                  placeholder="OTP"
                                                  maxlength="6"
                                                  onChange={(e) =>
                                                    setOtp(e.target.value)
                                                  }
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
                                                // disabled={name == "" || email == "" || selectedState == "" || selectedCity == "" || selectedHub == "" || selecttimeSlot == "" || selectTestDate == "" || selectModel == "" ? true : false}
                                                disabled={
                                                  !(mobile?.length == 10)
                                                }
                                                onClick={(e) =>
                                                  checkOTP(e.target)
                                                }
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
                                          <span
                                            style={{ display: "none" }}
                                            id="message"
                                          ></span>

                                          {/*  */}
                                          {/* {order.order[0].order_status == "Created"  ?
              <input type="submit" 
            //   disabled={(mobile?.length!=10)  || SlotAvilable.city_stock!="ok"  }
              disabled={(mobile?.length!=10) ||  otpbtn}  
         name="update" className="next action-button" value="Update" />
              :""} */}
                                          {/*  */}
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {/*  */}

                                    <input
                                      type="submit"
                                      //   disabled={(mobile?.length!=10)  || SlotAvilable.city_stock!="ok"  }
                                      disabled={
                                        isAdmin == "Y"
                                          ? mobile?.length != 10
                                          : mobile?.length != 10 || otpbtn
                                      }
                                      name="update"
                                      className="next action-button sl-btn sb-btn"
                                      id="sumbtn"
                                      value="Update"
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
