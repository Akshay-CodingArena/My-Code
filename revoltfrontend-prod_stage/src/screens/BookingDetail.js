import { axios as Axios } from "../utilities/axios";
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
import { Helmet } from "react-helmet";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import NumberFormat from "react-number-format";
export default function BookingDetail(props) {
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //

  const ref = React.createRef();
  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, setLoading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
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
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, []);

  const slip_state = stateList.find(
    (c) => c.state_id == order?.shippingAddress[0]?.state
  )?.state_name;
  const slip_city = cityList.find(
    (c) => c.city_id == order?.shippingAddress[0]?.city
  )?.city_name;
  const slip_hub = hubList.find(
    (c) => c.hub_id == order?.shippingAddress[0]?.area
  )?.hub_name;

  const slip_country = order?.shippingAddress[0]?.country;

  console.log("Order deatils : " + JSON.stringify(order));
  console.log(order?.shippingAddress[0]?.mobile);
  var authenticate = userInfo?.mobile == order?.shippingAddress[0]?.mobile;

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : authenticate ? (
    <>
      <Helmet>
        {/*       
            <script dangerouslySetInnerHTML={{__html: ` 
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MHBT7XT');
            
            `}}>
            </script>
            <script type="text/javascript" dangerouslySetInnerHTML={{
      __html: `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHBT7XT"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></script> */}
      </Helmet>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Booking Confirmation</h3>
                    </div>
                    <div
                      className="col-6 text-end"
                      style={{
                        display: "flex",
                        rowGap: "5px",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* {order.order[0].order_status == "Created"  ?
                                                     <Link className='sl-btn mr-2' to={`/editbooking/${orderId}`}>Edit </Link>
                                                     :""} */}
                      <button
                        className="sl-btn edit-btn"
                        onClick={() => {
                          navigate(
                            `/editbooking/${window.location.pathname.split("/")[2]}`
                          );
                        }}
                      >
                        Edit &nbsp;
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </button>
                      {order.order[0].order_status != "Unpaid" ? (
                        <Pdf
                          targetRef={ref}
                          filename="Receipt_Booking.pdf"
                          y={20}
                          x={5}
                          scale={0.7}
                        >
                          {({ toPdf }) => (
                            <button
                              className="sl-btn dwnl-btn"
                              style={{ marginLeft: "10px" }}
                              onClick={async () => {
                                console.log("order is", order);
                                let data = order?.pdf?.data;
                                if (order.order[0].order_status == "Cancel") {
                                  const response = await Axios.get(
                                    URL_API +
                                      "/api/v1/customer/order_cancel/" +
                                      order.booking_ref_id
                                  );
                                  data = response.data.data.pdf.data;
                                }
                                let blob = new Blob([
                                  new Uint8Array(data).buffer,
                                ]);
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement("a");
                                link.href = url;
                                link.setAttribute(
                                  "download",
                                  "Invoice-Receipt.pdf"
                                );
                                link.click();
                                //    toPdf()
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
                      ) : (
                        ""
                      )}
                      {order?.order[0]?.schemeStatus ? (
                        <button
                          className="sl-btn"
                          style={{ marginLeft: "20px" }}
                          onClick={async () => {
                            const response = await fetch(
                              order.order[0].attachmentUrl
                            );
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            //  const url = order.order[0].attachmentUrl;
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", "ID-Proof.png");
                            link.click();
                            // window.open(order.order[0].attachmentUrl, "_blank");
                          }}
                        >
                          Download ID Proof &nbsp;
                          <i
                            className="fa fa-file-pdf-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                      ) : null}
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
                          alt="Revolt Motors Logo"
                          src={`/images/revolt-motors-logo.svg`}
                        />
                        <img
                          className="fl-logo"
                          alt="Revolt Logo"
                          src={`/images/logo-name.svg`}
                        />
                      </div>
                    </div>
                    <table className="mt-10 table table-striped tableNSEbooking table-bordered tableNSE">
                      <tbody>
                        {order.order[0].isPaid != 0 ? (
                          <tr>
                            <td> Current Status</td>
                            <td>
                              {order.order[0].order_status == "Created" ? (
                                <b> Active </b>
                              ) : (
                                <b> {order.order[0].order_status}</b>
                              )}
                            </td>
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
                        {order?.order[0]?.schemeStatus ? (
                          <>
                            <tr>
                              <td>Company Name</td>
                              <td>
                                <b>{order?.order[0]?.company_name}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>Employee Id</td>
                              <td>
                                <b>{order?.order[0]?.emp_code}</b>
                              </td>
                            </tr>
                            {/* <tr>
                          <td>ID Proof Submitted</td>
                          <td>
                            <a href={order?.order[0]?.attachmentUrl}>{order?.order?.[0]?.id_proof.slice(0,30)}</a>
                          </td>
                        </tr> */}
                            <tr>
                              <td>Employee Discount Offer</td>
                              <td>
                                <b>{order?.order[0]?.schemeStatus}</b>
                              </td>
                            </tr>
                          </>
                        ) : null}
                        <tr>
                          <td>Pincode</td>
                          <td>
                            <b>{order?.order[0]?.pincode}</b>
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
                        {/*  */}
                        {order.order[0].order_status == "Created" ? (
                          <>
                            {order.order[0].isPaid == 1 &&
                            order.order[0].order_status != "Delivered" ? (
                              <>
                                {/* <tr>
                                  <td>Revolt Purchase Plan</td>
                                  <td>
                                    <b>
                                      {order?.shippingAddress[0]?.plan_type}
                                    </b>
                                  </td>
                                </tr> */}
                                <tr>
                                  <td>
                                    {order.order[0].order_status == "Cancel" ? (
                                      "Refund Amount (*)"
                                    ) : (
                                      <>Booking Amount (**)</>
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
                                <tr>
                                  <td>Vehicle Ex-Showroom Price *</td>
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
                                <tr>
                                  <td>Revolt Charger </td>
                                  <td>
                                    <b>
                                      <NumberFormat
                                        value={
                                          order?.shippingAddress[0]?.charger
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandsGroupStyle="lakh"
                                        prefix="&#8377;"
                                      />
                                    </b>
                                  </td>
                                </tr>

                                {/* My Revolt Plan start */}
                                {(order?.shippingAddress[0]?.plan_type ==
                                  "My Revolt Plan" ||
                                  order?.shippingAddress[0]?.plan_type ==
                                    "5.99% Plan") && (
                                  <>
                                    <tr>
                                      <td>
                                        Monthly Payment <sup>1</sup>
                                      </td>
                                      <td>
                                        <b>
                                          <NumberFormat
                                            value={
                                              order?.shippingAddress[0]
                                                ?.emi_amount
                                            }
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                          />
                                        </b>
                                      </td>
                                    </tr>
                                  </>
                                )}
                                {/* My Revolt Plan end */}

                                {/* <tr>
                                                                            <td>Effective Cost before on-Road  </td>
                                                                            <td>
                                                                            <b> <NumberFormat value={order.order[0].itemsPrice + order?.shippingAddress[0]?.charger} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" /></b>
                                                                            </td>
                                                                        </tr> */}

                                {order.order[0].order_status != "Cancel" ? (
                                  <tr>
                                    <td>Payment Method | Payment ID</td>
                                    <td>
                                      <b>
                                        {(order.paymentMethod = "Razor Pay")} |{" "}
                                        {order.order[0].razorpay_payment_id}
                                      </b>
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}
                            <tr>
                              <td>Order ID</td>
                              <td>
                                <b>{order.order[0].razorpay_order_id}</b>
                              </td>
                            </tr>

                            {order.order[0].order_status == "Cancel" ? (
                              <></>
                            ) : (
                              <tr>
                                <td>Booking Date | Booking Time </td>
                                <td>
                                  <b>
                                    {order.order[0].createdAt} |{" "}
                                    {order.order[0].createdTime}
                                  </b>
                                </td>
                              </tr>
                            )}

                            {/*  */}
                            {order.order[0].isPaid == 0 ? (
                              <tr>
                                <td>Payment Status</td>
                                <td>
                                  {order.order[0].isPaid === 1 ? (
                                    <>
                                      <b> Paid</b>
                                    </>
                                  ) : (
                                    <>
                                      <b>Not Paid (*) </b>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}

                            {/*  */}
                            {order.order[0].order_status == "Cancel" ? (
                              <>
                                <tr>
                                  <td>Refund Method | Refund ID</td>
                                  <td>
                                    {/* <b>RazorPay | {order.order[0].refund_id} </b>  */}
                                    <b>
                                      {" "}
                                      {order.order[0].refund_id ? (
                                        <>
                                          RazorPay | {order.order[0].refund_id}{" "}
                                        </>
                                      ) : (
                                        "NA"
                                      )}{" "}
                                    </b>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Cancellation Date | Cancellation Time</td>
                                  <td>
                                    <b>
                                      {order.order[0].cancel_date} |{" "}
                                      {order.order[0].cancel_dateTime}
                                    </b>
                                  </td>
                                </tr>
                              </>
                            ) : (
                              ""
                            )}

                            <tr>
                              <td colSpan="2">
                                <b>
                                  * The price of vehicle shall be applicable as
                                  prevailing on the date of delivery of vehicle
                                  to customer.
                                  <br />
                                  ** Your booking amount will be adjusted with
                                  the On-Road price. Registration , Road Tax,
                                  Insurance,{" "}
                                  {["RV400BRZ", "RV1", "RV1+"].includes(
                                    order.order[0].name
                                  )
                                    ? ""
                                    : ", 4G Connectivity"}{" "}
                                  and other statutory applicable charges will be
                                  additional based on actuals. 1
                                </b>
                                <br />
                                <b>
                                  * State incentive (If Applicable) has to be
                                  claimed directly by the customer from the
                                  state government (Direct to Customer).
                                </b>
                                <b>
                                  * Booking cancellations are only permitted
                                  within 90 days of booking.
                                </b>
                                <b>
                                  * Price Benefit: Available for a limited stock
                                  only.
                                </b>

                                {order?.shippingAddress[0]?.plan_type ==
                                  "My Revolt Plan" && (
                                  <>
                                    <br />
                                    <b>
                                      <sup>1</sup> For more information, Please
                                      contact your nearest dealership.
                                    </b>
                                    <br />

                                    <b>
                                      <sup>1</sup> Down payment excluding
                                      booking amount- INR 5,216
                                    </b>
                                    <br />

                                    <b>
                                      <sup>1</sup> Number of Monthly payments 42
                                      months.
                                    </b>
                                    <br />
                                    <b>
                                      <sup>1</sup> Price may vary according to
                                      state.
                                    </b>
                                  </>
                                )}
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {/*  */}

                        {/*  */}
                        {order.order[0].order_status == "Cancel" ? (
                          <>
                            {order.order[0].isPaid == 1 &&
                            order.order[0].order_status != "Delivered" ? (
                              <>
                                <tr>
                                  <td>Refund Amount (*)</td>
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
                                  <tr>
                                    <td>Payment Method | Payment ID</td>
                                    <td>
                                      <b>
                                        {(order.paymentMethod = "Razor Pay")} |{" "}
                                        {order.order[0].razorpay_payment_id}
                                      </b>
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}
                            <tr>
                              <td>Order ID</td>
                              <td>
                                <b>{order.order[0].razorpay_order_id}</b>
                              </td>
                            </tr>

                            <tr>
                              <td>Booking Date | Booking Time </td>
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
                                  <td>Cancellation Date | Cancellation Time</td>
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
                                        {order.order[0].ref_dateTime}
                                      </b>
                                    ) : (
                                      "NA"
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Refund ID | Refund Status</td>
                                  <td>
                                    <b>
                                      {" "}
                                      {order.order[0].refund_id
                                        ? order.order[0].refund_id |
                                          order.order[0].status_message
                                        : "Refund is under process"}{" "}
                                    </b>
                                  </td>
                                </tr>
                              </>
                            ) : (
                              ""
                            )}

                            <tr>
                              <td colSpan="2">
                                <b>* Amount paid at the time of booking.</b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {/*  */}

                        {/*  */}
                        {order.order[0].order_status == "Delivered" ? (
                          <>
                            <tr>
                              <td>Booking Amount (*)</td>
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
                              <td>Payment Method | Payment ID</td>
                              <td>
                                <b>
                                  {(order.paymentMethod = "Razor Pay")} |{" "}
                                  {order.order[0].razorpay_payment_id}
                                </b>
                              </td>
                            </tr>

                            <tr>
                              <td>Order ID</td>
                              <td>
                                <b>{order.order[0].razorpay_order_id}</b>
                              </td>
                            </tr>

                            <tr>
                              <td>Booking Date | Booking Time </td>
                              <td>
                                <b>
                                  {order.order[0].createdAt} |{" "}
                                  {order.order[0].createdTime}
                                </b>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="2">
                                <b>
                                  * Your booking amount will be adjusted with
                                  the On-Road price. Registration , Road Tax,
                                  Insurance,{" "}
                                  {order.order[0].name == "RV400BRZ"
                                    ? ""
                                    : ", 4G Connectivity"}{" "}
                                  and other statutory applicable charges will be
                                  additional based on actuals.
                                </b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {/*  */}

                        {/*  */}
                        {order.order[0].order_status == "Unpaid" ? (
                          <>
                            {/*  */}
                            {order.order[0].isPaid == 0 ? (
                              <tr>
                                <td>Payment Status</td>
                                <td>
                                  {order.order[0].isPaid === 1 ? (
                                    <>
                                      <b> Paid</b>
                                    </>
                                  ) : (
                                    <>
                                      <b>Not Paid (*) </b>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}

                            <tr>
                              <td colSpan="2">
                                <b>* Booking not completed successfully.</b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {/*  */}
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
                          alt="Revolt Logo"
                          src={`/images/logo-name.svg`}
                        />
                      </div>
                    </div>
                    {/* slip start */}
                    <table className="mt-10 table table-striped tableNSEbooking table-bordered tableNSE ">
                      <tbody>
                        {order.order[0].isPaid != 0 ? (
                          <tr>
                            <td> Current Status</td>
                            <td>
                              {order.order[0].order_status == "Created" ? (
                                <b> Active </b>
                              ) : (
                                <b> {order.order[0].order_status}</b>
                              )}
                            </td>
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
                        {order?.order[0]?.schemeStatus ? (
                          <>
                            <tr>
                              <td>Company Name</td>
                              <td>
                                <b>{order?.order[0]?.company_name}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>Employee Id</td>
                              <td>
                                <b>{order?.order[0]?.emp_code}</b>
                              </td>
                            </tr>
                            {/* <tr>
                          <td>ID Proof Submitted</td>
                          <td>
                            <a href={order?.order[0]?.attachmentUrl}>{order?.order?.[0]?.id_proof.slice(0,30)}</a>
                          </td>
                        </tr> */}
                            <tr>
                              <td>Employee Discount Offer</td>
                              <td>
                                <b>{order?.order[0]?.schemeStatus}</b>
                              </td>
                            </tr>
                          </>
                        ) : null}
                        <tr>
                          <td>Pincode</td>
                          <td>
                            <b>{order?.order[0]?.pincode}</b>
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
                          <td>Revolt Purchase Plan</td>
                          <td>
                            <b>{order?.shippingAddress[0]?.plan_type}</b>
                          </td>
                        </tr> */}

                        <tr>
                          <td>
                            {order.order[0].order_status == "Cancel" ? (
                              "Refund Amount (*)"
                            ) : (
                              <>Booking Amount (**)</>
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
                        {order.order[0].isPaid == 1 &&
                        order.order[0].order_status != "Delivered" ? (
                          <>
                            {order.order[0].order_status == "Cancel" ? (
                              ""
                            ) : (
                              <>
                                <tr>
                                  <td>Vehicle Ex-Showroom Price *</td>
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
                            )}
                            <tr>
                              <td>Revolt Charger </td>
                              <td>
                                <b>
                                  <NumberFormat
                                    value={order?.shippingAddress[0]?.charger}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    thousandsGroupStyle="lakh"
                                    prefix="&#8377;"
                                  />
                                </b>
                              </td>
                            </tr>

                            {/* My Revolt Plan start */}
                            {(order?.shippingAddress[0]?.plan_type ==
                              "My Revolt Plan" ||
                              order?.shippingAddress[0]?.plan_type ==
                                "5.99% Plan") && (
                              <>
                                <tr>
                                  <td>
                                    Monthly Payment <sup>1</sup>
                                  </td>
                                  <td>
                                    <b>
                                      <NumberFormat
                                        value={
                                          order?.shippingAddress[0]?.emi_amount
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandsGroupStyle="lakh"
                                        prefix="&#8377;"
                                      />
                                    </b>
                                  </td>
                                </tr>
                              </>
                            )}
                            {/* My Revolt Plan end */}
                            {/* <tr>
                                                                            <td>Effective Cost before on-Road </td>
                                                                            <td>
                                                                            <b> <NumberFormat value={order.order[0].itemsPrice + order?.shippingAddress[0]?.charger} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" /></b>
                                                                            </td>
                                                                        </tr> */}

                            {order.order[0].order_status != "Cancel" ? (
                              <tr>
                                <td>Payment Method | Payment ID</td>
                                <td>
                                  <b>
                                    {(order.paymentMethod = "Razor Pay")} |{" "}
                                    {order.order[0].razorpay_payment_id}
                                  </b>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {/*  */}
                        {order.order[0].order_status == "Delivered" ? (
                          <>
                            <tr>
                              <td>
                                {order.order[0].order_status == "Cancel" ? (
                                  "Refund Amount (*)"
                                ) : (
                                  <>Booking Amount (*)</>
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

                            <tr>
                              <td>Payment Method | Payment ID</td>
                              <td>
                                <b>
                                  {(order.paymentMethod = "Razor Pay")} |{" "}
                                  {order.order[0].razorpay_payment_id}
                                </b>
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}

                        {order.order[0].order_status == "Cancel" ? (
                          <></>
                        ) : (
                          <tr>
                            <td>Booking Date | Booking Time </td>
                            <td>
                              {order.order[0].order_status != "Unpaid" ? (
                                <b>
                                  {order.order[0].createdAt} |{" "}
                                  {order.order[0].createdTime}
                                </b>
                              ) : (
                                <b>NA</b>
                              )}
                            </td>
                          </tr>
                        )}

                        {/*  */}
                        {order.order[0].isPaid == 0 ? (
                          <tr>
                            <td>Payment Status</td>
                            <td>
                              {order.order[0].isPaid === 1 ? (
                                <>
                                  <b> Paid</b>
                                </>
                              ) : (
                                <>
                                  <b>Not Paid (*) </b>
                                </>
                              )}
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}

                        {/*  */}
                        {order.order[0].order_status == "Cancel" ? (
                          <>
                            <tr>
                              <td>Refund Method | Refund ID</td>
                              <td>
                                {/* <b>RazorPay | {order.order[0].refund_id} </b>  */}
                                <b>
                                  {" "}
                                  {order.order[0].refund_id ? (
                                    <>RazorPay | {order.order[0].refund_id} </>
                                  ) : (
                                    "NA"
                                  )}{" "}
                                </b>
                              </td>
                            </tr>

                            <tr>
                              <td>Cancellation Date | Cancellation Time</td>
                              <td>
                                <b>
                                  {order.order[0].cancel_date} |{" "}
                                  {order.order[0].cancel_dateTime}
                                </b>
                              </td>
                            </tr>
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
                          <td colSpan="2">
                            {order.order[0].order_status == "Delivered" ? (
                              <b>
                                * Your booking amount will be adjusted with the
                                On-Road price. Registration , Road Tax,
                                Insurance,{" "}
                                {order.order[0].name == "RV400BRZ"
                                  ? ""
                                  : ", 4G Connectivity"}{" "}
                                and other statutory applicable charges will be
                                additional based on actuals.
                              </b>
                            ) : (
                              <>
                                {order.order[0].isPaid == 0 ? (
                                  <b>* Booking not completed successfully.</b>
                                ) : (
                                  <>
                                    {order.order[0].order_status == "Cancel" ? (
                                      <>
                                        <b>
                                          * Amount paid at the time of booking
                                        </b>
                                      </>
                                    ) : (
                                      <>
                                        <b>
                                          * The price of vehicle shall be
                                          applicable as prevailing on the date
                                          of delivery of vehicle to customer.
                                          <br />
                                          ** Your booking amount will be
                                          adjusted with the On-Road price.
                                          Registration , Road Tax, Insurance,{" "}
                                          {order.order[0].name == "RV400BRZ"
                                            ? ""
                                            : ", 4G Connectivity"}{" "}
                                          and other statutory applicable charges
                                          will be additional based on actuals.
                                        </b>
                                        <br />
                                        <b>
                                          * State incentive (If Applicable) has
                                          to be claimed directly by the customer
                                          from the state government (Direct to
                                          Customer).
                                        </b>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            {order?.shippingAddress[0]?.plan_type ==
                              "My Revolt Plan" && (
                              <>
                                <br />
                                <b>
                                  <sup>1</sup> For more information, Please
                                  contact your nearest dealership.
                                </b>
                                <br />

                                <b>
                                  <sup>1</sup> Down payment excluding booking
                                  amount- INR 5,216
                                </b>
                                <br />

                                <b>
                                  <sup>1</sup> Number of Monthly payments 42
                                  months.
                                </b>

                                <br />
                                <b>
                                  <sup>1</sup> Price may vary according to
                                  state.
                                </b>
                              </>
                            )}
                          </td>
                        </tr>
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
  ) : (
    <>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-12 text-center">
                      <h3 className="tab-title">Not a valid user</h3>
                    </div>
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
