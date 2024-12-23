import Axios from "axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CallerOrderDetails,
  orders,
  CallerbookingDetails,
} from "../../actions/orderActions";
//import LoadingBox from '../../components/LoadingBox';
import MessageBox from "../../components/MessageBox";
//import CheckoutSteps from '../../components/CheckoutSteps';
//import Pdf from "react-to-pdf";

import $ from "jquery";

export default function UpgradeCallCenterScreen(props) {
  //
  //const statecityhub = localStorage.getItem("state_city_hub");
  //const stateList_myArr = JSON.parse(statecityhub);
  //const stateList = stateList_myArr.state;
  // const cityList = stateList_myArr.city;
  //const hubList = stateList_myArr.hub;
  const [searchSetType, setSearchSetType] = React.useState("booking");

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, setLoading, error } = orderDetail;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const isAdmin = userInfo?.isAdmin ? "Y" : "N";
  const [message, setMessage] = useState("");
  const [messagetype, setMessagetype] = useState("");
  const [searchText, setSearchText] = React.useState("");
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onSearchSubmit = () => {
    if (searchText != "" && searchSetType != "") {
      dispatch(CallerbookingDetails(searchText, searchSetType, "upgrade"));
      // console.log(order);
      if (order?.status != false) {
        // setMessagetype("success");
        //  setMessage("Valid input");
      } else {
        setMessagetype("danger");
        setMessage("Invalid Input");
      }
    } else {
      setMessagetype("danger");
      setMessage("Select option to search");
    }
  };

  const onSearchTypeStatus = (searthType) => {
    console.log(searthType);

    $(".clis button").removeClass("active");
    $("." + searthType + "s").addClass("active");

    let enterText = "";

    if (searthType == "booking") {
      enterText = "Booking ID";
    } else if (searthType == "mobile") {
      enterText = "Mobile Number";
    } else if (searthType == "email") {
      enterText = "Email Address";
    } else if (searthType == "payment") {
      enterText = "Payment ID";
    } else if (searthType == "order") {
      enterText = "Order ID";
    }

    $("#searchText").attr("placeholder", "Please Enter " + enterText);

    setSearchText("");
    setSearchSetType(searthType);
  };

  const onSearchBookSubmit = (booking_id) => {
    if (booking_id != "") {
      //console.log(booking_id);
      dispatch(CallerOrderDetails(booking_id, "booking", "upgrade"));
      // console.log(order);
      if (order?.status != false) {
        // setMessagetype("success");
      } else {
        setMessagetype("danger");
        setMessage("Invalid Input");
      }
    } else {
      setMessagetype("danger");
      setMessage("Select option to search");
    }
  };

  return (
    <div>
      <div className="light-grey  padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-12 tab-list">
                      <div className="d-flex clis">
                        <button
                          id="book"
                          className="sl-btn sb-btn bookings active"
                          onClick={() => {
                            onSearchTypeStatus("booking");
                          }}
                        >
                          Booking ID
                        </button>
                        <button
                          id="mbile"
                          className="sl-btn sb-btn mobiles"
                          onClick={() => {
                            onSearchTypeStatus("mobile");
                          }}
                        >
                          Mobile
                        </button>
                        <button
                          id="emailid"
                          className="sl-btn sb-btn emails"
                          onClick={() => {
                            onSearchTypeStatus("email");
                          }}
                        >
                          Email
                        </button>
                        <button
                          id="payment_id"
                          className="sl-btn sb-btn payments"
                          onClick={() => {
                            onSearchTypeStatus("payment");
                          }}
                        >
                          RazarPay Payment ID
                        </button>
                        <button
                          id="order_id"
                          className="sl-btn sb-btn orders"
                          onClick={() => {
                            onSearchTypeStatus("order");
                          }}
                        >
                          RazorPay Order ID
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-end">
                      <div className="dles">
                        <div className="menu-button form-default">
                          <input
                            type="text"
                            id="searchText"
                            value={searchText}
                            className="form-control inputfield"
                            placeholder="Please Enter Booking ID"
                            onChange={(e) => setSearchText(e.target.value)}
                          ></input>
                        </div>
                        <button className="sl-btn" onClick={onSearchSubmit}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="common-section">
                  <div className="check-lists mb-4">
                    {orders?.order?.map((booking, key) => (
                      <>
                        <button
                          id={key}
                          className="sl-btn sb-btn"
                          onClick={() => {
                            onSearchBookSubmit(booking.booking_id);
                          }}
                        >
                          {booking.booking_id}
                        </button>
                      </>
                    ))}
                  </div>

                  <div className="table-sectiondata booking-table half-width">
                    {message && (
                      <MessageBox variant={messagetype}>{message}</MessageBox>
                    )}

                    {(() => {
                      if (order?.status) {
                        return (
                          <>
                            <table className="table table-striped table-bordered tableNSE">
                              <tbody>
                                <tr>
                                  <td>Current Status</td>
                                  <td>
                                    {console.log(order?.order[0])}
                                    <>
                                      {order?.order[0].order_status ==
                                      "Created" ? (
                                        <b> Active </b>
                                      ) : (
                                        <b> {order?.order[0].order_status} </b>
                                      )}
                                    </>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Chassis Number </td>
                                  <td>
                                    <b>{order?.order[0]?.chassis}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Name</td>
                                  <td>
                                    <b>{order?.shippingAddress[0]?.name}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Email Id</td>
                                  <td>
                                    <b>{order?.shippingAddress[0]?.email}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mobile</td>
                                  <td>
                                    <b>{order?.shippingAddress[0]?.mobile}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Address</td>
                                  <td>
                                    <b>
                                      {order?.order[0].area_name},{" "}
                                      {order?.order[0].city_name},{" "}
                                      {order?.order[0].state_name}{" "}
                                    </b>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="20%"> Booking Id</td>
                                  <td>
                                    {order?.order[0]?.isPaid == 0 ? (
                                      <b>Lead</b>
                                    ) : (
                                      <b>{order?.order[0]?.booking_id}</b>
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Order Id</td>
                                  <td>
                                    <b>{order?.order[0].razorpay_order_id}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Payment Id</td>
                                  <td>
                                    <b>{order?.order[0].razorpay_payment_id}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Booking Date</td>
                                  <td>
                                    <b>{order?.order[0].createdAt} </b>
                                  </td>
                                </tr>

                                <tr>
                                  <td> Payment Status</td>
                                  <td>
                                    {order?.order[0].isPaid === 1 ? (
                                      <>
                                        <b>Paid </b>
                                      </>
                                    ) : (
                                      <>
                                        <b> Not Paid</b>
                                      </>
                                    )}
                                  </td>
                                </tr>

                                {/*  */}
                                {order?.order[0].order_status == "Cancel" ? (
                                  <>
                                    <tr>
                                      <td>Refund Id</td>
                                      <td>
                                        <b>
                                          {" "}
                                          {order?.order[0].refund_id
                                            ? order?.order[0].refund_id
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Refund Date</td>
                                      <td>
                                        <b>{order?.order[0].cancel_date} </b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Cancelled Date</td>
                                      <td>
                                        <b>
                                          {order?.order[0].cancel_date} :{" "}
                                          {order?.order[0].cancel_dateTime}
                                        </b>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  ""
                                )}

                                {/*  */}
                              </tbody>
                            </table>
                          </>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
