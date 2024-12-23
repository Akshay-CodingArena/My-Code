import { axios as Axios } from "../../utilities/axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  adminOrderDetails,
  order_status_update,
  payOrder,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CheckoutSteps from "../../components/CheckoutSteps";
import Pdf from "react-to-pdf";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import NumberFormat from "react-number-format";
import axios from "axios";
export default function OrderDetailScreen(props) {
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //
  const [orderStatus, setOrderStatus] = React.useState("");
  const [orderChangeStatus, setOrderChangeStatus] = React.useState("");
  const [bookingId, setBookingId] = React.useState("");

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;

  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, setLoading, error } = orderDetail;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const isAdmin = userInfo?.isAdmin ? "Y" : "N";
  const [message, setMessage] = useState("");
  const [messagetype, setMessagetype] = useState("");

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
  useEffect(() => {
    dispatch(adminOrderDetails(orderId));
  }, []);

  const slip_state = stateList.find(
    (c) => c.state_id == order?.shippingAddress[0].state,
  )?.state_name;
  const slip_city = cityList.find(
    (c) => c.city_id == order?.shippingAddress[0].city,
  )?.city_name;

  const slip_country = order?.shippingAddress[0].country;

  const onChangeStatus = () => {
    const user_type = userInfo?.isSeller ? "dealer" : "admin";

    if (orderChangeStatus != "" || orderStatus != "") {
      dispatch(
        order_status_update(
          order.order[0].id,
          order.booking_ref_id,
          userInfo.id,
          user_type,
          orderStatus,
          orderChangeStatus,
        ),
      );
      setMessagetype("success");
      setMessage("Status Changed");
    } else {
      alert("Select Status");
    }
  };

  console.log(order);
  return (
    <div>
      <div className="light-grey  padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Order Detail</h3>
                    </div>
                    <div className="col-6 text-end">
                      {(() => {
                        return loading ? (
                          <div></div>
                        ) : (
                          <>
                            {order.order[0].order_status == "Created" ? (
                              <Link
                                className="sl-btn mr-2"
                                to={`/editbooking/${orderId}`}
                              >
                                Edit{" "}
                              </Link>
                            ) : (
                              ""
                            )}
                            <Pdf
                              targetRef={ref}
                              filename={
                                order.order[0].order_status == "Unpaid"
                                  ? "Lead.pdf"
                                  : `Booking-${order.booking_ref_id}.pdf`
                              }
                              x={10}
                              y={20}
                              scale={0.68}
                            >
                              {({ toPdf }) => (
                                <div
                                  className="sl-btn"
                                  onClick={async () => {
                                    console.log("Order Status is", order);
                                    let data = order?.pdf?.data;
                                    if (
                                      order.order[0].order_status == "Cancel"
                                    ) {
                                      const response = await Axios.get(
                                        URL_API +
                                          "/api/v1/customer/order_cancel/" +
                                          order.booking_ref_id,
                                      );
                                      data = response.data.data.pdf.data;
                                      // .pdf.data
                                      console.log(
                                        "response is",
                                        response.data.data.pdf.data,
                                      );
                                    }
                                    let blob = new Blob([
                                      new Uint8Array(data).buffer,
                                    ]);
                                    const url =
                                      window.URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.setAttribute(
                                      "download",
                                      "Invoice-Receipt.pdf",
                                    );
                                    link.click();
                                    // toPdf()
                                  }}
                                >
                                  Download Receipt{" "}
                                  <i
                                    className="fa fa-file-pdf-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              )}
                            </Pdf>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="table-sectiondata booking-table half-width">
                    {message && (
                      <MessageBox variant={messagetype}>{message}</MessageBox>
                    )}
                    {(() => {
                      return loading ? (
                        <LoadingBox></LoadingBox>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <>
                          {userInfo?.isFinanceTeam ? (
                            ""
                          ) : (
                            <table className="table table-striped table-bordered tableNSE">
                              <tbody>
                                <tr>
                                  <td>
                                    Current Status
                                    <br />
                                    {order.order[0].order_status == "Created" &&
                                    isAdmin == "Y" ? (
                                      <b> Active </b>
                                    ) : (
                                      <b> {order.order[0].order_status} </b>
                                    )}
                                  </td>
                                  <td>
                                    {isAdmin == "Y" ? (
                                      <div className="row detail_form">
                                        <div className="col-8">
                                          <select
                                            id="ordeChangeStatus"
                                            placeholder="Reason Type"
                                            className="form-control"
                                            required
                                            value={orderStatus}
                                            onChange={(e) =>
                                              setOrderStatus(e.target.value)
                                            }
                                          >
                                            <option value="">
                                              Select Order Status
                                            </option>
                                            <option value="Created">
                                              Active
                                            </option>
                                            <option value="Cancel">
                                              Cancel
                                            </option>
                                            <option value="Unpaid">
                                              Unpaid
                                            </option>
                                            <option value="Delivered">
                                              Delivered
                                            </option>
                                          </select>
                                        </div>
                                        <div className="col-4">
                                          <button
                                            className="sl-btn"
                                            onClick={onChangeStatus}
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        {order.order[0].order_status ==
                                        "Created" ? (
                                          <b> Active </b>
                                        ) : (
                                          <b> {order.order[0].order_status} </b>
                                        )}
                                      </>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Order Sub status <br />
                                    {order.order[0].order_sub_status != "" &&
                                    order.order[0].order_status == "Created" ? (
                                      <b>{order.order[0].order_sub_status} </b>
                                    ) : (
                                      <>
                                        {order.order[0].order_status ==
                                          "Cancel" ||
                                        order.order[0].order_status ==
                                          "Delivered" ||
                                        order.order[0].order_status ==
                                          "delivered" ||
                                        order.order[0].order_status ==
                                          "Sold" ? (
                                          ""
                                        ) : (
                                          <b>
                                            {order.order[0].order_sub_status}
                                          </b>
                                        )}
                                      </>
                                    )}
                                  </td>

                                  <td>
                                    {order.order[0].order_status == "Cancel" ||
                                    order.order[0].order_status ==
                                      "Delivered" ||
                                    order.order[0].order_status ==
                                      "delivered" ||
                                    order.order[0].order_status == "Sold" ? (
                                      <b>Not Selected</b>
                                    ) : (
                                      <div className="row detail_form">
                                        <div className="col-8">
                                          <select
                                            id="ordeChangeStatus"
                                            placeholder="Reason Type"
                                            className="form-control"
                                            required
                                            value={orderChangeStatus}
                                            onChange={(e) =>
                                              setOrderChangeStatus(
                                                e.target.value,
                                              )
                                            }
                                          >
                                            <option value="">
                                              Select order Sub Status
                                            </option>

                                            <option value="Postponed due to Finance Unavailability">
                                              Postponed due to Finance
                                              Unavailability
                                            </option>
                                            <option value="Waiting for Auspicious Festive Date">
                                              Waiting for Auspicious Festive
                                              Date
                                            </option>
                                            <option value="Increase in Price">
                                              Increase in Price
                                            </option>
                                            <option value="Color Unavailability">
                                              Color Unavailability
                                            </option>
                                            <option value="Decision Postponed due to personal family reasons">
                                              Decision Postponed due to personal
                                              family reasons
                                            </option>
                                            <option value="Address Credentials unavailable">
                                              Address Credentials unavailable
                                            </option>
                                            <option value="Product Feedback">
                                              Product Feedback
                                            </option>
                                          </select>
                                        </div>
                                        <div className="col-4">
                                          <button
                                            className="sl-btn"
                                            onClick={onChangeStatus}
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          <table className="table table-striped table-bordered tableNSE ">
                            <tbody>
                              <tr>
                                <td colSpan="2">
                                  <div className="main-logo">
                                    <img
                                      className="nr-logo"
                                      alt="Revolt Motors Logo
                                      "
                                      src={`/images/revolt-motors-logo.svg`}
                                    />
                                    <img
                                      className="fl-logo"
                                      alt="Revolt Motors Logo
                                      "
                                      src={`/images/logo-name.svg`}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Booking Id | Status</td>
                                <td>
                                  <b>
                                    {" "}
                                    {order.order[0].order_status == "Unpaid"
                                      ? "NA"
                                      : order.booking_ref_id}
                                  </b>
                                  |
                                  {order.order[0].order_status == "Created" ? (
                                    <b> Active </b>
                                  ) : (
                                    <>
                                      {" "}
                                      {order.order[0].order_status ==
                                      "Unpaid" ? (
                                        "LEAD"
                                      ) : (
                                        <b> {order.order[0].order_status}</b>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>UTM</td>
                                <td>
                                  <b>{order.shippingAddress[0].url}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Name</td>
                                <td>
                                  <b>{order.shippingAddress[0].name}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>E-Mail ID</td>
                                <td>
                                  <b>{order.shippingAddress[0].email}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Mobile</td>
                                <td>
                                  <b>
                                    {order.shippingAddress[0].mobile ??
                                      order.order[0].mobile}
                                  </b>
                                </td>
                              </tr>
                              {order.order[0].company_name ? (
                                <>
                                  <tr>
                                    <td>Company Name</td>
                                    <td>
                                      <b>{order.order[0].company_name}</b>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Employee Discount Offer</td>
                                    <td>
                                      <b>{order?.order[0]?.schemeStatus}</b>
                                    </td>
                                  </tr>
                                  {/* <tr>
                                <td>POC Name</td>
                                <td>
                                  <b>{order.order[0].poc_name}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>POC Email</td>
                                <td>
                                  <b>{order.order[0].poc_email_id}</b>
                                </td>
                              </tr> */}
                                </>
                              ) : null}

                              <tr>
                                <td>Pincode</td>
                                <td>
                                  <b>
                                    {order.shippingAddress[0].pincode ??
                                      order.order[0].pincode}
                                  </b>
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
                                </td>
                              </tr>
                              <tr>
                                <td>Bike Model | Color</td>
                                <td>
                                  <b>
                                    {order.order[0].name} |{" "}
                                    {order.order[0].bike_color}
                                  </b>
                                </td>
                              </tr>
                              {/* <tr>
                                <td>REVOLT PURCHASE PLAN</td>
                                <td>
                                  <b>{order.order[0].plan_type}</b>
                                </td>
                              </tr> */}

                              {/*  */}
                              {order.order[0].order_status != "Cancel" ? (
                                <>
                                  <tr>
                                    <td>Show Room Price (*)</td>
                                    <td>
                                      <b>
                                        <NumberFormat
                                          value={order.order[0].itemsPrice}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          thousandsGroupStyle="lakh"
                                          prefix="&#8377;"
                                        />
                                      </b>
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                ""
                              )}

                              {/*  */}
                              <tr>
                                <td>Booking Amount (**)</td>
                                <td>
                                  <b>
                                    <NumberFormat
                                      value={order.order[0].booking_amount}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      thousandsGroupStyle="lakh"
                                      prefix="&#8377;"
                                    />
                                  </b>
                                </td>
                              </tr>

                              <tr>
                                <td> Payment Method | Payment ID</td>
                                <td>
                                  <b>
                                    {" "}
                                    RazorPay |{" "}
                                    {order.order[0].razorpay_payment_id}
                                  </b>
                                </td>
                              </tr>
                              {order.order[0].order_status != "Unpaid" ? (
                                <>
                                  <tr>
                                    <td>Order ID </td>
                                    <td>
                                      <b>{order.order[0].razorpay_order_id}</b>
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                ""
                              )}
                              {order.order[0].order_status != "Cancel" ? (
                                <tr>
                                  <td> Payment Status</td>
                                  <td>
                                    {order.order[0].isPaid === 1 ? (
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
                              ) : (
                                ""
                              )}

                              <tr>
                                <td>Booking Date | Booking Time</td>
                                <td>
                                  <b>
                                    {order.order[0].createdAt} |{" "}
                                    {order.order[0].createdTime}
                                  </b>
                                </td>
                              </tr>
                              {order.order[0].order_status == "Cancel" ? (
                                <>
                                  <tr>
                                    <td>
                                      Cancellation Date | Cancellation Time
                                    </td>
                                    <td>
                                      <b>
                                        {order.order[0].cancel_date} |{" "}
                                        {order.order[0].cancel_dateTime}
                                      </b>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Cancellation Reason</td>
                                    <td>
                                      <b>{order.order[0].reason_query} </b>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Refund Date | Refund Time</td>
                                    <td>
                                      {order.order[0].refund_id ? (
                                        <b>
                                          {order.order[0].ref_date} |{" "}
                                          {order.order[0].ref_dateTime}{" "}
                                        </b>
                                      ) : (
                                        "NA"
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Refund ID | Refund Status</td>
                                    <td>
                                      {order.order[0].refund_id ? (
                                        <b>{order.order[0].refund_id} </b>
                                      ) : (
                                        "NA"
                                      )}
                                      | {order.order[0].status_message}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                ""
                              )}

                              {/*  */}

                              <tr>
                                {/* <td>Terms & Conditions*</td> */}
                                <td colspan="2">
                                  <b>
                                    {" "}
                                    * The price of vehicle shall be applicable
                                    as prevailing on the date of delivery of
                                    vehicle to customer.
                                    <br />
                                    ** Your booking amount will be adjusted with
                                    the On-Road price. Registration, Road Tax,
                                    Insurance,{" "}
                                    {order.order[0].name == "RV400BRZ" || order.order[0].name == "RV1" || order.order[0].name == "RV1+"
                                      ? ""
                                      : ", 4G Connectivity"}{" "}
                                    and other statutory applicable charges will
                                    be additional based on actuals{" "}
                                  </b>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Slip start */}
                          <table
                            className="table table-striped table-bordered tableNSE "
                            style={{
                              position: "absolute",
                              left: "-8000px",
                              width: "90%",
                            }}
                            ref={ref}
                          >
                            <tbody>
                              <tr>
                                <td colSpan="2">
                                  <div className="main-logo">
                                    <img
                                      className="nr-logo"
                                      alt="Revolt Motors Logo"
                                      src={`/images/revolt-motors-logo.svg`}
                                    />
                                    <img
                                      className="fl-logo"
                                      alt="Revolt Logo"
                                      src={`/images/logo-name.svg`}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Current Status</td>
                                <td>
                                  {" "}
                                  {order.order[0].order_status == "Created" ? (
                                    <b> Active </b>
                                  ) : (
                                    <b> {order.order[0].order_status} </b>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td width="20%"> Booking ID</td>
                                <td>
                                  {order.order[0].isPaid == 0 ? (
                                    <b>Not Present</b>
                                  ) : (
                                    <b>{order.booking_ref_id}</b>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>UTM</td>
                                <td>
                                  <b>{order.shippingAddress[0].url}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Name</td>
                                <td>
                                  <b>{order.shippingAddress[0].name}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>E-Mail ID</td>
                                <td>
                                  <b>{order.shippingAddress[0].email}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>Mobile</td>
                                <td>
                                  <b>
                                    {order.shippingAddress[0].mobile ??
                                      order.order[0].mobile}
                                  </b>
                                </td>
                              </tr>
                              {order.order[0].company_name ? (
                                <>
                                  <tr>
                                    <td>Company Name</td>
                                    <td>
                                      <b>{order.order[0].company_name}</b>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Employee Discount Offer</td>
                                    <td>
                                      <b>{order?.order[0]?.schemeStatus}</b>
                                    </td>
                                  </tr>
                                  {/* <tr>
                                <td>POC Name</td>
                                <td>
                                  <b>{order.order[0].poc_name}</b>
                                </td>
                              </tr>
                              <tr>
                                <td>POC Email</td>
                                <td>
                                  <b>{order.order[0].poc_email_id}</b>
                                </td>
                              </tr> */}
                                </>
                              ) : null}
                              <tr>
                                <td>Pincode</td>
                                <td>
                                  <b>
                                    {order.shippingAddress[0].pincode ??
                                      order.order[0].pincode}
                                  </b>
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
                                </td>
                              </tr>
                              <tr>
                                <td>Bike Model | Color</td>
                                <td>
                                  <b>
                                    {order.order[0].name} |{" "}
                                    {order.order[0].bike_color}
                                  </b>
                                </td>
                              </tr>
                              {/* <tr>
                                <td>REVOLT PURCHASE PLAN</td>
                                <td>
                                  <b>{order.order[0].plan_type}</b>
                                </td>
                              </tr> */}
                              {/*  */}
                              {/* {order.order[0].order_status == "Delivered" ? "":
                                                                    <> */}

                              {order.order[0].order_status != "Cancel" &&
                              order.order[0].order_status != "Delivered" ? (
                                <>
                                  <tr>
                                    <td>Vehicle Ex-Showroom Price (*)</td>
                                    <td>
                                      <b>
                                        <NumberFormat
                                          value={order.order[0].itemsPrice}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          thousandsGroupStyle="lakh"
                                          prefix="&#8377;"
                                        />
                                      </b>
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                ""
                              )}

                              {/*  */}
                              <tr>
                                <td>
                                  {order.order[0].order_status ==
                                  "Delivered" ? (
                                    <>Booking Amount (*)</>
                                  ) : (
                                    <>
                                      {order.order[0].order_status !=
                                      "Cancel" ? (
                                        <>Booking Amount (**)</>
                                      ) : (
                                        <>Refund Amount (*)</>
                                      )}
                                    </>
                                  )}
                                </td>
                                <td>
                                  <b>
                                    <NumberFormat
                                      value={order.order[0].booking_amount}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      thousandsGroupStyle="lakh"
                                      prefix="&#8377;"
                                    />
                                  </b>
                                </td>
                              </tr>
                              {order.order[0].order_status != "Cancel" ? (
                                <>
                                  <tr>
                                    <td> Payment Method | Payment ID</td>
                                    <td>
                                      <b>
                                        {" "}
                                        {"RazorPay"} |{" "}
                                        {order.order[0].razorpay_payment_id}
                                      </b>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Booking Date | Booking Time</td>
                                    <td>
                                      <b>
                                        {order.order[0].createdAt} |{" "}
                                        {order.order[0].createdTime}
                                      </b>
                                    </td>
                                  </tr>
                                  {/* <tr>
                                                                        <td>Booking Time</td>
                                                                        <td>
                                                                        <b>{order.order[0].createdTime}</b> 
                                                                        </td>
                                                                    </tr> */}
                                  {/* <tr>
                                                                        <td> Payment Status</td>
                                                                        <td>
                                                                            {order.order[0].isPaid === 1 ? (
                                                                                <>
                                                                                  	<b>Paid	</b>
                                                                                    
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                   	<b> Not Paid</b>
                                                                                </>
                                                                            )}
                                                                        </td>
                                                                    </tr> */}
                                </>
                              ) : (
                                ""
                              )}
                              {/*  */}
                              {order.order[0].order_status == "Cancel" ? (
                                <>
                                  <tr>
                                    <td>Refund Method | Refund ID</td>
                                    <td>
                                      <b>
                                        {" "}
                                        RazorPay |{" "}
                                        {order.order[0].refund_id
                                          ? order.order[0].refund_id
                                          : "Not Generated"}
                                      </b>
                                    </td>
                                  </tr>
                                  {/* {isAdmin=='Y' ?
																	<tr>
																		<td>Refund Status</td>
																		<td>
																			
                                                                        <b>{order.order[0].status_message}  </b> 
																				
																		</td>
																	</tr>  
                                                                    :
                                                                      ""
																} */}
                                  {/* {order.order[0].refund_id  ? 												 */}
                                  <tr>
                                    <td>
                                      Cancellation Date | Cancellation Time
                                    </td>
                                    <td>
                                      <b>
                                        {order.order[0].cancel_date} |{" "}
                                        {order.order[0].cancel_dateTime}
                                      </b>
                                    </td>
                                  </tr>
                                  {/* :""} */}
                                </>
                              ) : (
                                ""
                              )}

                              {order?.order[0]?.schemeStatus ? (
                                <tr>
                                  <td>Office Id Proof</td>
                                  <td>
                                    <b>
                                      <img
                                        style={{
                                          maxWidth: "200px",
                                          maxHeight: "300px",
                                        }}
                                        src={order?.order[0]?.attachmentUrl}
                                      />
                                    </b>
                                  </td>
                                </tr>
                              ) : null}
                              {/*  */}

                              <tr>
                                {/* <td>Terms & Conditions*</td> */}
                                <td colspan="2">
                                  {order.order[0].order_status == "Cancel" ? (
                                    <b>* Amount paid at the time of booking</b>
                                  ) : (
                                    <>
                                      {order.order[0].order_status ==
                                      "Delivered" ? (
                                        <b>
                                          {" "}
                                          * Your booking amount will be adjusted
                                          with the On-Road price. Registration,
                                          Road Tax, Insurance,{" "}
                                          {order.order[0].name == "RV400BRZ"
                                            ? ""
                                            : ", 4G Connectivity"}
                                          and other statutory applicable charges
                                          will be additional based on actuals{" "}
                                        </b>
                                      ) : (
                                        <b>
                                          {" "}
                                          * The price of vehicle shall be
                                          applicable as prevailing on the date
                                          of delivery of vehicle to customer.
                                          <br />
                                          ** Your booking amount will be
                                          adjusted with the On-Road price.
                                          Registration, Road Tax, Insurance,{" "}
                                          {order.order[0].name == "RV400BRZ"
                                            ? ""
                                            : ", 4G Connectivity"}{" "}
                                          and other statutory applicable charges
                                          will be additional based on actuals{" "}
                                        </b>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* Slip end */}
                        </>
                      );
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
