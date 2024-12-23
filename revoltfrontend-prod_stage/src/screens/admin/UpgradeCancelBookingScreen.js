import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { URL_API } from "../../constants/cartConstants";
import { set } from "../../../node_modules/express/lib/application";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";

export default function UpgradeCancelBookingScreen(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const [BookingId, SetBookingId] = useState('');
  const [OTP, setOTP] = useState("");
  const [reasontype, setReasontype] = useState("customer");
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [messagetype, setMessagetype] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [confmessage, setConfmessage] = useState("");
  const [confmessagetype, setConfmessagetype] = useState("");
  const params = useParams();
  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const { id: BookingId } = params;

  async function fetchOrders(BookingId) {
    if (BookingId === "") {
      setMessagetype("danger");
      setMessage("Please enter the booking id");
    } else {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/booking_order/${BookingId}`,
      );
      setMessagetype("success");
      setMessage("OTP Sent Successfully.");
      setShowotp(true);
    }
  }

  async function fetchOrders_validotp(BookingId, OTP) {
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/upgrade_booking_order_validate`,
      {
        BookingId: BookingId,
        OTP: OTP,
      },
    );

    if (!data) {
      setMessagetype("danger");
      setMessage("Something went wrong!");
    } else {
      console.log(data);
      setMessagetype("success");
      setMessage("");
      //console.log('bijendra');
      setOrders(data.data.orderItems);
    }
  }

  async function Upgrade_Orders_Cancelled(
    BookingId,
    reasontype,
    comment,
    user_type,
  ) {
    // console.log(BookingId);
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/upgrade_order_cancel`,
      {
        cancelled_by: "admin",
        cancelled_userid: userInfo_myArr.id,
        BookingId: BookingId,
        reason_type: reasontype,
        comment: comment,
        user_type: user_type,
      },
    );
    if (data) {
      console.log(data);
      setMessagetype("success");
      setMessage("Order Cancel Successfully");
      setOrders([]);

      navigate(`/thankyoucancel/${data.data.booking_id}`);
    } else {
      setMessagetype("danger");
      setMessage("Something went wrong!");
    }
  }
  async function Orders_Cancelled(BookingId, reasontype, comment, user_type) {
    // console.log(BookingId);
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/upgrade_order_cancel`,
      {
        cancelled_by: "admin",
        cancelled_userid: userInfo_myArr.id,
        BookingId: BookingId,
        reason_type: reasontype,
        comment: comment,
        user_type: user_type,
      },
    );
    if (data) {
      console.log(data);
      setMessagetype("success");
      setMessage("Order Cancel Successfully");
      setOrders([]);

      navigate(`/thankyoucancel/${data.data.booking_id}`);
    } else {
      setMessagetype("danger");
      setMessage("Something went wrong!");
    }
  }

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    fetchOrders(BookingId);
  };

  const submitHandlercancel = (e) => {
    e.preventDefault();

    if (comment === "") {
      setConfmessagetype("danger");

      setConfmessage("Please enter the comment");
    } else {
      setConfmessagetype("");
      setConfmessage("");
      // Orders_Cancelled(BookingId,reasontype,comment, "admin");
      console.log("Cancelled from screen UpgradeCancel Booking Screen");
      Upgrade_Orders_Cancelled(BookingId, reasontype, comment, "admin");
    }
  };

  useEffect(() => {
    fetchOrders_validotp(BookingId, "OTP");
  }, []);

  return (
    <>
      <MetaTags id="cancelbooking">
        <title>Cancel Booking with Revolt Motors</title>
        <meta
          name="description"
          content="Modify your booking with Revolt Motors
"
        />
        <meta
          property="og:title"
          content="Book now India's 1st AI-enabled motorcycle
"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub.
"
        />
      </MetaTags>
      <section className="light-grey userDashboard padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row dashboard-section">
            <div className="col-12">
              <div className="right-profile-info">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Cancel Booking</h3>
                    </div>
                  </div>
                </div>

                <div className="common-section">
                  {orders.map((item) => (
                    <div className="box-request">
                      <div className="req-title">
                        <h3>
                          Booking ID :{" "}
                          <span className="red-color">{BookingId}</span>
                        </h3>
                      </div>
                      <div className="req-info">
                        <div className="row align-items-center">
                          {/*   */}
                          <div className="col-12">
                            <div className="space-border">
                              <div className="row">
                                <div className="col-12">
                                  <div className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-3">
                                        <div className="req-data">
                                          <h4>Revolt Hub</h4>
                                        </div>
                                      </div>
                                      <div className="col-9">
                                        <div className="model-name">
                                          {item.item_name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="req-data flex-dta">
                                    <p>
                                      <span>
                                        <i
                                          className="fa fa-map-marker"
                                          aria-hidden="true"
                                        />
                                      </span>
                                      <span>
                                        {item.area_name}/{item.city_name}
                                      </span>
                                    </p>
                                    <p>
                                      <span>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        />
                                      </span>
                                      <span>
                                        Upgrade Booking - {item.createdAt}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="booking-table">
                              <table className="table table-striped tableNSEbooking">
                                <thead>
                                  <tr>
                                    <th>Booking Amount </th>
                                    <th>
                                      <NumberFormat
                                        value={item.booking_amount}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandsGroupStyle="lakh"
                                        prefix="&#8377;"
                                      />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Amount</td>
                                    <td>
                                      <NumberFormat
                                        value={item.itemsPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandsGroupStyle="lakh"
                                        prefix="&#8377;"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Name</td>
                                    <td>{item.customer_name}</td>
                                  </tr>
                                  <tr>
                                    <td>Email Id</td>
                                    <td>{item.email}</td>
                                  </tr>
                                  <tr>
                                    <td>Mobile</td>
                                    <td>{item.mobile}</td>
                                  </tr>
                                  {item.order_status == "Cancel" && (
                                    <tr>
                                      <td>Order Status</td>
                                      <td>Cancelled</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>

                            {item.order_status != "Cancel" && (
                              <>
                                <div className="textareabox form-style no-input-padding mt-4">
                                  {confmessage && (
                                    <MessageBox variant={confmessagetype}>
                                      {confmessage}
                                    </MessageBox>
                                  )}
                                  <div className="form-group">
                                    <select
                                      id="reasontype"
                                      placeholder="Reason Type"
                                      className="form-control"
                                      required
                                      value={reasontype}
                                      onChange={(e) =>
                                        setReasontype(e.target.value)
                                      }
                                    >
                                      <option>--Select Reason Type --</option>
                                      <option value="Pricing">Pricing</option>
                                      <option value="Finance Issue">
                                        Finance Issue
                                      </option>
                                      <option value="Late Delivery">
                                        Late Delivery
                                      </option>
                                      <option value="Bought another vehicle">
                                        Bought another vehicle
                                      </option>
                                      {/* <option value="EV safety and anxiety">
                                        EV safety and anxiety
                                      </option> */}
                                      <option value="Poor Feedback">
                                        Poor Feedback
                                      </option>
                                      <option value="Outstation/Customer Relocation">
                                        Outstation/Customer Relocation
                                      </option>
                                      <option value="Others">Others</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <textarea
                                      name="comment"
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      required
                                      className="form-control"
                                      placeholder={
                                        "Please elaborate the reason for cancellation."
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="text-centers mx-autos mt-2">
                                  <div
                                    className="cancel_biooking sl-btn"
                                    onClick={submitHandlercancel}
                                  >
                                    Cancel Booking
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="list-ch">
                    <ul className="mt-4 pl-0">
                      <li>
                        * The price of motorcycle shall be applicable as
                        prevailing on the date of delivery of motorcycle to
                        customer.
                      </li>
                      <li>
                        1. Claimable only once per Aadhar card. T&amp;C apply.
                      </li>
                      <li>
                        2. Your booking amount will be adjusted with the On-Road
                        price. Registration and applicable Road Tax will be
                        additional based on actuals.
                      </li>
                      <li>
                        3. On-Road Price for Revolt Purchase Plan = “Cost Before
                        On-Road” + Add. cost of Registration/RTO (On Actuals) +
                        Insurance + Smart Card + 4G Connectivity Charges + other
                        statutory applicable charges.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
