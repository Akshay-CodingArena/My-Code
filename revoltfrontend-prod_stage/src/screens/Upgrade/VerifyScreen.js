import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axios as Axios } from "../../utilities/axios";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { URL_API } from "../../constants/cartConstants";
import { UPGRADE_ORDER_DETAILS_RESET } from "../../constants/orderConstants";
import { set } from "../../../node_modules/express/lib/application";
import NumberFormat from "react-number-format";
import MetaTags from "react-meta-tags";
import Upgrade from "./UpgradeScreen";

export default function VerifyScreen(props) {
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
  const [mobile, setMobile] = useState("");

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (id) {
      //console.log(id)
      setMobile(id);
      fetchOrders(id);
    }
  }, [id]);

  async function fetchOrders(mobile) {
    if (mobile === "") {
      setMessagetype("danger");
      setMessage("Please enter the registered mobile number");
    } else {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/upgrade_verify_customer/${mobile}`,
      );
      //console.log(data);
      if (!data || data?.data?.status == false) {
        setMessagetype("danger");
        // setMessage(data?.data?.message);
        setMessage(
          "Sorry, You are not eligible for this offer. For any assistance : Please get in touch with help desk.",
        );
      } else {
        setMessagetype("success");
        setMessage(data?.data?.message);
        setShowotp(true);
      }
    }
  }

  const user_type = userInfo?.isSeller ? "Dealer" : "Customer";
  const userId = userInfo?.isSeller ? userInfo.id : "";

  async function fetchOrders_validotp(mobile, OTP) {
    // console.log(mobile);

    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/upgrade_get_userdeatil`,
      {
        mobile: mobile,
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

      setOrders(data?.data?.orderItems);

      document.getElementById("result").scrollIntoView();
    }
  }

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    fetchOrders(mobile);
    // checkbooking_order(mobile);

    //dispatch(signin(mobile));
  };

  const submitHandlerotp = (e) => {
    e.preventDefault();
    if (mobile === "") {
      setMessagetype("danger");
      setMessage("Please enter the registered mobile number");
    } else if (OTP === "") {
      setMessagetype("danger");
      setMessage("Please enter the OTP");
    } else {
      fetchOrders_validotp(mobile, OTP);
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
    }
    //dispatch(signin(mobile));
  };

  useEffect(() => {
    if (orders && orders.otp === OTP) {
      //navigate(`/order/${orders.orderItems[0].order_id}`);
      //console.log("validate");
      //console.log(orders);
    }
  }, [navigate, orders, OTP]);
  // useEffect(() => {

  //   dispatch({ type: UPGRADE_ORDER_DETAILS_RESET });
  // }, []);

  return (
    <>
      <MetaTags id="home">
        <title>Upgrade</title>
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
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/verify" />
      </MetaTags>

      <div className="light-grey searchBooking padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-common">
                {/* <h4 className="text-center font-600">Sorry we will back soon.</h4> */}
                <h4 className="text-center font-600">Verify for Upgrade</h4>

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
                            placeholder="Enter you registered mobile number"
                            id="booking_id"
                            className="form-control"
                            pattern="d{10}"
                            value={mobile}
                            required
                            onChange={(e) =>
                              e.target.value.length > 10
                                ? ""
                                : setMobile(e.target.value)
                            }
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^0-9]+)/gi,
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
                              Send OTP
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
                            type="number"
                            placeholder="Enter you registered mobile number"
                            id="booking_id"
                            className="form-control"
                            value={mobile}
                            disabled
                            required
                            onChange={(e) => setMobile(e.target.value)}
                            maxLength={10}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^0-9]+)/gi,
                                "",
                              ))
                            }
                          />
                        </div>
                        {!showotp ? (
                          <div className="submit-btn">
                            <button className="button" disabled>
                              Sent OTP
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
                            Check Eligibility Now!! 
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
                    <Upgrade orders={orders} />
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
