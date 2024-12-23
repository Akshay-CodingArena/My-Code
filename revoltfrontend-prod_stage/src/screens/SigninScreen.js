import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { axios as Axios } from "../utilities/axios";
import { URL_API } from "../constants/cartConstants";
import OtpTimer from "otp-timer";
import clevertap from "clevertap-web-sdk";
import { MetaTags } from "react-meta-tags";

export default function SigninScreen(props) {
  const navigate = useNavigate();
  //const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [cuserror, setCuserror] = useState("");
  const [cuserrortype, setCuserrortype] = useState("");
  const [otpbtn, setOtpbtn] = useState("hide");
  const isEnabled =
    mobile.length > 0 && (password.length > 0 || otp.length > 0);
  const [loginwithotp, setLoginwithotp] = useState(false);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  let redirect = redirectInUrl ? redirectInUrl : "/";

  //const parsed_productId = new URLSearchParams(search).get('id');

  const userSignin = useSelector((state) => state.userSignin);

  const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(mobile, password, otp));
    // if (mobile === adminUsername && password === adminPassword) {
    //   navigate('/banner-dashbord');
    // }
  };

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Login Screen",
      "Page Url": window.location.href,
    });
  }, []);

  useEffect(() => {
    if (userInfo) {
      redirect = userInfo?.name ? redirect : `/signin?redirect=${redirect}`;
      if (sessionStorage.getItem("redirectFreshdesk")) {
        sessionStorage.removeItem("redirectFreshdesk");
        window.location.href =
          "https://support.revoltmotors.com/customer/login";
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  async function checkOTP(checkbox) {
    let mobile = document.getElementById("mobile");
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
      const result_pay = await Axios.get(
        `${URL_API}/api/v1/customer/otp/${mobile_no}`,
      );
      let res = result_pay.data.data;

      if (res.status == true) {
        setOtpbtn("show");
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

    // if(checkbox.checked) {
    // let mobile_no =  document.getElementById('mobile');
    // const result_pay = Axios.get(`${URL_API}/api/v1/customer/otp/${mobile_no.value}`
    // )
    // }

    // if(checkbox.checked){)
    //     document.getElementById('passwordverdict').style.display = "none";
    //     document.getElementById('otpverdict').style.display = "block";
    //     let randomnumber = Math.random().toString().substr(2, 6)
    //     document.getElementById('otpshow').innerHTML = randomnumber;

    //   }
    //   else{
    //     document.getElementById('passwordverdict').style.display = "block";
    //     document.getElementById('otpverdict').style.display = "none";
    //     document.getElementById('otpshow').innerHTML = "";
    //   }
  }

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <>
      <MetaTags id="about">
        <title>Sign In - Revolt Motors</title>
        <meta
          property="og:title"
          content="Sign In - Revolt Motors
"
        />

        <link rel="canonical" href="https://www.revoltmotors.com/signin" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>
      <div className="light-grey userSignIn padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-common">
                <h4 className="text-center font-600">Sign Into Your Account</h4>

                <div className="form-default">
                  <form className="form" onSubmit={submitHandler}>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}

                    {cuserror && (
                      <MessageBox variant={cuserrortype}>{cuserror}</MessageBox>
                    )}

                    <div className="form-group name-group">
                      <input
                        className="form-control inputfield"
                        type="text"
                        id="mobile"
                        placeholder="Enter Mobile/Dealer Code"
                        required
                        minLength={10}
                        maxLength={20}
                        onChange={(e) => {
                          if (e.target.value.length == 11) return false; //limits to 10 digit entry
                          setMobile(e?.target.value); //saving input to state
                        }}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /([^a-z-0-9]+)/gi,
                            "",
                          ))
                        }
                      ></input>
                    </div>
                    <span id="message"></span>
                    {/* userfield end */}

                    {/* PASSword field*/}

                    {!loginwithotp && (
                      <div
                        className="form-group name-group"
                        id="passwordverdict"
                      >
                        <input
                          className="form-control inputfield"
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          required
                          minLength="8"
                          maxLength="20"
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loginwithotp}
                        ></input>
                      </div>
                    )}

                    {/* passwordfield end */}

                    {/*  OTP */}
                    {loginwithotp && (
                      <>
                        <div id="otpverdict" className="form-group name-group">
                          <input
                            className="form-control inputfield"
                            type="number"
                            id="otp"
                            placeholder="Enter OTP"
                            minLength="6"
                            maxLength="6"
                            disabled={!loginwithotp}
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
                    )}

                    <div id="otpverdictvalue"></div>

                    <div id="otpshow"></div>

                    {/* OTP end */}

                    <div className="group form-group submit-btn">
                      <input
                        type="submit"
                        className="button"
                        value="Login"
                        disabled={!isEnabled}
                      />

                      <div className="orText">
                        <span>OR</span>
                      </div>

                      <div className="login-otp">
                        <label htmlFor="otp">
                          Login with OTP{" "}
                          <input
                            className="ml-2"
                            name="otpCheck"
                            type="checkbox"
                            id="otp"
                            onChange={(e) => setLoginwithotp(!loginwithotp)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="no-account text-center">
                      Don't have an account?{" "}
                      <Link to="/register?redirect">Register Here</Link>
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
