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
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";
import { getOS } from "../constants/getDevice";
import { getBrowser } from "../constants/getBrowser";

export default function TestRideScreen(props) {
  const { search } = useLocation();
  // const redirectInUrl = new URLSearchParams(search).get('redirect');

  const [submitbtn, setsubmitbtn] = useState(true);

  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;

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
  const [selectModel, setSelectModel] = useState("RV400");
  const [pincode, setPincode] = useState("");
  const [pinstate, setPinstate] = useState("");
  const [oppo, setoppo] = useState("");
  const [hubname, sethubname] = useState("");

  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr.state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr.city : "",
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : "",
  );

  const [TestRideSolts, setTestRideSlots] = useState([]);
  const [testride, setTestRide] = useState([]);
  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);
  const [mobileverify, setMobileverify] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);

  const availableStateList = stateList?.filter((c) => c.status == 1);

  const availableCity = cityList?.filter(
    (c) => c.state_id == selectedState && c.status == 1,
  );
  const availableHub = hubList?.filter((c) => c.city_id == selectedCity);

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Test Ride",
      "Page Url": window.location.href,
    });
  }, []);

  async function submittestride(
    name,
    mobile,
    email,
    model,
    state,
    city,
    hub,
    pincode,
    testdate,
    timeslot,
    whatsapp,
  ) {
    if (hubname == "REVOLT CENTRAL HUB") {
      // handlenotifyme();
      setoppo(`Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.
We apologize for any inconvenience caused.
Thank you for your understanding and patience.
Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.
Keep checking our website for updates.`);
      // setoppo("<p>Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.</p><p> We apologize for any inconvenience caused.</p><p> Thank you for your understanding and patience.</p><p> Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.</p><p> Keep checking our website for updates. ")
      // setoppo("Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.\n We apologize for any inconvenience caused.\n  Thank you for your understanding and patience.\n Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.\n Keep checking our website for updates. ")
    } else if (hubname != "REVOLT CENTRAL HUB") {
      //////////////////
      setsubmitbtn(false);
      //insert test ride start
      const { data } = await Axios.post(`${URL_API}/api/v1/customer/testRide`, {
        name,
        mobile,
        email,
        model,
        state,
        city,
        hub,
        pincode,
        testdate,
        timeslot,
        whatsapp,
        search,
      });

      setTestRide(data);
      //console.log(data)
      var message = document.getElementById("message");
      var goodColor = "#0C6";
      var badColor = "#ed1c24";

      if (data?.status == false) {
        message.style.color = badColor;
        message.innerHTML = data.message;
      } else {
        //16May2023 start
        clevertap.onUserLogin.push({
          Site: {
            Name: name,
            Identity: mobile,
            Email: email,
            Phone: "+91" + mobile,
            "MSG-whatsapp": whatsapp,
          },
        });

        clevertap.event.push("Test Ride Booked", {
          Name: name,
          Mobile: mobile,
          Email: email,
          "Preferred Model": selectModel,
          City: availableCity?.filter(
            (value, index) => value.city_id == selectedCity,
          )[0].city_name,
          State: availableStateList?.filter(
            (value, index) => value.state_id == selectedState,
          )[0].state_name,
          "Dealer Hub": availableHub?.filter(
            (value, index) => value.hub_id == selectedHub,
          )[0].hub_name,
          "Test Ride Date": new Date(selectTestDate),
          "Time Slot": selecttimeSlot,
          IsOptInWhatsApp: whatsapp,
          "Device Name": getOS(),
          "Browser Type": getBrowser(),
          Date: new Date(),
        });
        //16 may 2023 end
        navigate(`/thankyouride/${data.ride_id}`);
      }
    }
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

        // setsubmitbtn(false);
        dispatch(
          submittestride(
            name,
            mobile,
            email,
            selectModel,
            selectedState,
            selectedCity,
            selectedHub,
            pincode,
            selectTestDate,
            selecttimeSlot,
            whatsapp,
          ),
        );
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP.";
      }
    } catch (error) {}
  };
  //
  const handlenotifyme = () => {
    ///////notify me start///////
    // var message = document.getElementById('message');
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    // message.innerHTML = "";
    console.log("OK1");
    // setsubmitbtn(false);

    // clevertap.onUserLogin.push({
    //   "Site": {
    //     "Name": name,
    //     "Identity": mobile,
    //     "Email": email,
    //     "Phone": "+91" + mobile,
    //     "MSG-whatsapp": "",
    //   }
    // })
    // console.log("OK2")
    // clevertap.event.push("Notify Me", {
    //   "Name": name,
    //   "Email":email,
    //   "Mobile": mobile,
    //   "City": availableCity.filter((value,index)=>value.city_id == selectedCity)[0].city_name,
    //   "State":stateList.filter((value,index)=>value.state_id == selectedState)[0].state_name,
    //   "Preferred Model":"RV400",
    //   "IsWhatsAppOption":"",
    //   Date: new Date()
    // });

    submitnotify(
      name,
      mobile,
      email,
      "RV400",
      selectedState,
      selectedCity,
      selectedHub,
      whatsapp,
      search,
      pincode,
    );

    ////////notify me end //////////
  };

  /////////
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
    pincode,
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
    // setNotify(data);

    if (data?.status == false) {
    } else {
      // navigate(`/thankyounotify/${data.NotifyMe_id}`);
    }
  }

  /////
  //

  //
  const pincodeHandler = async (e) => {
    setPincode(e);

    if (e.length == 6) {
      try {
        const { data } = await Axios.get(
          `${URL_API}/api/v1/common/pincode?pincode=${e}`,
          { pincode, headers: {} },
        );

        if (data.status === true) {
          let res = data.data[0];
          console.log(res.state_id);
          setSelectedState(res.state_id);
          setSelectedCity(res.city_id);
          setSelectedHub(res.hub_id);
          sethubname(res.hub_name);
          let mess;
          if (res.hub_name == "REVOLT CENTRAL HUB") {
            //mess = res.hub_name  ;
            mess = "";
            // setoppo(true)
          } else {
            setoppo("");
            mess = res.hub_name + ", " + res.city_name + ", " + res.state_name;
            //  handlenotifyme();
          }

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
  const checkTimeSlots = async (e) => {
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    setSelectTestDate(e);
    console.log(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/testrideslot/${selectedHub}/${e}`,
      );

      if (data.status === true) {
        setTestRideSlots(data.data);
        message.innerHTML = "";
      } else {
        setTestRideSlots([]);
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP.";
      }
    } catch (error) {}
  };

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (hubname == "REVOLT CENTRAL HUB") {
      handlenotifyme();
      setoppo(`Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.
  We apologize for any inconvenience caused.
  Thank you for your understanding and patience.
  Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.
  Keep checking our website for updates.`);
      // setoppo("<p>Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.</p><p> We apologize for any inconvenience caused.</p><p> Thank you for your understanding and patience.</p><p> Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.</p><p> Keep checking our website for updates. ")
      // setoppo("Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.\n We apologize for any inconvenience caused.\n  Thank you for your understanding and patience.\n Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.\n Keep checking our website for updates. ")
    } else {
      if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid Mobile Number.";
      } else {
        if (!props.blocker) {
          const result_pay = await Axios.post(
            `${URL_API}/api/v1/auth/sendotp`,
            { mobile, email },
          );
          setOtpbtn(false);
        }

        // message.innerHTML = '';
      }
    }
  }

  const disablePastDate = () => {
    // console.log(new Date().toLocaleTimeString("en-US"))
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const changeHandlerState = (e) => {
    setSelectedState(e);
    setSelectedCity("");
    setSelectedHub("");
    setSelectTestDate("");
    setSelectTimeSlot("");
  };

  const changeHandlerCity = (e) => {
    setSelectedCity(e);
    setSelectedHub("");
    setSelectTestDate("");
    setSelectTimeSlot("");
  };

  const changeHandlerHub = (e) => {
    setSelectedHub(e);
    setSelectTestDate("");
    setSelectTimeSlot("");
  };

  const changeHandlerDate = (e) => {
    checkTimeSlots(e);
    setSelectTimeSlot("");
    document.getElementById("testdate").classList.add("valueFind");
  };

  const changeHandlerTimeSlot = (e) => {
    setSelectTimeSlot(e);
  };

  return (
    <>
      <MetaTags id="testride">
        <title>
          India's 1st AI Enabled Electric Bike, Electric Motorcycle by Revolt
          Motors
        </title>
        <meta
          name="description"
          content="India's 1st AI enabled smart electric bike (EV Bike) with next-gen computing and mobility solution from Revolt Motors. Join the Revolt & its high-performance bike.
"
        />
        <meta
          property="og:title"
          content="Book now India's 1st AI-enabled motorcycle"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub.
"
        />
      </MetaTags>

      {/* <section className='image-abts'>
                <img className='desktop' src='/images/test-ride.jpeg' alt='' />
                <img className='mobile' src='/images/test-mob.png' alt='' />
        </section>  */}

      <section className="test-ride-page padding-top-100 padding-bottom-100">
        <div className="container">
          {/*  */}
          <form id="msforms" className="form newTest" onSubmit={submitHandler}>
            <fieldset>
              <div className="form-card">
                <div className="row">
                  <div className="col-12 text-center">
                    <h2 className="fs-title text-center">
                      <b>
                        Hi, Please enter your details below to book a test ride
                        at a Revolt hub near you.
                      </b>
                    </h2>
                    <p>
                      Please enter your personal details below. Make sure you
                      enter the information with which you want to purchase &
                      register your Revolt Motorcycle. All payment related
                      information and other important updates will be shared on
                      those contact details only. Booking your Revolt involves a
                      nominal cost — an amount which is completely refundable
                      upon cancellation.{" "}
                    </p>
                  </div>
                </div>
                <div className="form-default">
                  <div className="row">
                    <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label>User Name / Mobile Number</label>
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

                    <div className="form-group col-md-4 email-group">
                      <div className="palceholder">
                        <label>Email </label>
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

                    {/* pincode */}
                    <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label>User Name / Mobile Number</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="text"
                        className="form-control inputfield"
                        id="pincode"
                        placeholder="Pincode"
                        required
                        value={pincode}
                        maxLength="6"
                        // onChange={(e) => setPincode(e.target.value)}
                        onChange={(e) => pincodeHandler(e.target.value)}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /([^0-9]+)/gi,
                            "",
                          ))
                        }
                      ></input>
                    </div>
                    {/*  */}
                    {/* <div className="form-group col-md-4">

                        <select id="area"
                          placeholder="Select your Preferred Model"
                          className="form-control"
                          required
                          value={selectModel}
                          onChange={(e) => setSelectModel(e.target.value)}
                        >
                          <option value="">Select your Preferred Model</option>

                          <option value='RV400' key='RV400'>
                            RV400
                          </option>

                        </select>
                      </div> */}

                    {/* <div className="form-group col-md-4">

                        <select id="state"
                          className="form-control"
                          placeholder="Select State"
                          required
                          value={selectedState}

                          onChange={(e) => changeHandlerState(e.target.value)}
                        >
                          <option>Choose State</option>
                          {availableStateList?.map((value, key) => {
                            return (
                              <option value={value.state_id} key={key}>
                                {value.state_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group col-md-4">

                        <select id="city"
                          className="form-control"
                          placeholder="City"
                          value={selectedCity}


                          onChange={(e) => changeHandlerCity(e.target.value)}

                          required
                        >
                          <option>Choose City</option>
                          {availableCity?.map((e, key) => {
                            return (
                              <option value={e.city_id} key={key}
                              >
                                {e.city_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group col-md-4">

                        <select id="area"
                          placeholder="Dealer Hub"
                          className="form-control"
                          required
                          value={selectedHub}
                          onChange={(e) => changeHandlerHub(e.target.value)}
                        >
                          <option value="">Dealer Hub </option>
                          {availableHub?.map((e, key) => {
                            return (
                              <option value={e.hub_id} key={key}>
                                {e.hub_name}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}
                    {/*  */}
                    {/* <div className="form-group col-md-4 email-group">

                        <div className="palceholder" >

                          <label  >Test Ride Date </label>
                          <span className="star">*</span>

                        </div>
                        <input
                          type="date"
                          id="testdate"
                          // min={disableDates()}
                          min={disablePastDate()}
                          // min={"04-06-2022"}
                          className="form-control inputfield"
                          placeholder="MM/DD/YYYY"
                          required
                          value={selectTestDate}
                          // onChange={(e) => setSelectTestDate(e.target.value)}
                          onChange={(e) => changeHandlerDate(e.target.value)}
                        ></input>
                      </div>
                      <div className="form-group col-md-4">

                        <select id="timeslot"
                          placeholder="Select Time Slot"
                          className="form-control"
                          required
                          value={selecttimeSlot}

                          onChange={(e) => changeHandlerTimeSlot(e.target.value)}
                        >
                          <option value="">Select Time Slot</option>


                          {TestRideSolts?.map((e, key) => {
                            return (
                              <option value={e.slot} key={key}>
                                {e.slot}
                              </option>
                            );
                          })}

                        </select>
                      </div> */}
                    {pinstate && (
                      <div id="statecity" className="my-2  font-weight-bold">
                        {pinstate}
                      </div>
                    )}
                    {/* { oppo &&
<div id="oppo" className="my-2   " style={{ "whiteSpace": "pre","font-weight": "600" }}>{oppo}</div>     }
 */}

                    {/* style={{"color": "#ed1c24"}} */}

                    {oppo && (
                      <div id="oppo" className="mt-2 mb-3 oppo">
                        <div className="oppp1">
                          Thank you for your interest in Revolt RV400. We regret
                          to inform you that we are currently unavailable at
                          your location.
                        </div>
                        <div className="oppop2">
                          Thank you for your understanding and patience. Rest
                          assured, we're actively working to expand our service
                          area, aiming to serve you better in the future. Keep
                          checking our website for updates.
                        </div>
                      </div>
                    )}
                    <div className="col-md-12 whatsaapform ">
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
                        />{" "}
                        Yes, opt me in
                      </label>
                    </div>
                  </div>

                  <span id="message"></span>
                  <div className=" row">
                    <div className="col-12 testride_submit_wrapper">
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
                              maxLength="6"
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
                      <div className="otp_btn_wrapper">
                        {otpbtn ? (
                          <input
                            type="button"
                            className="next action-button   "
                            value="Send OTP"
                            // disabled={name == "" || email == "" || selectedState == "" || selectedCity == "" || selectedHub == "" || selecttimeSlot == "" || selectTestDate == "" || selectModel == "" ? true : false}
                            disabled={
                              !(mobile.length == 10) || selectedHub == ""
                            }
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

                      {submitbtn && (
                        <input
                          type="submit"
                          disabled={otpbtn || selectedHub == ""}
                          name="next"
                          className="next action-button  "
                          value="Submit"
                          id="sumbtn"
                          // disabled={!mobileverify}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-start">
                  <p className="mb-0">
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
