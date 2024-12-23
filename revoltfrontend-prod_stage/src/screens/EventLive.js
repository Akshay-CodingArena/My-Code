import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axios as Axios } from "../utilities/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { userBookingReducer } from "../reducers/userReducers";
import { URL_API } from "../constants/cartConstants";
import OtpTimer from "otp-timer";
import CascadingDropdown from "../components/state_city_hub";
import clevertap from "clevertap-web-sdk";
import { listStateCityHub_SC } from "../actions/productActions";
import { MetaTags } from "react-meta-tags";

export default function EventRegistration(props) {
  const dispatch = useDispatch();
  const [submitbtn, setsubmitbtn] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [company, setCompany] = useState("NULL");
  const { search } = useLocation();
  const statecityhub = localStorage.getItem("state_city_hub");
  const getUsers = async () => {
    const { data } = await Axios.get(
      `${URL_API}/api/v1/common/getallstatelist`
    );
    localStorage.setItem("state_city_hub", JSON.stringify(data.data));
  };

  useEffect(() => {
    if (!statecityhub) {
      getUsers();
    }
  }, []);
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const navigate = useNavigate();
  const [name, setName] = useState(
    userInfo_myArr?.name ? userInfo_myArr.name : ""
  );
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr.mobile : ""
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr.email : ""
  );
  const [selectModel, setSelectModel] = React.useState("RV400-Beauty");
  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinstate, setPinstate] = useState("");
  const [valid, setvalid] = useState(true);
  const [notify, setNotify] = useState([]);

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);

  const [statelist, setStatelist] = useState([]);
  let availableState = [];

  // let availableCity =[];
  // /  const availableCity = cityList.filter((c) => c.state_id == selectedState && c.status==0);
  //const availableHub = hubList.filter((c) => c.city_id == selectedCity) ;
  const availableCity = cityList?.filter((c) => c.state_id == selectedState);
  // const availableHub = hubList.filter((c) => c.city_id == selectedCity) ;

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Notify Me",
      "Page Url": window.location.href,
    });
  }, []);

  //
  const pincodeHandler = async (e) => {
    setPincode(e);
    var message = document.getElementById("message");
    message.innerHTML = "";
    if (e.length == 6) {
      try {
        const { data } = await Axios.get(
          `${URL_API}/api/v1/common/pincode?pincode=${e}`,
          { pincode, headers: {} }
        );

        if (data.status === true) {
          let res = data.data[0];
          console.log(res.state_id);
          setSelectedState(res.state_id);
          setSelectedCity(res.city_id);
          setSelectedHub(res.hub_id);

          let mess;
          // if(res.hub_name=="REVOLT CENTRAL HUB"){
          //   mess = res.hub_name  ;
          //   setvalid(false)
          // }else{
          //    mess = "Already have showroom " + res.hub_name   + ", " +    res.city_name  + ", " +  res.state_name ;
          // }

          mess = res.hub_name + ", " + res.city_name + ", " + res.state_name;
          setvalid(false);
          setPinstate(mess);
        }
      } catch (error) {}
    } else {
      setPinstate("");
      setSelectedCity("");
      setSelectedHub("");
      setSelectTestDate("");
      setSelectTimeSlot("");
    }
  };

  //
  async function submitnotify(
    name,
    mobile,
    email,
    model,
    state,
    city,
    hub,
    whatsapp,
    search,
    pincode
  ) {
    console.log(name);
    const { data } = await Axios.post(`${URL_API}/api/v1/customer/notifyme`, {
      name,
      mobile,
      email,
      model,
      state,
      city,
      hub,
      whatsapp,
      search,
      pincode,
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
    } else if (valid) {
      message.style.color = badColor;
      message.innerHTML =
        "Showroom already exist. Please enter some other pincode.";
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

  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/launch-event-registration-customers`,
        {
          name,
          email,
          utm_source: window.location.search,
          mobile,
          company,
        }
      );

      if (data.status === true) {
        setShowThankYou(true);
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP";
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
      <MetaTags id="charging">
        <title>Register your Interest</title>
        <link rel="canonical" href="https://www.revoltmotors.com/launchevent" />
        <meta name="description" content="Revolt Launch Event" />
        <meta property="og:title" content="Revolt Launch Event" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>
      <section className="test-ride-page  padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="form newTest ">
            <div className="row">
              <div className="col-12 text-right">
                <img
                  class="nr-logo"
                  alt="Revolt Motors Logo"
                  src="/images/revolt-motors-logo-w.svg"
                  width="100"
                  height=""
                />
              </div>
              <div className="col-12 text-center">
                {" "}
                <img
                  src="/images/LiveEvent.png"
                  style={{ maxWidth: "700px", width: "100%" }}
                  className="img-fluid"
                />
              </div>
            </div>
            {/*  */}
            {showThankYou ? (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <h3 style={{ color: "#fff", paddingTop: "0" }}>
                  Thank You for Registering!
                </h3>
                <p
                  style={{
                    maxWidth: " 300px",
                    color: "#fff",
                    lineHeight: "20px",
                    fontSize: "14px",
                    margin: "20px auto 0px",
                  }}
                >
                  Watch Us Live Today at 5PM
                  <a
                    style={{
                      color: "fff",
                      textDecoration: "underline",
                      fontWeight: "600",
                      display: "block",
                      background: "#fff",
                      padding: "10px",
                      maxWidth: "100px",
                      textAlign: "center",
                      margin: "10px auto 0px",
                      borderRadius: "10px",
                    }}
                    target="_blank"
                    href="https://www.youtube.com/live/_UuT2814vx8"
                  >
                    <img src="/images/logoYoutube.svg" width="100" height="" />
                  </a>
                </p>
                <p
                  style={{
                    maxWidth: " 300px",
                    color: "#fff",
                    lineHeight: "20px",
                    fontSize: "14px",
                    margin: "20px auto 0px",
                  }}
                >
                  You will receive the event details shortly over WhatsApp &
                  Email.
                </p>
              </div>
            ) : (
              <form id="msforms" onSubmit={submitHandler}>
                <div className="col-12 text-center">
                  {/* <img src="/images/save-date.png" width="420" height="" /> */}
                  <h4
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      marginBottom: "18px",
                    }}
                  >
                    Register Your Interest!
                  </h4>
                  <p
                    style={{
                      maxWidth: "380px",
                      margin: "10px auto 0px",
                      lineHeight: "22px",
                      fontSize: "16px",
                      textAlign: "left",
                    }}
                  >
                    Be the first to know when the next revolution in electric
                    mobility is unveiled.
                  </p>

                  <div
                    style={{
                      margin: "auto",
                      maxWidth: "380px",
                      fontSize: "16px",
                      borderBottom: "1px solid #f1f1f1",
                      textAlign: "left",
                      marginTop: "20px",
                    }}
                  >
                    <div>Guest of Honor:</div>
                    <div
                      style={{
                        margin: "5px 0px 2px",
                      }}
                    >
                      Shri. Nitin Gadkari
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      The Hon'ble Minister of Road &amp; Transport &amp; Highway
                    </span>
                    <p></p>
                  </div>

                  {/* <h5>September 17th, 4PM Onwards</h5> */}
                </div>

                <fieldset>
                  <div className="">
                    <div className="form-default d-flex justify-content-center align-items-center flex-column">
                      <div className="row" style={{ maxWidth: "400px" }}>
                        <div className="form-group col-12 col-md-12 name-group">
                          <p
                            style={{
                              maxWidth: "390px",
                              margin: "20px auto 15px",
                              lineHeight: "22px",
                              fontSize: "16px",
                              paddingBottom: "15px",
                            }}
                          >
                            Fill in your details to get notified and stay
                            updated for the livestream.
                          </p>

                          {/* <div className="palceholder">
                        <label htmlFor="name">Name</label>
                        <span className="star">*</span>
                      </div> */}

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
                                ""
                              ))
                            }
                          ></input>
                        </div>
                        <div className="form-group col-12 col-md-12 name-group">
                          {/* <div className="palceholder">
                        <label htmlFor="Phone">Mobile </label>
                        <span className="star">*</span>
                      </div> */}

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
                            onInput={(e) => {
                              let value = e.target.value;
                              e.target.value = e.target.value.slice(0, 10);
                              if (/[A-Za-z]/.test(value)) {
                                e.target.value = mobile;
                              }
                            }}
                          ></input>
                        </div>

                        <div className="form-group col-12 col-md-12 email-group">
                          {/* <div className="palceholder">
                        <label htmlFor="email">Email </label>
                        <span className="star">*</span>
                      </div> */}
                          <input
                            type="email"
                            id="email"
                            title="Please enter a valid email address"
                            className="form-control inputfield"
                            pattern="^[A-Za-z]{1,1}[A-Za-z0-9]{0,}(?!.*\.\.)[_.A-Za-z0-9]{1,}[a-zA-Z0-9]{1,1}@[A-Za-z]{1,}\.([a-zA-Z]{2,})(\.([a-zA-Z]{2,})){0,1}$"
                            placeholder="Email"
                            required
                            value={email}
                            onInput={(e) => {
                              let value = e.target.value;
                              let length = value.length;
                              if (value[length - 1] == "\\") {
                                e.target.value = value.slice(0, length - 1);
                              } else {
                                if (e.target.value.includes("\\")) {
                                  e.target.value = email;
                                  console.log("old email");
                                }
                              }
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </div>

                        {/* <div className="form-group col-6 col-md-6 name-group">
                          {/* <div className="palceholder">
                        <label>User Name / Mobile Number</label>
                        <span className="star">*</span>
                      </div> 

                          <input
                            type="text"
                            className="form-control inputfield"
                            id="pincode"
                            placeholder="Company Name"
                            required
                            value={company}
                            // onChange={(e) => setPincode(e.target.value)}
                            onChange={(e) => setCompany(e.target.value)}
                          ></input>
                        </div> */}

                        {/* <div className="col-md-12 whatsaapform">
                      <p>
                        Get{" "}
                        <b>
                          {" "}
                          <img src="/images/whtsapp_icon.jpg" />
                          WhatsApp
                        </b>{" "}
                        reminders & updates on everything that's relevant
                      </p>
                    </div> */}

                        {/* <div className="form-group col-md-4 checkboxihave">
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
                    </div> */}
                      </div>
                    </div>

                    <div className="text-center">
                      <input
                        type="submit"
                        name="next"
                        disabled={mobile.length != 10}
                        // className="next action-button"
                        value="Register"
                      />
                    </div>
                  </div>

                  {/* <div className="text-start">
                  <p className="m-0">
                    *By clicking “Submit”, I give my consent to Revolt
                    Intellicorp Private Limited and its authorised service
                    providers to hold my personal data and communicate with me
                    by e-mail, WhatsApp, SMS or phone call for Notify purposes.
                  </p>
                </div> */}
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
