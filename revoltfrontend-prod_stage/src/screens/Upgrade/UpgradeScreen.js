import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { upgrade } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_BOOK_RESET } from "../../constants/userConstants";
import { userBookingReducer } from "../../reducers/userReducers";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import { axios as Axios } from "../../utilities/axios";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import $ from "jquery";
import MetaTags from "react-meta-tags";

export default function UpgradeScreen(props) {
  const cutomer = props?.orders[0];

  //
  const state_city_hub_upgrade = localStorage.getItem("state_city_hub_upgrade");
  const stateList_myArr = JSON.parse(state_city_hub_upgrade);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //
  // const userInfo_info = localStorage.getItem("userInfo");
  // const userInfo_myArr = JSON.parse(userInfo_info);

  const bookinginfo = useSelector((state) => state.bookinginfo);
  const { bookInfo, error } = bookinginfo;

  const navigate = useNavigate();

  const [usertoken, setUsertoken] = useState(
    cutomer?.token ? cutomer?.token : "",
  );
  const [isDealer, setIsDealer] = useState(cutomer?.isSeller ? "Y" : "N");
  const [isAdmin, setIsAdmin] = useState(cutomer?.isAdmin ? "Y" : "N");

  const [name, setName] = useState(cutomer?.name ? cutomer?.name : "");
  const [mobile, setMobile] = useState(cutomer?.mobile ? cutomer?.mobile : "");
  const [email, setEmail] = useState(cutomer?.email ? cutomer?.email : "");
  const [chassis, setChassis] = useState(
    cutomer?.chassis ? cutomer?.chassis : "",
  );

  //const usertoken = cutomer?.token ? cutomer?.token : '';
  //const isDealer = cutomer?.isSeller ? 'Y' : 'N';

  const [selectedState, setSelectedState] = React.useState(
    cutomer?.state ? cutomer?.state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    cutomer?.city ? cutomer?.city : "",
  );
  const [selectedHub, setSelectedHub] = React.useState(
    cutomer?.area ? cutomer.area : "",
  );

  const availableStateList = stateList.filter((c) => c.status == 1);
  //console.log(availableStateList);
  const availableCity = cityList.filter(
    (c) => c.state_id == selectedState && c.status == 1,
  );
  const availableHub = hubList.filter((c) => c.city_id == selectedCity);
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

  async function submitbooking() {
    //////////////////
    if (SlotAvilable?.city_stock == "ok") {
      await dispatch(
        upgrade(
          cutomer?.id,
          name,
          mobile,
          email,
          chassis,
          selectedState,
          selectedCity,
          selectedHub,
          usertoken,
          isDealer,
          isAdmin,
        ),
      );
      console.log(error);
      if (error) {
        //dispatch({ type: USER_BOOK_RESET });
        // alert('Your are having account with Revolt, Please SignIn!')
        navigate(`/upgradeproduct` + search);
      } else {
        //if(bookInfo) {

        navigate(`/upgradeproduct` + search);
        //}
      }
    } else {
    }
    ////////////////
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

  useEffect(() => {
    if (isDealer == "Y") {
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
    localStorage.removeItem("cartItems");
    if (error) {
      //navigate(redirect);
      navigate(`/book `);
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
    dispatch({ type: USER_BOOK_RESET });
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
                                Hey! Congratulations on upgrading your RV400!!!
                              </b>
                            </h2>
                            <p>
                              Please enter required details below to check the
                              eligibility of your RV400.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="login-space-no">
                        <div className="row">
                          <div className="form-group col-md-4 offset-md-4  ">
                            <select
                              id="chassis"
                              className="form-control"
                              placeholder="Select Chassis Number"
                              required
                              value={chassis}
                              name="chassis"
                              onChange={(e) => setChassis(e.target.value)}
                            >
                              {props?.orders?.map((value, key) => {
                                return (
                                  <option value={value.chassis} key={key}>
                                    {value.chassis}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="clearfix"></div>
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
                              disabled
                              className="form-control inputfield"
                              placeholder="Mobile"
                              // value={cutomer?.mobile}
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

                          <div className="form-group col-md-4">
                            <select
                              id="state"
                              className="form-control"
                              placeholder="Select State"
                              required
                              value={selectedState}
                              name="state"
                              onChange={(e) => setSelectedState(e.target.value)}
                              disabled={isDealer == "Y"}
                            >
                              <option>Choose State</option>
                              {availableStateList.map((value, key) => {
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
                              name="city"
                              onChange={(e) => setSelectedCity(e.target.value)}
                              required
                              disabled={isDealer == "Y"}
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
                          <div className="form-group col-md-4">
                            <select
                              id="area"
                              placeholder="Dealer Hub"
                              className="form-control"
                              name="area"
                              required
                              value={selectedHub}
                              // value={selectedHub}
                              // onChange={(e) => setSelectedHub(e.target.value)}
                              onChange={(e) => checkBookingSlot(e.target.value)}
                              disabled={isDealer == "Y"}
                            >
                              <option value="">Dealer Hub</option>
                              {availableHub.map((e, key) => {
                                return (
                                  <option value={e.hub_id} key={key}>
                                    {e.hub_name}
                                  </option>
                                );
                              })}
                            </select>
                            <span id="message" className="mt-1 text-left pl-2">
                              {SlotAvilable?.city_stock != "ok"
                                ? SlotAvilable?.city_stock
                                : ""}
                            </span>
                          </div>
                          <div className="form-group col-md-12 checkboxihave">
                            <label>
                              {" "}
                              <input type="checkbox" id="checkox" required />I
                              have read and I agree to the{" "}
                              <a target="_blank" href="/terms">
                                Terms & Conditions
                              </a>{" "}
                              for this upgrade.
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
                      <input
                        type="submit"
                        disabled={
                          mobile.length != 10 || SlotAvilable.city_stock != "ok"
                        }
                        name="next"
                        className="next action-button"
                        value="Next"
                      />
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
