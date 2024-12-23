import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_BOOK_RESET } from "../constants/userConstants";
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

import { userBookingReducer } from "../reducers/userReducers";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import $ from "jquery";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

export default function BookingScreen(props) {
  const [submitbtn, setsubmitbtn] = useState(true);
  // const onclicksubmit = () => {
  //   setsubmitbtn(false);
  // };
  const [whatsapp, setWhatsapp] = useState(false);
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  //
  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);
  console.log(userInfo_myArr);
  const bookinginfo = useSelector((state) => state.bookinginfo);
  const { bookInfo, error } = bookinginfo;

  const navigate = useNavigate();

  const [usertoken, setUsertoken] = useState(
    userInfo_myArr?.token ? userInfo_myArr?.token : "",
  );
  const [isDealer, setIsDealer] = useState(
    userInfo_myArr?.isSeller ? "Y" : "N",
  );
  const [isAdmin, setIsAdmin] = useState(userInfo_myArr?.isAdmin ? "Y" : "N");

  const [name, setName] = useState(isDealer == "N" ? userInfo_myArr?.name : "");
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr?.mobile : "",
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr?.email : "",
  );
  const [pincode, setPincode] = useState(
    isDealer == "Y" ? userInfo_myArr?.pincode : "",
  );
  const [pinstate, setPinstate] = useState(
    isDealer == "Y"
      ? userInfo_myArr?.name +
          ", " +
          userInfo_myArr?.city_name +
          ", " +
          userInfo_myArr?.state_name
      : "",
  );
  const [oppo, setoppo] = useState("");
  const [hubname, sethubname] = useState("");
  //const usertoken = userInfo_myArr?.token ? userInfo_myArr?.token : '';
  //const isDealer = userInfo_myArr?.isSeller ? 'Y' : 'N';

  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr?.state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr?.city : "",
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : "",
  );

  const availableStateList = stateList?.filter((c) => c.status == 1);
  //console.log(availableStateList);
  const availableCity = cityList?.filter(
    (c) => c.state_id == selectedState && c.status == 1,
  );
  const availableHub = hubList?.filter(
    (c) => c.city_id == selectedCity && c.status == 1,
  );
  //

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [SlotAvilable, setSlotAvilable] = useState([]);

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);
  const [termCondition, setTermsCondition] = useState(false);
  const handleTerms = () => setTermsCondition(false);
  //const userRegister = useSelector((state) => state.userRegister);
  //const { userInfo } = userRegister;
  //  let utm_url = "?utm_source=SMSwapp_Booknow&utm_medium=SMSwapp&utm_campaign=SMSwapp_Booknow"
  //    let utm_params = utm_url?.split('?')[1]
  //    let utm_param =  utm_params?.split('&')
  //      console.log(utm_param.length)
  //    let mx_UTM_Source="",mx_UTM_Medium="",mx_UTM_Campaign="",mx_UTM_ID="";

  //  if(utm_param.length > -1){mx_UTM_Source=utm_param[0] ? utm_param[0].split('=')[1] :""}
  //  if(utm_param.length > 0){ mx_UTM_Medium=utm_param[1].split('=')[1] ? utm_param[1].split('=')[1] :""}
  //  if(utm_param.length > 1){mx_UTM_Campaign=utm_param[2].split('=')[1] ? utm_param[2].split('=')[1] :""}
  //  if(utm_param.length > 2){mx_UTM_ID=""}

  //  console.log(mx_UTM_Source)
  //  console.log(mx_UTM_Medium)
  //  console.log(mx_UTM_Campaign)
  //  console.log(mx_UTM_ID)
  // console.log(utm_param)
  const dispatch = useDispatch();

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      const result_pay = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
        mobile,
        email,
      });
      setOtpbtn(false);
      message.innerHTML = "";
    }
  }

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Booking screen",
      "Page Url": window.location.href,
    });
  }, []);

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
  async function submitbooking() {
    if (hubname == "REVOLT CENTRAL HUB") {
      handlenotifyme();

      setoppo(`Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.
We apologize for any inconvenience caused.
Thank you for your understanding and patience.
Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.
Keep checking our website for updates.`);
      // setoppo("<p>Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.</p><p> We apologize for any inconvenience caused.</p><p> Thank you for your understanding and patience.</p><p> Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.</p><p> Keep checking our website for updates. ")
      // setoppo("Thank you for your interest in Revolt RV400. We regret to inform you that we are currently unavailable at your location.\n We apologize for any inconvenience caused.\n  Thank you for your understanding and patience.\n Rest assured, we're actively working to expand our service area, aiming to serve you better in the future.\n Keep checking our website for updates. ")
    } else if (hubname != "REVOLT CENTRAL HUB") {
      //////////////////
      setoppo("");
      if (SlotAvilable?.city_stock == "ok") {
        setsubmitbtn(false);
        await dispatch(
          booking(
            userInfo_myArr?.id,
            name,
            mobile,
            email,
            selectedState,
            selectedCity,
            selectedHub,
            pincode,
            usertoken,
            isDealer,
            isAdmin,
            search,
          ),
        );
        console.log(error);
        if (error) {
          //dispatch({ type: USER_BOOK_RESET });
          // alert('Your are having account with Revolt, Please SignIn!')
          navigate(`/product/RM0400RRCP1CWBLK` + search);
        } else {
          //if(bookInfo) {

          navigate(`/product/RM0400RRCP1CWBLK` + search);
          //}
        }
      } else {
      }
      ////////////////
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("otpmessage");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    try {
      //const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, { mobile, otp ,
      //headers: { Authorization: process.env.REACT_APP_API_KEY }
      //});

      /*if(data.status === true)
    {*/
      message.innerHTML = "";
      submitbooking();
      //setsubmitbtn(false);
      clevertap.onUserLogin.push({
        Site: {
          Name: name,
          Identity: mobile,
          Email: email,
          Phone: "+91" + mobile,
        },
      });

      clevertap.event.push("Booking Initiated", {
        Name: name,
        Mobile: mobile,
        Email: email,
        City: availableCity.filter(
          (value, index) => value.city_id == selectedCity,
        )[0].city_name,
        State: availableStateList.filter(
          (value, index) => value.state_id == selectedState,
        )[0].state_name,
        "Dealer Hub": availableHub.filter(
          (value, index) => value.hub_id == selectedHub,
        )[0].hub_name,
        Date: new Date(),
      });

      /*}
    else
    {
     
    
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid OTP."  ;
      
    } */
    } catch (error) {}

    // otp verify end

    // navigate(`/product/RM0400RRCP1CWBLK`);
    //navigate(`/cart/${productId}?qty=${qty}`);
    //zconsole.log(error)
  };

  const checkBookingSlot = async (e) => {
    setSelectedHub(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`,
      );
      console.log(data.data);
      setSlotAvilable(data.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
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
  //
  const pincodeHandler = async (e) => {
    setPincode(e);
    // console.log(pincode)
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
          localStorage.setItem("bookingCity", res.state_name);
          setSelectedHub(res.hub_id);
          checkBookingSlot(res.hub_id);
          sethubname(res.hub_name);
          let mess;
          if (res.hub_name == "REVOLT CENTRAL HUB") {
            // mess = res.hub_name  ;
            mess = "";
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
    }
  };

  //
  useEffect(() => {
    if (isDealer == "Y") {
      // pincodeHandler(pincode)
      // checkBookingSlot(selectedHub)
      ///

      ///

      checkBookingSlot(selectedHub);
    }
  }, [isDealer]);
  // useEffect(() => {

  //   console.log(error)
  //   if (error) {

  //   //   // navigate('/product/RM0400RRCP1CWBLK');/signin?redirect=
  //   //   // navigate(`/product/RM0400RRCP1CWBLK`);
  //   dispatch({ type: USER_BOOK_RESET });

  //    }
  // }, [navigate, redirect, bookInfo,error]);
  useEffect(() => {
    // localStorage.removeItem('cartItems');

    if (error) {
      //navigate(redirect);
      navigate(`/book`);
    }
  }, [navigate, redirect, bookInfo, error]);

  useEffect(() => {
    //  $('#checkox').on('click', function(){
    //     if( $(this).is(':checked')) {
    //           if( name && mobile && email && selectedState && selectedCity && selectedHub ){
    //                let val = $('#area').val();
    //                checkBookingSlot(val);
    //           }
    //           else{
    //                $('.action-button').prop('disabled', true);
    //           }
    //     }
    //     else{
    //           $('.action-button').prop('disabled', true);
    //     }
    // });
  });

  useEffect(() => {
    // alert("hi");
    dispatch({ type: USER_BOOK_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch({ type: ORDER_PAY_RESET });

    localStorage.removeItem("cartItems");
    localStorage.removeItem("orderdetails");
    localStorage.removeItem("bookinginfo");
    localStorage.removeItem("shippingAddress");
    // alert("sam");
  }, []);
  return (
    <div>
      <MetaTags id="home">
        <title>
          Electric Bike Booking Starts, Buy EV Bikes Online at Revolt Motors
        </title>
        <meta
          name="description"
          content="India's 1st smart electric bike online booking starts at Revolt Motors. Get a step closer to your stylish electronic motorcycle by selecting your e bike model.
"
        />
        <meta
          property="og:title"
          content="Book now India's 1st AI-enabled motorcycle"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub."
        />
      </MetaTags>

      {/*  */}
      <section className="light-grey bookNow padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center p-0 ">
              <div className="form-bg form-default">
                <form id="msformNew" className="form" onSubmit={submitHandler}>
                  <ul id="progressbar">
                    <li className="active" id="account">
                      <strong>Your Details </strong>
                    </li>
                    <li id="personal">
                      <strong> Choose Model & MRP</strong>
                    </li>
                    <li id="payment">
                      <strong> Booking Payment </strong>
                    </li>
                    <li id="confirm">
                      <strong> Start My Revolt Plan </strong>
                    </li>
                  </ul>

                  <fieldset>
                    <div className="form-card">
                      <div className="row">
                        <div className="col-12">
                          {error && (
                            <MessageBox variant="danger">{error}</MessageBox>
                          )}

                          <div className="text-center">
                            <h2 className="fs-title text-center">
                              <b>
                                Hey! Great to see you in the future. Let's help
                                you book your Revolt.
                              </b>
                            </h2>
                            <p>
                              Please enter your personal details below. Make
                              sure you enter the information with which you want
                              to purchase & register your Revolt Motorcycle. All
                              payment related information and other important
                              updates will be shared on those contact details
                              only. Booking your Revolt involves a nominal cost
                              — an amount which is completely refundable upon
                              cancellation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="login-space-no">
                        <div className="row">
                          <div className="form-group col-md-4 name-group">
                            {/* <img src="images/users.png" className="iconleft" alt=""/> */}
                            <div className="palceholder">
                              <label htmlFor="name">
                                User Name / Mobile Number
                              </label>
                              <span className="star">*</span>
                            </div>

                            <input
                              type="text"
                              className="form-control inputfield"
                              id="name"
                              placeholder="Name"
                              name="name"
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
                            {/* <img src="images/phone-icon.png" className="iconleft" alt=""/> */}
                            <div className="palceholder">
                              <label htmlFor="Phone">Mobile </label>
                              <span className="star">*</span>
                            </div>

                            <input
                              type="number"
                              id="mobile"
                              name="mobile"
                              className="form-control inputfield"
                              placeholder="Mobile"
                              // value={userInfo_myArr?.mobile}
                              value={mobile}
                              pattern="d{10}"
                              maxLength={10}
                              required
                              onChange={(e) => setMobile(e.target.value)}
                              onInput={(e) =>
                                (e.target.value = e.target.value.slice(0, 10))
                              }
                            ></input>
                          </div>

                          <div className="form-group col-md-4 email-group">
                            {/* <img src="images/email-icon.png" className="iconleft emails" alt=""/> */}
                            <div className="palceholder">
                              <label htmlFor="email">Email </label>
                              <span className="star">*</span>
                            </div>
                            <input
                              type="email"
                              id="email"
                              className="form-control inputfield"
                              placeholder="Email"
                              name="email"
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
                              disabled={isDealer == "Y"}
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

                                                  <select id="state"
                                                      className="form-control"
                                                      placeholder="Select State"
                                                      required
                                                      value={selectedState}
                                                      name="state"
                                                      onChange={(e) => setSelectedState(e.target.value)}
                                                    disabled={isDealer=='Y'}
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
                                                      name="city"

                                                      onChange={(e) => setSelectedCity(e.target.value)} 
                                                      required
                                                      disabled={isDealer=='Y'}
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
                                                      name="area"
                                                      required
                                                      value =   {selectedHub}
                                                      // value={selectedHub}
                                                      // onChange={(e) => setSelectedHub(e.target.value)}
                                                      onChange={(e) => checkBookingSlot(e.target.value)}
                                                      disabled={isDealer=='Y'}
                                                  >
                                                      <option value="">Dealer Hub</option>
                                                      {availableHub?.map((e, key) => {
                                                          return (
                                                              <option value={e.hub_id} key={key}>
                                                                  {e.hub_name}
                                                              </option>
                                                          );
                                                      })}
                                                  </select>
                                                  <span id="message" className="mt-1 text-left pl-2">{SlotAvilable?.city_stock != "ok" ? SlotAvilable?.city_stock : ""}</span>
                                              </div> */}
                          {pinstate && (
                            <div
                              id="statecity"
                              className="my-2  font-weight-bold"
                            >
                              {pinstate}
                            </div>
                          )}

                          {/* { oppo &&
<div id="oppo" className="my-2 oppo" style={{ "whiteSpace": "pre","font-weight": "600" }}>{oppo}</div>     } */}

                          {oppo && (
                            <div id="oppo" className="my-2 oppo">
                              <div className="oppp1">
                                Thank you for your interest in Revolt RV400. We
                                regret to inform you that we are currently
                                unavailable at your location.
                              </div>
                              <div className="oppop2">
                                Thank you for your understanding and patience.
                                Rest assured, we're actively working to expand
                                our service area, aiming to serve you better in
                                the future. Keep checking our website for
                                updates.
                              </div>
                            </div>
                          )}

                          {/* style={{"color": "#ed1c24"}} */}
                          <div className="form-group col-md-12 checkboxihave">
                            <label>
                              {" "}
                              <input type="checkbox" id="checkox" required />I
                              have read and I agree to the{" "}
                              <a target="_blank" href="/terms">
                                Terms & Conditions
                              </a>{" "}
                              for this booking.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="testride_submit_wrapper">
                      {/*  */}
                      <span id="otpmessage"></span>
                      <div className="otp_btn_wrapper"></div>
                      {/*  */}

                      {submitbtn && (
                        <input
                          type="submit"
                          disabled={
                            mobile.length != 10 ||
                            SlotAvilable.city_stock != "ok"
                          }
                          name="next"
                          className="next action-button"
                          value="Next"
                        />
                      )}

                      <p> </p>
                    </div>
                    {/* new otp end */}
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
    </div>
  );
}
