import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axios as Axios } from "../utilities/axios";
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
import Loader from "../components/Loader";
import {
  detailsProduct,
  listStateCityHub,
  listStateCityHub_SC,
  listStateCityHub_upgrade,
} from "../actions/productActions";

const RV400FestiveOffer =
  "Get flat ₹10,000 off* + Additional benefits worth up to ₹23,200* on RV400";
const RV400BRZFestiveOffer =
  "Get flat ₹15,000 off* + Additional benefits worth up to ₹25,700* on RV400 BRZ";
// const RV1BRZFestiveOffer =
//   "Get flat ₹15,000 off* + Additional benefits worth up to ₹25,700* on RV400 BRZ";

export default function TestRideScreen(props) {
  const { search } = useLocation();
  // const redirectInUrl = new URLSearchParams(search).get('redirect');
  ////////////////////////BRZ//////////////////////
  const [festiveOfferText, setFestiveOfferText] =
    useState(RV400BRZFestiveOffer);

  const [comments, setComments] = useState("");
  const [socialDropdownValues, setSocialDropdownValues] = useState([]);
  const [submitbtn, setsubmitbtn] = useState(true);
  const [model, setModel] = useState("RV1");
  const cityStateList = useSelector((state) => state.state_city_hub_upgrade);
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = statecityhub
    ? JSON.parse(statecityhub)
    : cityStateList?.state_city_hub_upgrade;
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  const [pincode, setPincode] = useState("");
  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);
  const otpVerified = useRef(false);
  const [isDealer, setIsDealer] = useState(
    userInfo_myArr?.isSeller ? "Y" : "N"
  );
  const [source, setSource] = useState("");

  const navigate = useNavigate();
  const [name, setName] = useState(
    !isDealer ? (userInfo_myArr?.name ? userInfo_myArr.name : "") : ""
  );
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr.mobile : ""
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr.email : ""
  );

  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr.state : ""
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr.city : ""
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : ""
  );

  const [TestRideSolts, setTestRideSlots] = useState([]);
  const [testride, setTestRide] = useState([]);
  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(false);
  const [mobileverify, setMobileverify] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);

  const availableStateList = stateList?.filter((c) => c.status == 1);

  const availableCity = cityList?.filter(
    (c) => c.state_id == selectedState && c.status == 1
  );
  const availableHub = hubList?.filter((c) => c.city_id == selectedCity);
  const avaialblepin = availableHub?.filter((c) => c.hub_id == selectedHub);

  /////////////////////new test ride screen/////////////////
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  const [loaderOtp, setLoader] = useState(false);

  const productArr = product?.[model] ? [...product?.[model]].reverse() : [];

  let [color, setColor] = useState({});
  //////////////////////////////////////////////////////////

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Test Ride",
      "Page Url": window.location.href,
    });
    // let RV400ProductId = "RM0400RRCP1CWBLK";
    let RV400ProductId = "";
    dispatch(detailsProduct(RV400ProductId));
  }, []);

  useEffect(async () => {
    const { data } = await Axios.get(`${URL_API}/api/v1/customer/dropdown`);
    setSocialDropdownValues(data.message);
  }, []);

  useEffect(() => {
    console.log("Window is", window.location.href.split("=")[1]);
    if (window.location.href.split("?")?.[1]?.includes("model=RV400BRZ")) {
      setModel("RV400BRZ");
    }
    if (!localStorage.getItem("state_city_hub")) {
      dispatch(listStateCityHub());
      dispatch(listStateCityHub_upgrade());
      dispatch(listStateCityHub_SC());
    }
  }, []);

  useEffect(() => {
    setPincode(avaialblepin?.[0]?.dealer_pincode);
    console.log(avaialblepin?.[0]?.dealer_pincode);
  }, [avaialblepin]);

  useEffect(() => {
    setColor(
      product?.[model]?.length
        ? { ...product?.[model][product?.[model].length - 1] }
        : {}
    );
  }, [product]);

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
    otp,
    source
  ) {
    //insert test ride start
    const { data } = await Axios.post(`${URL_API}/api/v1/customer/testRide`, {
      name,
      mobile,
      email,
      otp,
      product_type: model,
      model,
      state,
      city,
      hub,
      pincode,
      testdate,
      timeslot,
      whatsapp,
      search,
      isSeller: isDealer === "Y" ? true : false,
      source,
      add_comments: comments,
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
        "Preferred Model": model,
        City: availableCity.filter(
          (value, index) => value.city_id == selectedCity
        )?.[0].city_name,
        State: availableStateList.filter(
          (value, index) => value.state_id == selectedState
        )[0].state_name,
        "Dealer Hub": availableHub.filter(
          (value, index) => value.hub_id == selectedHub
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

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    try {
      //   const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, {
      //     mobile,
      //     otp,
      //     headers: { Authorization: process.env.REACT_APP_API_KEY },
      //   });

      //   if (data.status === true) {
      message.innerHTML = "";
      setsubmitbtn(false);
      if (!otpVerified.current) {
        otpVerified.current = true;
        dispatch(
          submittestride(
            name,
            mobile,
            email,
            model,
            selectedState,
            selectedCity,
            selectedHub,
            pincode,
            selectTestDate,
            selecttimeSlot,
            whatsapp,
            otp,
            source,
            comments
          )
        );
      }
      // } else {
      //   message.style.color = badColor;
      //   message.innerHTML = "Please Enter Valid OTP.";
      // }
    } catch (error) {}
  };

  const checkTimeSlots = async (e) => {
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    setSelectTestDate(e);
    console.log(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/testrideslot/${selectedHub}/${e}`
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

    if (
      mobile_no === "" ||
      mobile_no === null ||
      mobile_no.length != 10 ||
      mobile_no[0] < 6
    ) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      setLoader(true);
      const result_pay = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
        mobile,
        email,
      });
      setLoader(false);
      setOtpbtn(false);

      // message.innerHTML = '';
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
      {loading || loaderOtp ? <Loader /> : null}
      <MetaTags id="testride">
        <title>Book Your Test Ride Now - Revolt Motors</title>

        <meta
          name="description"
          content="Feel the future of biking! Book a quick and easy electric bike test ride with us. Experience the fun, speed, and eco-friendly ride. Join us for a ride like no other!          "
        />
        <meta
          property="og:title"
          content="Book Your Test Ride Now - Revolt Motors"
        />
        <meta
          property="og:description"
          content="Feel the future of biking! Book a quick and easy electric bike test ride with us. Experience the fun, speed, and eco-friendly ride. Join us for a ride like no other!
          "
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/test-ride" />
      </MetaTags>

      {/* <section className='image-abts'>
                <img className='desktop' src='/images/test-ride.jpeg' alt='' />
                <img className='mobile' src='/images/test-mob.png' alt='' />
        </section>  */}

      <section className="light-grey bookNow newBookNow">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xs-12 col-sm-8 rv-pr">
              <div
                className={`placeholder-text ${
                  model === "RV400BRZ" ? "brz" : ""
                }`}
              >
                {model}
              </div>
              <div className="row">
                <div className="col-12 col-sm-9 order-sm-2 order-md-2 rv-pr">
                  <div className="carouselView test-ride">
                    {Object.keys(color).length ? (
                      <img
                        loading="lazy"
                        src={"/images/" + color.image}
                        className="rounded mx-auto d-block"
                      />
                    ) : (
                      ""
                    )}

                    <div className="bikeColorList text-center p-3">
                      <div
                        style={{
                          marginBottom: "10px",
                          fontSize: "14px",
                        }}
                      >
                        {color.color}
                      </div>
                      <ul>
                        {productArr?.map((value, index) => {
                          return (
                            <li
                              onClick={() => {
                                setColor({ ...value });
                              }}
                            >
                              <div
                                className={`bikeColorBox ${
                                  value.color === color.color ? "active" : ""
                                }`}
                              >
                                {" "}
                                <span
                                  style={{
                                    background: value.hex_color_code,
                                    height: "25px",
                                    width: "25px",
                                  }}
                                ></span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-3 order-sm-1 order-md-1">
                  {model === "RV1" ? (
                    <div className="bike-card-box">
                      <div
                        className="bike-model-card"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div
                          className="bike-model-body"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #707070",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="bike-box">
                            <img
                              alt="Revolt Battery"
                              src="/images/calenderhours.svg"
                            />
                            <p>0-80 %</p>
                            <h5>IN {"2 Hrs 15 Mins"}</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Electric bike speed"
                              src="/images/speed.svg"
                            />
                            <p>
                              70 KM/H <span>*</span>
                            </p>
                            <h5>TOP SPEED</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Motorcycle Battery Lifespan"
                              src="/images/battery.svg"
                            />
                            <p>
                              100 KMS <span>*</span>
                            </p>
                            <h5>
                              Per Charge <br />
                              Eco Mode
                            </h5>
                          </div>

                          {/* {model === "RV1" && (
                              <div className="bike-box">
                                <img alt="Revolt Mobile App" style={{ maxWidth: "18px" }} src="/images/phone.svg" />
                                <p style={{ textTransform: "capitalize" }}>mobile app</p>
                                <h5>WITH SMART <br /> FEATURES</h5>
                              </div>
                            )} */}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {model === "RV1+" && (
                    <div className="bike-card-box">
                      <div
                        className="bike-model-card"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div
                          className="bike-model-body"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #707070",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="bike-box">
                            <img
                              alt="Revolt Battery"
                              src="/images/calenderhours.svg"
                            />
                            <p>0-80 %</p>
                            <h5>IN {"3 Hrs 30 Mins"}</h5>
                          </div>

                          <div className="bike-box">
                            {" "}
                            <img
                              alt="Motorcycle Battery Lifespan"
                              src="/images/fast-charging.png"
                            />
                            <p className="fastCharging">
                              <span className="charge">Fast Charging </span>
                              <span>0-80%</span>
                            </p>
                            <h5> In 1 Hrs 20 Mins</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Electric bike speed"
                              src="/images/speed.svg"
                            />
                            <p>
                              70 KM/H <span>*</span>
                            </p>
                            <h5>TOP SPEED</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Motorcycle Battery Lifespan"
                              src="/images/battery.svg"
                            />
                            <p>
                              160 KMS <span>*</span>
                            </p>
                            <h5>
                              Per Charge
                              <br />
                              Eco Mode
                            </h5>
                          </div>

                          {/* {model === "RV2" && (
                              <div className="bike-box">
                                <img alt="Revolt Mobile App" style={{ maxWidth: "18px" }} src="/images/phone.svg" />
                                <p style={{ textTransform: "capitalize" }}>mobile app</p>
                                <h5>WITH SMART <br /> FEATURES</h5>
                              </div>
                            )} */}
                        </div>
                      </div>
                    </div>
                  )}
                  {model === "RV400" || model === "RV400BRZ" ? (
                    <div className="bike-card-box">
                      <div
                        className="bike-model-card"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div
                          className="bike-model-body"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #707070",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="bike-box">
                            <img
                              alt="Revolt Battery"
                              src="/images/calenderhours.svg"
                            />
                            <p>0-80%</p>
                            <h5>IN {"3 Hrs 30 Mins"}</h5>
                          </div>

                          <div className="bike-box">
                            {" "}
                            <img
                              alt="Motorcycle Battery Lifespan"
                              src="/images/fast-charging.png"
                            />
                            <p className="fastCharging">
                              <span className="charge">Fast Charging </span>
                              <span>0-80%</span>
                            </p>
                            <h5> In 1 Hrs 20 Mins</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Electric bike speed"
                              src="/images/speed.svg"
                            />
                            <p>
                              85 KM/H <span>*</span>
                            </p>
                            <h5>TOP SPEED</h5>
                          </div>

                          <div className="bike-box">
                            <img
                              alt="Motorcycle Battery Lifespan"
                              src="/images/battery.svg"
                            />
                            <p>
                              150 KMS <span>*</span>
                            </p>
                            <h5>Per Charge</h5>
                          </div>

                          {model === "RV400" && (
                            <div className="bike-box">
                              <img
                                alt="Revolt Mobile App"
                                style={{ maxWidth: "18px" }}
                                src="/images/phone.svg"
                              />
                              <p style={{ textTransform: "capitalize" }}>
                                mobile app
                              </p>
                              <h5>
                                WITH SMART <br /> FEATURES
                              </h5>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/*  */}

            <div className="col-xs-12 col-sm-4 testRideView formView">
              <form id="msformNew" className="form" onSubmit={submitHandler}>
                <div className="form-card test-ride-card">
                  <div className="row">
                    <div className="col-sm-12">
                      <div>
                        {Object.keys(color).length ? <span>&nbsp;</span> : ""}
                        {/* <h6>RV400</h6> */}
                        <div className="rvModel-choose">
                          <h1>Book your test ride</h1>
                          {/* <div className="bikeOfferBox">
                            {" "}
                            <h5>Festive Offer</h5>
                            <p>
                              {festiveOfferText} <span>*T&C Apply</span>
                            </p>
                          </div> */}
                          <h4>Choose your model</h4>
                          <div className="rvModel-chooseBlock">
                            {/* <div
                              id="rv1"
                              className={`model-item ${model === "RV1" ? "selected-bg" : ""
                                }`}
                              onClick={() => {
                                setModel("RV400");
                                setColor(
                                  product?.RV400?.length
                                    ? {
                                      ...product?.RV400?.[
                                      product?.RV400.length - 1
                                      ],
                                    }
                                    : {},
                                );
                              }}
                            >
                              RV400
                            </div> */}
                            <div
                              id="rv1"
                              className={`model-item ${model === "RV1" ? "selected-bg" : ""}`}
                              onClick={() => {
                                setModel("RV1");
                                setColor(
                                  product?.RV1?.length
                                    ? {
                                        ...product?.RV1?.[
                                          product?.RV1.length - 1
                                        ],
                                      }
                                    : {}
                                );
                              }}
                            >
                              RV1
                            </div>
                            <div
                              id="rv+"
                              className={`model-item ${
                                model === "RV1+" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV1+");
                                setColor(
                                  product?.["RV1+"]?.length
                                    ? {
                                        ...product?.["RV1+"]?.[
                                          product?.["RV1+"].length - 1
                                        ],
                                      }
                                    : {}
                                );
                              }}
                            >
                              RV1+
                            </div>
                            <div
                              id="rv400brz"
                              className={`model-item ${
                                model === "RV400BRZ" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV400BRZ");
                                setColor(
                                  product?.RV400BRZ?.length
                                    ? {
                                        ...product?.RV400BRZ?.[
                                          product?.RV400BRZ.length - 1
                                        ],
                                      }
                                    : {}
                                );
                                setFestiveOfferText(RV400BRZFestiveOffer);
                              }}
                            >
                              RV400 BRZ
                            </div>
                            <div
                              id="rv400"
                              className={`model-item ${
                                model === "RV400" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV400");
                                setColor(
                                  product?.RV400?.length
                                    ? {
                                        ...product?.RV400?.[
                                          product?.RV400.length - 1
                                        ],
                                      }
                                    : {}
                                );
                                setFestiveOfferText(RV400FestiveOffer);
                              }}
                            >
                              RV400
                            </div>
                            {/* <div
                              id="rv400"
                              className={`model-item ${
                                model === "RV400" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV400");
                                setColor(
                                  product?.RV400?.length
                                    ? {
                                        ...product?.RV400?.[
                                          product?.RV400.length - 1
                                        ],
                                      }
                                    : {},
                                );
                                setFestiveOfferText(RV1BRZFestiveOffer);
                              }}
                            >
                              RV1
                            </div> */}
                          </div>
                        </div>
                        {/* <h2 className="fs-title">
                          Hi, Share your details to book a test ride.
                        </h2> */}
                      </div>
                    </div>
                  </div>

                  <div className="form-default">
                    <div className="row">
                      <div className="form-group col-md-12 name-group">
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
                          maxLength={40}
                          onChange={(e) => setName(e.target.value)}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /([^a-z 0-9]+)/gi,
                              ""
                            ))
                          }
                        ></input>
                      </div>
                      <div className="form-group col-md-12 name-group">
                        <div className="palceholder">
                          <label>Mobile </label>
                          <span className="star">*</span>
                        </div>

                        <input
                          type="text"
                          id="mobile"
                          className="form-control inputfield"
                          placeholder="Mobile"
                          value={mobile}
                          minLength="10"
                          maxLength="10"
                          pattern="[6-9]{1,1}[0-9]{9,9}"
                          title="Please enter a valid mobile number"
                          onInput={(e) => {
                            let value = e.target.value;
                            e.target.value = e.target.value.slice(0, 10);
                            if (/[A-Za-z]/.test(value)) {
                              e.target.value = mobile;
                            }
                          }}
                          required
                          onChange={(e) => {
                            if (
                              !e.target.value ||
                              parseInt(
                                e.target.value[e.target.value.length - 1]
                              ) > -1
                            ) {
                              console.log("Mobile", e.target.value);
                              setMobile(e.target.value);
                            }
                          }}
                        ></input>
                      </div>

                      <div className="form-group col-md-12 email-group">
                        <div className="palceholder">
                          <label>Email </label>
                          <span className="star">*</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          pattern="^[A-Za-z]{1,1}[A-Za-z0-9]{0,}(?!.*\.\.)[_.A-Za-z0-9]{1,}[a-zA-Z0-9]{1,1}@[A-Za-z]{1,}\.([a-zA-Z]{2,})(\.([a-zA-Z]{2,})){0,1}$"
                          title="Please enter a valid email address"
                          className="form-control inputfield"
                          placeholder="Email"
                          required
                          value={email}
                          maxLength={50}
                          onChange={(e) => setEmail(e.target.value)}
                          onInput={(e) => {
                            let value = e.target.value;
                            let length = value.length;
                            if (value[length - 1] == "\\") {
                              e.target.value = value.slice(0, length - 1);
                            }
                          }}
                        ></input>
                      </div>

                      <div className="form-group col-md-6">
                        <select
                          id="state"
                          className="form-control"
                          placeholder="Select State"
                          required
                          value={selectedState}
                          onChange={(e) => changeHandlerState(e.target.value)}
                          disabled={isDealer == "Y"}
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
                      <div className="form-group col-md-6">
                        <select
                          id="city"
                          className="form-control"
                          placeholder="City"
                          value={selectedCity}
                          onChange={(e) => changeHandlerCity(e.target.value)}
                          disabled={isDealer == "Y"}
                          required
                        >
                          <option>Choose City</option>
                          {availableCity?.map((e, key) => {
                            return (
                              <option value={e.city_id} key={key}>
                                {e.city_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          id="area"
                          placeholder="Dealer Hub"
                          className="form-control"
                          required
                          value={selectedHub}
                          onChange={(e) => changeHandlerHub(e.target.value)}
                          disabled={isDealer == "Y"}
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
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          id="area"
                          placeholder="Where did you hear about Revolt?"
                          className="form-control"
                          required
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                        >
                          <option value="">
                            Where did you hear about Revolt?
                          </option>
                          {socialDropdownValues?.map((e, key) => {
                            return (
                              <option value={e.id} key={key}>
                                {e.source}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {isDealer == "Y" && (source == 5 || source == 10) ? (
                        <div>
                          <div className="palceholder">
                            <label htmlFor="name">Comments</label>
                            <span className="star">*</span>
                          </div>

                          <textarea
                            rows={2}
                            style={{ resize: "none" }}
                            className="form-control inputfield"
                            id="name"
                            placeholder="Please provide more details"
                            name="name"
                            maxlength="80"
                            required
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^a-z ]+)/gi,
                                ""
                              ))
                            }
                          ></textarea>
                        </div>
                      ) : null}

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

                      <div className="form-group col-md-12 checkboxihave">
                        <label>
                          <input
                            type="checkbox"
                            id="check"
                            name="whatsapp"
                            className="input"
                            checked={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.checked)}
                          />{" "}
                          Yes, opt me in
                        </label>
                      </div>
                      <div className="form-group">
                        <span id="message"></span>
                        <div className="testride_submit_wrapper ">
                          {/*  */}
                          {/* otp field start */}
                          {/* {!otpbtn ? (
                            <>
                              <div className="form-group">
                                <div className="palceholder">
                                  <label>OTP </label>
                                  <span className="star">*</span>
                                </div>
 
                                <input
                                  type="text"
                                  id="otp"
                                  className="form-control inputfield"
                                  placeholder="OTP"
                                  pattern="^[0-9]{0,6}$"
                                  value={otp}
                                  maxlength="6"
                                  onChange={(e) => {
                                    if (
                                      !e.target.value ||
                                      parseInt(
                                        e.target.value[
                                          e.target.value.length - 1
                                        ]
                                      ) > -1
                                    ) {
                                      setOtp(e.target.value);
                                    }
                                  }}
                                  required
                                ></input>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <span id="message"></span>
                          */}
                          {/* otp field end */}

                          {/*  */}
                          <div className="test-ride-box">
                            {/* <div
                              className="otp_btn_wrapper"
                              style={{ borderRadius: "5px", width: "160px" }}
                            >
                             {otpbtn ? (
                                <input
                                  type="button"
                                  className="next action-button otp"
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
                            <span
                              style={{ display: "none" }}
                              id="message"
                            ></span> */}
                            {submitbtn && (
                              <input
                                style={{ width: "100%" }}
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
                        <div className="text-start">
                          <p className="mb-0 terms">
                            *By clicking “Submit”, I give my consent to Revolt
                            Intellicorp Private Limited and its authorised
                            service providers to hold my personal data and
                            communicate with me by e-mail, WhatsApp, SMS or
                            phone call for Notify purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/*  */}
        </div>
      </section>
    </>
  );
}
