//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { upgradeorderdetail } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CheckoutSteps from "../../components/CheckoutSteps";
import Pdf from "react-to-pdf";
import { Helmet } from "react-helmet";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import NumberFormat from "react-number-format";
export default function UpgradeBookingDetail(props) {
  const ref = React.createRef();

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const upgradeorderDetails = useSelector((state) => state.upgradeorderDetails);
  const { order, loading, setLoading, error } = upgradeorderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(upgradeorderdetail(orderId));
  }, []);
  //console.log("sam"+JSON.stringify(order))

  const upgrade = JSON.parse(localStorage.getItem("upgrade"));
  const local_order = JSON.parse(localStorage.getItem("upgradeorderdetails"));
  // console.log("local_order "+ local_order?.data?.booking_id);
  // console.log("order "+ order?.booking_ref_id);
  var authenticate = local_order?.data?.booking_id == order?.booking_ref_id;

  // const slip_state = stateList.find((c) => c.state_id == order?.order[0].state)?.state_name;
  // const slip_city =  cityList.find((c) => c.city_id == order?.order[0].city)?.city_name;
  // const slip_hub =  hubList.find((c) => c.hub_id == order?.order[0].area)?.hub_name;

  const slip_country = "India";

  //    console.log("Order deatils : "+JSON.stringify(order));

  // window.dataLayer.push({
  //     event: 'transaction_success'
  //   });

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
                      <h3 className="tab-title">
                        Booking Confirmation for Upgrade
                      </h3>
                    </div>
                    <div className="col-6 text-end">
                      {order?.order[0]?.order_status != "Unpaid" ? (
                        <Pdf
                          targetRef={ref}
                          filename="Receipt_Booking.pdf"
                          y={20}
                          x={5}
                          scale={0.7}
                        >
                          {({ toPdf }) => (
                            <button className="sl-btn" onClick={toPdf}>
                              Download Receipt &nbsp;
                              <i
                                className="fa fa-file-pdf-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          )}
                        </Pdf>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="table-sectiondata booking-table half-width change-wdh">
                    {/* <div className='col-8'></div> */}
                    <div className="right col-4">
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
                    </div>
                    <table className="mt-10 table table-striped tableNSEbooking table-bordered tableNSE">
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            {order.order[0].isPaid != 0
                              ? "Upgrade Id |"
                              : ""}{" "}
                            Status{" "}
                          </td>
                          <td>
                            <b>
                              {" "}
                              {order.order[0].isPaid != 0
                                ? order?.order[0]?.booking_id + "|"
                                : ""}{" "}
                              {order?.order[0]?.order_status}
                            </b>
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
                            <b>{order?.order[0]?.name}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>
                            <b>{order?.order[0]?.mobile}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>E-Mail ID </td>
                          <td>
                            <b>{order?.order[0]?.email}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Booking Amount for Upgrade</td>
                          <td>
                            <b>
                              <NumberFormat
                                value={order?.order[0]?.booking_amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                thousandsGroupStyle="lakh"
                                prefix="&#8377;"
                              />
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td>Hub Address </td>
                          <td>
                            <b>{order?.order[0]?.dealer_address}</b>
                          </td>
                        </tr>
                        {order.order[0].isPaid != 0 ? (
                          <>
                            {" "}
                            <tr>
                              <td> Payment Method | Payment ID </td>
                              <td>
                                <b>
                                  RazorPay |{" "}
                                  {order?.order[0]?.razorpay_payment_id}
                                </b>
                              </td>
                            </tr>
                            <tr>
                              <td> Date | Time </td>
                              <td>
                                <b>{order?.order[0]?.updatedAt}</b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="common-section ">
                  <div
                    className="table-sectiondata booking-table half-width change-wdh "
                    style={{
                      position: "absolute",
                      left: "-8000px",
                      width: "90%",
                    }}
                    ref={ref}
                  >
                    {/* <div className='col-8'></div> */}
                    <div className="right col-4">
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
                    </div>
                    {/* slip start */}
                    <table className="mt-10 table table-striped tableNSEbooking table-bordered tableNSE ">
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            {order.order[0].isPaid != 0
                              ? "Upgrade Id |"
                              : ""}{" "}
                            Status{" "}
                          </td>
                          <td>
                            <b>
                              {" "}
                              {order.order[0].isPaid != 0
                                ? order?.order[0]?.booking_id + "|"
                                : ""}{" "}
                              {order?.order[0]?.order_status}
                            </b>
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
                            <b>{order?.order[0]?.name}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>
                            <b>{order?.order[0]?.mobile}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>E-Mail ID </td>
                          <td>
                            <b>{order?.order[0]?.email}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Booking Amount for Upgrade</td>
                          <td>
                            <b>
                              <NumberFormat
                                value={order?.order[0]?.booking_amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                thousandsGroupStyle="lakh"
                                prefix="&#8377;"
                              />
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td>Hub Address </td>
                          <td>
                            <b>{order?.order[0]?.dealer_address}</b>
                          </td>
                        </tr>
                        {order.order[0].isPaid != 0 ? (
                          <>
                            {" "}
                            <tr>
                              <td> Payment Method | Payment ID </td>
                              <td>
                                <b>
                                  RazorPay |{" "}
                                  {order?.order[0]?.razorpay_payment_id}
                                </b>
                              </td>
                            </tr>
                            <tr>
                              <td> Date | Time </td>
                              <td>
                                <b>{order?.order[0]?.updatedAt}</b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>
                    {/* slip End  */}
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
