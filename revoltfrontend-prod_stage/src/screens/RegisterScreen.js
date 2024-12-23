import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import Axios from "axios";
import { URL_API } from "../constants/cartConstants";

import clevertap from "clevertap-web-sdk";

import { getBrowser } from "../constants/getBrowser";
import { getOS } from "../constants/getDevice";

export default function RegisterScreen(props) {
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //
  //
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  const [selectedHub, setSelectedHub] = React.useState("");
  const availableCity = cityList.filter((c) => c.state_id == selectedState);
  const availableHub = hubList.filter((c) => c.city_id == selectedCity);
  //

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState("hide");
  const [cuserror, setCuserror] = useState("");
  const [cuserrortype, setCuserrortype] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");

  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userRegister = useSelector((state) => state.userRegister);

  let { userInfo, loading, error } = userRegister;

  const isEnabled =
    name.length > 0 &&
    mobile.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    otp.length == 6;

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp
    try {
      const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, {
        mobile,
        otp,
        headers: { Authorization: process.env.REACT_APP_API_KEY },
      });
      //console.log(data.status)
      let URL = URL_API + "/api/v1/common/freshdesk_records/contacts";
      let formData = {
        name: name,
        email: email,
        mobile: mobile,
        address: "",
        custom_fields: {
          customer_state: stateList.filter(
            (value, index) => value.state_id == selectedState,
          )[0].state_name,
          customer_city: availableCity.filter(
            (value, index) => value.city_id == selectedCity,
          )[0].city_name,
          customer_pincode: "",
          gender: "",
          date_of_birth: null,
          date_of_anniversary: null,
          service_due_date: null,
        },
      };
      Axios.post(URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
        },
      });

      if (data.status === true) {
        message.innerHTML = "";
        //console.log("hi")
        dispatch(
          register(
            name,
            mobile,
            email,
            selectedState,
            selectedCity,
            selectedHub,
            password,
          ),
        );
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP Number.";
      }
    } catch (error) {}

    // otp verify end

    // dispatch(register(name, mobile, email, selectedState, selectedCity, selectedHub, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //

  async function checkOTP(checkbox) {
    let mobile = document.getElementById("mobile").value;
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      //alert("Please Enter Valid Mobile Number.");

      // mobile.style.backgroundColor  = badColor;
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
      setCuserror("Please Enter Valid Mobile Number.");
    } else {
      //  message.innerHTML = "";
      const result_pay = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
        mobile,
        email,
      });
      console.log(result_pay);
      let res = result_pay;

      if (res.status == 200) {
        setOtpbtn("false");
        // message.innerHTML = res.message  ;
        setCuserrortype("");
        setCuserror(res.message);
        // console.log(otpbtn)
      } else {
        setCuserrortype("danger");
        setCuserror(res.message);
        setOtpbtn("hide");
      }
    }
  }
  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  ///
  return (
    <>
      <div className="light-grey userRegister padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-common">
                <h4 className="text-center font-600">Create an Account</h4>
                <div className="form-default">
                  <form className="form" onSubmit={submitHandler}>
                    {/*  */}
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {/*  */}
                    {/* fullname start */}
                    <div className="form-group name-group">
                      <input
                        className="form-control inputfield"
                        type="text"
                        id="name"
                        placeholder="Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /([^a-z 0-9]+)/gi,
                            "",
                          ))
                        }
                      ></input>
                    </div>
                    {/* fullname end */}

                    {/* Mobile start */}
                    <div className="form-group name-group">
                      <input
                        className="form-control inputfield"
                        type="number"
                        id="mobile"
                        placeholder="Mobile"
                        minLength="10"
                        maxLength="10"
                        required
                        onChange={(e) => setMobile(e.target.value)}
                        pattern="d{10}"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 10))
                        }
                      ></input>
                    </div>
                    {/* mobile end */}

                    {/* email start  */}
                    <div className="form-group email-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control inputfield"
                        required
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    {/* email start  */}

                    {/*  States start */}

                    <div className="form-groups name-group">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <select
                              id="state"
                              className="form-control"
                              placeholder="Select State"
                              required
                              value={selectedState}
                              name="state"
                              onChange={(e) => setSelectedState(e.target.value)}
                            >
                              <option>Choose State</option>
                              {stateList.map((value, key) => {
                                return (
                                  <option value={value.state_id} key={key}>
                                    {value.state_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <select
                              id="city"
                              className="form-control"
                              placeholder="City"
                              value={selectedCity}
                              name="city"
                              onChange={(e) => setSelectedCity(e.target.value)}
                              required
                            >
                              <option>Choose City</option>
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
                      </div>
                    </div>
                    {/* State end */}

                    {/* Password start  */}
                    <div className="form-group name-group">
                      <div className="palceholder">
                        <label htmlFor="password">Password</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="password"
                        placeholder="Password"
                        minLength="8"
                        maxLength="20"
                        className="form-control inputfield"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* Password end  */}

                    {/*  OTP */}

                    <>
                      <div id="otpverdict" className="form-group name-group">
                        <input
                          className="form-control inputfield"
                          type="number"
                          id="otp"
                          placeholder="Enter OTP"
                          minLength="6"
                          maxLength="6"
                          // disabled={!loginwithotp}
                          onChange={(e) => setOtp(e.target.value)}
                          pattern="d{10}"
                          onInput={(e) =>
                            (e.target.value = e.target.value.slice(0, 6))
                          }
                        ></input>
                      </div>
                      <div className="group form-group otp_wrapper">
                        {otpbtn == "hide" ? (
                          <input
                            type="button"
                            className="otp_button_new"
                            value="Send OTP"
                            onClick={(e) => checkOTP(e.target)}
                            disabled={!(mobile.length == 10)}
                          />
                        ) : (
                          <OtpTimer
                            seconds={60}
                            minutes={0}
                            resend={checkOTP}
                            text="Resend OTP After"
                          />
                        )}
                      </div>
                    </>

                    <div id="otpverdictvalue"></div>

                    <div id="otpshow"></div>
                    <span id="message"></span>
                    {/* OTP end */}

                    <div className="group submit-btn form-group">
                      <input
                        type="submit"
                        className="button"
                        value="Sign Up"
                        disabled={!isEnabled}
                      />
                    </div>

                    <div className="no-account text-center">
                      Already Member?{" "}
                      <Link to={"/signin?redirect"}>Sign-In</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
