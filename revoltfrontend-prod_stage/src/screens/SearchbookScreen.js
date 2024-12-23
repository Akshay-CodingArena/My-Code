import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { URL_API } from "../constants/cartConstants";
import { set } from "../../node_modules/express/lib/application";
import NumberFormat from "react-number-format";
import MetaTags from "react-meta-tags";

export default function SearchbookScreen(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [BookingId, SetBookingId] = useState("");
  const [OTP, setOTP] = useState("");
  const [reasontype, setReasontype] = useState("");
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [messagetype, setMessagetype] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [confmessage, setConfmessage] = useState("");
  const [confmessagetype, setConfmessagetype] = useState("");

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (id) {
      //console.log(id)
      SetBookingId(id);
      if (userId != "") {
        fetchOrders(id);
      } else {
        checkbooking_order(id);
      }
    }
  }, [id]);

  async function fetchOrders(BookingId) {
    if (BookingId === "") {
      setMessagetype("danger");
      setMessage("Please enter the booking id");
    } else {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/booking_order/${BookingId}`,
      );
      //console.log(data);
      if (!data || data?.data?.status == false) {
        setMessagetype("danger");
        setMessage(data?.data?.message);
      } else {
        setMessagetype("success");
        setMessage(data?.data?.message);
        setShowotp(true);
      }
    }
  }

  async function checkbooking_order(BookingId) {
    if (BookingId === "") {
      setMessagetype("danger");
      setMessage("Please enter the booking id");
    } else {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/checkbooking_order/${BookingId}`,
      );
      //console.log(data);
      if (!data || data?.data?.status == false) {
        setMessagetype("danger");
        setMessage(data?.data?.message);
      } else {
        setMessagetype("danger");
        setMessage(data?.data?.message);
        //setShowotp(true);
      }
    }
  }

  const user_type = userInfo?.isSeller ? "Dealer" : "Customer";
  const userId = userInfo?.isSeller ? userInfo.id : "";

  async function fetchOrders_validotp(BookingId, OTP) {
    // console.log(BookingId);

    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/booking_order_validate`,
      {
        BookingId: BookingId,
        OTP: OTP,
      },
    );

    if (!data) {
      setMessagetype("danger");
      setMessage("Something went wrong!");
    } else if (!data || data?.data?.status == false) {
      setMessagetype("danger");
      setMessage("Enter a valid OTP!");
    } else if (
      !data ||
      data?.data?.dms_order_status == "Sold" ||
      data?.data?.dms_order_status == "Delivered"
    ) {
      setMessagetype("danger");
      setMessage(
        "Super BIke is already Sold and Delivery, Can not Cancelled, Please conact Revolt Team",
      );
    } else {
      console.log(data);
      setMessagetype("success");
      setMessage("");
      //console.log('bijendra');
      setOrders(data?.data?.orderItems);

      document.getElementById("result").scrollIntoView();
    }
  }
  async function Cash_Orders_Cancelled(
    BookingId,
    reasontype,
    comment,
    user_type,
    userId,
  ) {
    // console.log(BookingId);
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/cash_order_cancel`,
      {
        cancelled_by: user_type,
        cancelled_userid: userId,
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
  async function Orders_Cancelled(
    BookingId,
    reasontype,
    comment,
    user_type,
    userId,
  ) {
    console.log(BookingId);
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/order_cancel`,
      {
        cancelled_by: user_type,
        cancelled_userid: userId,
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

    if (userId != "") {
      fetchOrders(BookingId);
    } else {
      checkbooking_order(BookingId);
    }

    //dispatch(signin(BookingId));
  };

  const submitHandlerotp = (e) => {
    e.preventDefault();
    if (BookingId === "") {
      setMessagetype("danger");
      setMessage("Please enter the booking id");
    } else if (OTP === "") {
      setMessagetype("danger");
      setMessage("Please enter the OTP");
    } else {
      fetchOrders_validotp(BookingId, OTP);
    }
  };

  const submitHandlercancel = (e) => {
    e.preventDefault();
    ///alert(reasontype);
    if (reasontype === "") {
      setConfmessagetype("danger");
      setConfmessage("Please select Reason Type");
    } else if (comment === "") {
      setConfmessagetype("danger");

      setConfmessage("Please enter the comment");
    } else {
      setConfmessagetype("");
      setConfmessage("");
      console.log("Booking Cancelled from SearchBook Screen");
      if (orders[0].razorpay_payment_id == "cash") {
        Cash_Orders_Cancelled(BookingId, reasontype, user_type, userId);
      } else {
        Orders_Cancelled(BookingId, reasontype, comment, user_type, userId);
      }
    }
    //dispatch(signin(BookingId));
  };

  useEffect(() => {
    if (orders && orders.otp === OTP) {
      //navigate(`/order/${orders.orderItems[0].order_id}`);
      //console.log("validate");
      //console.log(orders);
    }
  }, [navigate, orders, OTP]);

  return (
    <>
      <MetaTags id="home">
        <title>Cancel Booking with Revolt Motors</title>
        <meta
          name="description"
          content="Modify your booking with Revolt Motors"
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

      <div className="light-grey searchBooking padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-common">
                <h4 className="text-center font-600">Cancel My Revolt</h4>

                {message && (
                  <MessageBox variant={messagetype}>{message}</MessageBox>
                )}

                <div className="form-style no-input-padding">
                  <form className="example" method="get" action>
                    {id == "" || id == null ? (
                      <>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter you Booking ID"
                            id="booking_id"
                            className="form-control"
                            value={BookingId}
                            required
                            onChange={(e) => SetBookingId(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^a-z-0-9]+)/gi,
                                "",
                              ))
                            }
                          />
                        </div>
                        {!showotp ? (
                          <div className="submit-btn">
                            <button
                              className="sl-btn button"
                              onClick={submitHandler}
                            >
                              Search Booking
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter you Booking ID"
                            id="booking_id"
                            className="form-control"
                            value={BookingId}
                            disabled
                            required
                            onChange={(e) => SetBookingId(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^a-z-0-9]+)/gi,
                                "",
                              ))
                            }
                          />
                        </div>
                        {!showotp ? (
                          <div className="submit-btn">
                            <button className="button" disabled>
                              Search Booking
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </form>

                  {showotp && (
                    <>
                      <div className="form-group"></div>
                      <form className="otp" method="get" action>
                        <div className="form-group">
                          <input
                            type="number"
                            id="otp"
                            maxlength="6"
                            className="form-control"
                            placeholder="Enter OTP"
                            onChange={(e) => setOTP(e.target.value)}
                            pattern="d{10}"
                            onInput={(e) =>
                              (e.target.value = e.target.value.slice(0, 6))
                            }
                          ></input>
                        </div>
                        <div className="submit-btn">
                          <button className="button" onClick={submitHandlerotp}>
                            {" "}
                            OTP Validate
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(() => {
        if (orders.length) {
          return (
            <div
              className=" searchBooking padding-top-100 padding-bottom-100"
              id="result"
            >
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    {orders?.map((item) => (
                      <div>
                        <div className="box-request">
                          <div className="req-title">
                            <h3>
                              Booking ID :{" "}
                              <span className="red-color">{BookingId}</span>
                            </h3>
                          </div>
                          <div className="req-info">
                            <div className="row align-items-center">
                              <div className="col-6">
                                <div className="info-image mb-4 pr-3">
                                  <img src={`/images/${item.image}`} />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="space-border">
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="mb-4">
                                        <div className="row align-items-center">
                                          <div className="col-3">
                                            <div className="req-data">
                                              <h4>Model</h4>
                                            </div>
                                          </div>
                                          <div className="col-9">
                                            <div className="model-name">
                                              {item.item_name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="req-data mb-4">
                                        <h4>Expected Delivery Month</h4>
                                        <p>Immediate</p>
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
                                            Booking - {item.createdAt}
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
                                        <td>Vehicle Ex-Showroom Price</td>
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
                                        <td>Price</td>
                                        <td>
                                          <NumberFormat
                                            value={item.price}
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
                                      {(item.order_status == "Cancel" ||
                                        item.order_status == "Delivered" ||
                                        item.order_status == "Sold") && (
                                        <tr>
                                          <td>Order Status</td>
                                          <td>{item.order_status}</td>
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
                                          <option value="">
                                            --Select Reason Type --
                                          </option>
                                          <option value="Pricing">
                                            Pricing
                                          </option>
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

                        <div className="list-ch">
                          <ul className="mt-4 pl-0">
                            <li>
                              * The price of motorcycle shall be applicable as
                              prevailing on the date of delivery of motorcycle
                              to customer.
                            </li>
                            <li>
                              1. Claimable only once per Aadhar card. T&amp;C
                              apply.
                            </li>
                            <li>
                              2. Your booking amount will be adjusted with the
                              On-Road price. Registration and applicable Road
                              Tax will be additional based on actuals.
                            </li>
                            <li>
                              3. On-Road Price for Revolt Purchase Plan = “Cost
                              Before On-Road” + Add. cost of Registration/RTO
                              (On Actuals) + Insurance + Smart Card + 4G
                              Connectivity Charges + other statutory applicable
                              charges.
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })()}
    </>
  );
}
