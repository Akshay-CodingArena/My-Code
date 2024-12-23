import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axios as Axios } from "../utilities/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { userBookingReducer } from "../reducers/userReducers";
import { URL_API, URL_APIX } from "../constants/cartConstants";
import OtpTimer from "otp-timer";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";
import { getOS } from "../constants/getDevice";
import { getBrowser } from "../constants/getBrowser";
import Loader from "../components/Loader";
import { detailsProduct } from "../actions/productActions";

export default function AlexaScreen() {
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const [submitbtn, setsubmitbtn] = useState(true);
  const [otpbtn, setOtpbtn] = useState(true);
  const [otp, setOtp] = useState("");
  const [loaderOtp, setLoader] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("client_id"));

  const submitHandler = async (e) => {
    e.preventDefault();

    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (mobile === "" || mobile === null || mobile.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
      return;
    }

    setLoading(true);
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/addAlexaUser`,
      {
        client_id: urlParams.get("client_id"),
        redirect_uri: urlParams.get("redirect_uri"),
        response_type: urlParams.get("response_type"),
        scope: urlParams.get("scope"),
        state: urlParams.get("state"),
        mobile: mobile,
        otp: otp,
      },
    );

    if (data?.status == false) {
      setLoading(false);
      setMobile("");
      message.style.color = badColor;
      message.innerHTML = data.message;
    } else {
      let platform = getOS();
      setTimeout(() => {
        setLoading(false);
        window.open(data.redirectionUrl, "_self");
      }, 1500);

      // if (platform === "ios" || platform === "android") {
      window.open(data.redirectionUrl, "_self");
      // } else {
      //   alert("Please open page in either Mobile or Tablet");
      // }
    }
  };

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      setLoader(true);
      const result_pay = await Axios.post(
        `${URL_API}/api/v1/customer/sendAlexaOtp`,
        {
          mobile,
        },
      );
      setLoader(false);
      setOtpbtn(false);
      // message.innerHTML = '';
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <MetaTags id="testride">
        <title>Alexa - Revolt Motors</title>
        <meta NAME="robots" CONTENT="noindex" />
        <link
          rel="canonical"
          href="https://www.revoltmotors.com/revolt-alexa"
        />
      </MetaTags>

      <section className="bookNow alexSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div className="">
                <h1>
                  Welcome to the Alexa and My Revolt account linking process – a
                  swift and secure two-step authentication.{" "}
                </h1>
                <p>
                  Follow these steps for a seamless and safe integration
                  experience.
                </p>

                <ul>
                  <li>
                    <h4>
                      {" "}
                      <span>1</span>Enter Mobile Number:
                    </h4>
                    <p>
                      Input the mobile number registered with My Revolt App.
                    </p>
                  </li>
                  <li>
                    <h4>
                      {" "}
                      <span>2</span>OTP Authentication:
                    </h4>

                    <p>
                      Receive and enter the OTP sent to your registered number
                      for verification.
                    </p>
                  </li>
                  <li>
                    <h4>
                      <span>3</span>Verification Success:
                    </h4>

                    <p>
                      Upon successful OTP verification, your Alexa account will
                      be securely linked with My Revolt App, enabling seamless
                      integration.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="row">
            <div className="col-xs-12 col-sm-12  formView">
              <form
                id="msformNew alexa-form"
                className="form"
                onSubmit={submitHandler}
              >
                <div className="form-card test-ride-card">
                  <div className="form-group checkboxihave">
                    <div>
                      <label>Enter Mobile Number</label>
                    </div>
                  </div>
                </div>

                <div className="form-default">
                  <div className="form-group  name-group">
                    <div className="palceholder">
                      <label>Mobile </label>
                      <span className="star">*</span>
                    </div>

                    <input
                      type="number"
                      id="mobile"
                      className="form-control inputfield"
                      placeholder="Mobile"
                      value={mobile}
                      minLength="10"
                      maxLength="10"
                      pattern="d{10}"
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                      required
                      onChange={(e) => setMobile(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <span id="message"></span>
                    <div className="testride_submit_wrapper ">
                      {/*  */}
                      {/* otp field start */}
                      {!otpbtn ? (
                        <>
                          <div className="form-group">
                            <div className="palceholder">
                              <label>OTP </label>
                              <span className="star">*</span>
                            </div>

                            <input
                              type="number"
                              id="otp"
                              className="form-control inputfield"
                              placeholder="OTP"
                              maxlength="6"
                              onChange={(e) => setOtp(e.target.value)}
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
                      <div className="test-ride-box">
                        <div className="otp_btn_wrapper">
                          {otpbtn ? (
                            <input
                              type="button"
                              className="next action-button   "
                              value="Send OTP"
                              // disabled={name == "" || email == "" || selectedState == "" || selectedCity == "" || selectedHub == "" || selecttimeSlot == "" || selectTestDate == "" || selectModel == "" ? true : false}
                              disabled={!(mobile.length == 10)}
                              onClick={(e) => checkOTP(e.target)}
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
                        <span style={{ display: "none" }} id="message"></span>
                      </div>
                    </div>
                    <div className="text-start">
                      <p className="mb-0 terms">
                        *By clicking “Submit”, I give my consent to Revolt
                        Intellicorp Private Limited and its authorised service
                        providers to hold my personal data and communicate with
                        me by e-mail, WhatsApp, SMS or phone call for Notify
                        purposes.
                      </p>
                    </div>
                  </div>

                  <div className="form-group">
                    <span id="message"></span>

                    <div className="testride_submit_wrapper">
                      <div
                        className="test-ride-box"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span id="message"></span>
                        {submitbtn && (
                          <input
                            type="submit"
                            disabled={otpbtn}
                            name="next"
                            className="next action-button "
                            value="Submit"
                            id="sumbtn"
                            // disabled={!mobileverify}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>{" "}
        </div>
      </section>
    </>
  );
}
