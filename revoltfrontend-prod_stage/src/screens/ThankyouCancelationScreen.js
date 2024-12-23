import { axios as Axios } from "../utilities/axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from 'react-redux';
// mport {  useNavigate } from 'react-router-dom';
// import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import CheckoutSteps from '../components/CheckoutSteps';
import Pdf from "react-to-pdf";

// import {
//   ORDER_DELIVER_RESET,
//   ORDER_PAY_RESET,
// } from '../constants/orderConstants';

import { URL_API } from "../constants/cartConstants";
import { detailsOrder } from "../actions/orderActions";

// import NumberFormat from 'react-number-format';

export default function ThankyouCancelationScreen(props) {
  const ref = React.createRef();
  const dispatch = useDispatch();
  // const options = {
  //   orientation: 'landscape',
  //   unit: 'in',
  //   format: [4, 2]
  // };
  const [cancel_data, setCancel_data] = useState([]);
  const [orderDetails, setOrderDetails] = useState();
  // const navigate = useNavigate();
  const params = useParams();

  const { id } = params;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const isAdmin = userInfo?.isAdmin ? "Y" : "N";

  const updateBooking = async (orderData) => {
    try {
      let { data } = await Axios.get(
        `${URL_API}/api/v1/customer/orders/${orderData.data.data.order_id}`,
        {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      );
      let order = data.data;
      let URL = URL_API + "/api/v1/common/freshdesk_records/booking";
      setOrderDetails({ ...order });
      console.log("order is", order);
      const formData = {
        freshdesk_version: order?.order[0]?.freshdesk_version,
        freshdesk_org_contact_id: order?.order[0].freshdesk_org_contact_id,
        freshdesk_contact_id: order?.order[0].freshdesk_contact_id,
        freshdesk_booking_record_id:
          order?.order[0].freshdesk_booking_record_id,
        name: order?.shippingAddress[0]?.name,
        color: order.order[0].bike_color,
        booking_date: order.order[0]?.createdAt,
        hub_state: order.order[0].state_name,
        booking_ref_id: order?.booking_ref_id,
        booking_id: order?.order[0].booking_id,
        revolt_purchase_plan: order?.shippingAddress[0]?.plan_type,
        payment_id: order?.order[0]?.razorpay_payment_id,
        cancel_date: order?.order[0]?.createdAt,
        payment: order?.order[0]?.paymentMethod,
        model: order?.order[0]?.name,
        customer_pincode: order?.order[0]?.pincode,
        email: order?.shippingAddress[0]?.email,
        booking_amount: "" + order?.order[0]?.booking_amount,
        hub_city: order.order[0].dealer_city,
        sales_date: null,
        mobile: order?.shippingAddress[0]?.mobile,
        cancellation_reason:
          order?.order[0]?.reason_type + " \n " + order?.order[0]?.reason_query,
        created_by: order?.order[0]?.created_by,
        refund_id: order?.order[0].refund_id,
        refund_date: order?.order[0]?.refund_date,
        hub: order?.order[0]?.dealer_name,
        order_id: order?.order[0]?.razorpay_order_id,
        status: order?.order[0]?.order_status,
      };

      Axios.put(URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
        },
      });
      sessionStorage.setItem("newBooking", false);
    } catch (error) {
      console.log("error print", error);
    }
  };

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/order_cancel/${id}`,
      );
      await updateBooking(data);
      console.log(data.data.data);
      setCancel_data(data.data.data);
    } catch (error) {
      // const message =
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message;
    }
  };

  useEffect(() => {
    updateBooking(id);
    getData(id);
  }, [id]);

  return (
    <>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Cancellation Confirmation</h3>
                    </div>
                    <div className="col-6 text-end">
                      <Pdf
                        targetRef={ref}
                        filename="Receipt_Cancellation.pdf"
                        y={20}
                        x={5}
                        scale={0.7}
                      >
                        {({ toPdf }) => (
                          <button
                            className="sl-btn"
                            onClick={async () => {
                              console.log("order sadsad", orderDetails);
                              let data = orderDetails?.pdf?.data;
                              if (
                                orderDetails.order[0].order_status == "Cancel"
                              ) {
                                const response = await Axios.get(
                                  URL_API +
                                    "/api/v1/customer/order_cancel/" +
                                    orderDetails.booking_ref_id,
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
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute(
                                "download",
                                "Invoice-Receipt.pdf",
                              );
                              link.click();
                            }}
                          >
                            Download Receipt &nbsp;
                            <i
                              className="fa fa-file-pdf-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                      </Pdf>
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="row">
                    <div className="col-12">
                      <div className="thanks-message mb-4 text-center">
                        <h1 className="mb-3">
                          Your Order is Cancelled Successfully
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div
                    className="table-sectiondata booking-table half-width change-wdh"
                    ref={ref}
                  >
                    <table className="table table-striped tableNSEbooking table-bordered tableNSE">
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
                          <td>Name</td>
                          <td>
                            <b>{cancel_data?.customer_name}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Email Id</td>
                          <td>
                            <b>{cancel_data?.email}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>
                            <b>{cancel_data?.mobile}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Booking ID</td>
                          <td>
                            <b>{cancel_data?.booking_id}</b>
                          </td>
                        </tr>
                        {/* <tr>
                                                                        <td>Payment ID</td>
                                                                        <td><b>{cancel_data?.razorpay_payment_id}</b></td>
                                                                    </tr> 
                                                                    <tr>
                                                                        <td>Order Date</td>
                                                                        <td><b>{cancel_data?.createdAt}</b></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Order Time</td>
                                                                        <td><b>{cancel_data?.order_time}</b></td>
                                                                    </tr>*/}
                        <tr>
                          <td>Refund ID</td>
                          <td>
                            <b>
                              {cancel_data?.refund_id
                                ? cancel_data?.refund_id
                                : "Your refund in under process."}
                            </b>
                          </td>
                        </tr>

                        {isAdmin == "Y" ? (
                          <tr>
                            <td>Refund Status</td>
                            <td>{cancel_data?.status_message}</td>
                          </tr>
                        ) : (
                          ""
                        )}

                        <tr>
                          <td>Cancellation Date</td>
                          <td>
                            <b>{cancel_data?.cancel_date}</b>
                          </td>
                        </tr>

                        <tr>
                          <td>Cancellation Time</td>
                          <td>
                            <b>{cancel_data?.cancel_dateTime}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
