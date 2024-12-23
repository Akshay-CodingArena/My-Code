import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { userBookingReducer } from "../reducers/userReducers";
import { URL_API } from "../constants/cartConstants";
import OtpTimer from "otp-timer";
import CascadingDropdown from "../components/state_city_hub";
import clevertap from "clevertap-web-sdk";

export default function NotifyMeScreen(props) {
  const { search } = useLocation();
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const navigate = useNavigate();
  const [name, setName] = useState(
    userInfo_myArr?.name ? userInfo_myArr.name : "",
  );
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr.mobile : "",
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr.email : "",
  );
  const [selectModel, setSelectModel] = React.useState("");
  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");
  const [whatsapp, setWhatsapp] = useState(false);

  const [notify, setNotify] = useState([]);

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);

  const [statelist, setStatelist] = useState([]);
  let availableState = [];

  // let availableCity =[];
  const availableCity = cityList.filter(
    (c) => c.state_id == selectedState && c.status == 0,
  );
  //const availableHub = hubList.filter((c) => c.city_id == selectedCity) ;

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Notify Me",
      "Page Url": window.location.href,
    });
  }, []);

  async function submitnotify(
    name,
    mobile,
    email,
    model,
    state,
    city,
    whatsapp,
    search,
  ) {
    console.log(name);
    const { data } = await Axios.post(`${URL_API}/api/v1/customer/notifyme`, {
      name,
      mobile,
      email,
      model,
      state,
      city,
      whatsapp,
      search,
    });
    console.log("data");
    setNotify(data);

    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (data?.status == false) {
      message.style.color = badColor;
      message.innerHTML = data.message;
    } else {
      navigate(`/thankyounotify/${data.NotifyMe_id}`);
    }
  }

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else if (email === "" || email === null) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid EmaiId.";
    } else if (selectModel === "" || selectModel === null) {
      message.style.color = badColor;
      message.innerHTML = "Please Select Model.";
    } else if (selectedState === "" || selectedState === null) {
      message.style.color = badColor;
      message.innerHTML = "Please Select State.";
    } else if (selectedCity === "" || selectedCity === null) {
      message.style.color = badColor;
      message.innerHTML = "Please Select City.";
    } else {
      const result_pay = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
        mobile,
        email,
      });
      setOtpbtn(false);
      message.innerHTML = "";
    }
  }

  async function getstatelist() {
    //console.log(name)
    const { data } = await Axios.get(`${URL_API}/api/v1/common/getstatelist`);
    console.log("data-state");
    setStatelist(data.data);
  }

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

      if (data.status === true) {
        message.innerHTML = "";

        clevertap.onUserLogin.push({
          Site: {
            Name: name,
            Identity: mobile,
            Email: email,
            Phone: "+91" + mobile,
            "MSG-whatsapp": whatsapp,
          },
        });

        clevertap.event.push("Notify Me", {
          Name: name,
          Email: email,
          Mobile: mobile,
          City: availableCity.filter(
            (value, index) => value.city_id == selectedCity,
          )[0].city_name,
          State: stateList.filter(
            (value, index) => value.state_id == selectedState,
          )[0].state_name,
          "Preferred Model": selectModel,
          IsWhatsAppOption: whatsapp,
          Date: new Date(),
        });

        dispatch(
          submitnotify(
            name,
            mobile,
            email,
            selectModel,
            selectedState,
            selectedCity,
            whatsapp,
            search,
          ),
        );
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid Mobile Number.";
      }
    } catch (error) {}

    // otp verify end
  };
  useEffect(() => {
    getstatelist();
    if (notify) {
      console.log(notify);
      //alert("submit successfully!");
    }
  }, [notify]);

  return (
    <>
      <section className="test-ride-page light-grey padding-top-100 padding-bottom-100">
        <div className="container">
          {/*  */}
          <form id="msforms" className="form newTest" onSubmit={submitHandler}>
            <fieldset>
              <div className="form-bg">
                <div className="row">
                  <div className="col-12 text-center">
                    <p>
                      Don't want to be left out? Click on the button below and
                      fill in the form. <br />
                      We'll notify you as soon as we arrive at your city.
                    </p>
                  </div>
                </div>
                <div className="form-default">
                  <div className="row">
                    <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Name</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="text"
                        className="form-control inputfield"
                        id="name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /([^a-z 0-9]+)/gi,
                            "",
                          ))
                        }
                      ></input>
                    </div>
                    <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label htmlFor="Phone">Mobile </label>
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
                        required
                        onChange={(e) => setMobile(e.target.value)}
                      ></input>
                    </div>

                    <div className="form-group col-md-4 email-group">
                      <div className="palceholder">
                        <label htmlFor="email">Email </label>
                        <span className="star">*</span>
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="form-control inputfield"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group col-md-4">
                      <select
                        id="area"
                        placeholder="Dealer Hub"
                        className="form-control"
                        required
                        value={selectModel}
                        onChange={(e) => setSelectModel(e.target.value)}
                      >
                        <option>Select your Preferred Model</option>

                        <option value="RV400" key="RV400">
                          RV400
                        </option>
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <select
                        id="state"
                        className="form-control"
                        placeholder="Select State"
                        required
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option>Select State</option>
                        {stateList.map((value, key) => {
                          return (
                            <option value={value.state_id} key={key}>
                              {value.state_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <select
                        id="city"
                        className="form-control"
                        placeholder="City"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                      >
                        <option>Choose City</option>
                        {availableCity?.length != 0 &&
                        availableCity?.length != null
                          ? availableCity.map((e, key) => {
                              return (
                                <option value={e.city_id} key={key}>
                                  {e.city_name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>

                    <div className="col-md-12 whatsaapform">
                      <p>
                        Get{" "}
                        <b>
                          {" "}
                          <img src="/images/whtsapp_icon.jpg" />
                          WhatsApp
                        </b>{" "}
                        reminders & updates on everything that's relevant
                      </p>
                    </div>

                    <div className="form-group col-md-4 checkboxihave">
                      <label>
                        <input
                          type="checkbox"
                          id="check"
                          name="whatsapp"
                          className="input"
                          onChange={(e) => setWhatsapp(e.target.checked)}
                        />
                        Yes, opt me in
                      </label>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="testride_submit_wrapper form-default">
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

                  {/* otp field end */}

                  <div className="notify_error" id="message"></div>
                  {/*  */}
                  <div className="notify_error" id="message"></div>
                  <div className="otp_btn_wrapper">
                    {otpbtn ? (
                      <input
                        type="button"
                        className="next action-button mb-5 "
                        value="Send OTP"
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
                  {/*  */}
                  <input
                    type="submit"
                    disabled={otpbtn}
                    name="next"
                    className="next action-button"
                    value="Submit"
                  />
                </div>

                <div className="text-start">
                  <p className="m-0">
                    *By clicking “Submit”, I give my consent to Revolt
                    Intellicorp Private Limited and its authorised service
                    providers to hold my personal data and communicate with me
                    by e-mail, WhatsApp, SMS or phone call for Notify purposes.
                  </p>
                </div>
              </div>
            </fieldset>
          </form>
          {/*  */}
        </div>
      </section>
    </>
  );
}