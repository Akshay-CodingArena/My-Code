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
import RevoltMap from "../components/revoltmap";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

function ContactUs() {
  const { search } = useLocation();
  const [submitbtn, setsubmitbtn] = useState(true);
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //

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

  const [comment, setComment] = useState("");
  const [interestedin, setInterestedin] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);

  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr.state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr.city : "",
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : "",
  );

  const availableCity = cityList.filter((c) => c.state_id == selectedState);
  const availableHub = hubList.filter((c) => c.city_id == selectedCity);
  const [pincode, setPincode] = useState("");
  const [pinstate, setPinstate] = useState("");

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);
  const [mobileverify, setMobileverify] = useState(false);

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Contact Us",
      "Page Url": window.location.href,
    });
  }, []);

  async function submitcontactus(
    name,
    mobile,
    email,
    state,
    city,
    hub,
    interestedin,
    whatsapp,
    comment,
    pincode,
  ) {
    //insert test ride start
    const { data } = await Axios.post(`${URL_API}/api/v1/customer/contact-us`, {
      name,
      mobile,
      email,
      state,
      city,
      hub,
      interestedin,
      whatsapp,
      comment,
      search,
      pincode,
    });

    //console.log(data)
    if (data.status) {
      //  navigate('/thankyouride');
      clevertap.onUserLogin.push({
        Site: {
          Name: name,
          Identity: mobile,
          Email: email,
          Phone: "+91" + mobile,
          "MSG-whatsapp": whatsapp,
        },
      });

      clevertap.event.push("Contact us", {
        Name: name,
        Email: email,
        Mobile: mobile,
        City: availableCity.filter((value, index) => value.city_id == city)[0]
          .city_name,
        State: stateList.filter((value, index) => value.state_id == state)[0]
          .state_name,
        "Interested In": interestedin,
        IsWhatsAppOption: whatsapp,
        message: comment,
        Date: new Date(),
      });
      navigate(`/thankyoucontact/${data.contactus_id}`);
    }

    //  insert test ride end
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

      console.log(data);

      if (data.status === true) {
        message.innerHTML = "";

        setsubmitbtn(false);

        dispatch(
          submitcontactus(
            name,
            mobile,
            email,
            selectedState,
            selectedCity,
            selectedHub,
            interestedin,
            whatsapp,
            comment,
            pincode,
          ),
        );
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP Number.";
      }
    } catch (error) {}

    // otp verify end
  };

  async function checkOTP(checkbox) {
    let mobile = document.getElementById("mobile").value;
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (mobile_no == "" || mobile_no == null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      if (!navigator.webdriver) {
        const { data } = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
          mobile,
          email,
        });
        setOtpbtn(false);
      }
      // message.innerHTML = "";
    }
  }
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
          // setState(res.state_name)
          // setCity(res.city_name)
          // setHub(res.hub_name)
          let mess;
          if (res.hub_name == "REVOLT CENTRAL HUB") {
            mess = res.hub_name;
          } else {
            mess = res.hub_name + ", " + res.city_name + ", " + res.state_name;
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

  return (
    <>
      <MetaTags>
        <title>Contact Us for Electric Bikes - Revolt Motors</title>
        <meta
          name="description"
          content="Need help with electric bikes? Contact us. We're here to assist you in discovering the joy of eco-friendly and exciting electric rides. Let's make your ride with Revolt a breeze!"
        />
        <meta
          property="og:title"
          content="Contact Us for Electric Bikes - Revolt Motors
          "
        />
        <meta
          property="og:description"
          content="Need help with electric bikes? Contact us. We're here to assist you in discovering the joy of eco-friendly and exciting electric rides. Let's make your ride with Revolt a breeze!
          "
        />{" "}
        <link rel="canonical" href="https://www.revoltmotors.com/contact-us" />
      </MetaTags>
      <section className="image-abts">
        <img src="/images/Contact_Us.png" />
      </section>

      <section className="contactus padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form
                id="contactusnew"
                className="form-default"
                onSubmit={submitHandler}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group name-group">
                      <img
                        src="/images/users.png"
                        className="iconleft"
                        alt=""
                      />
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
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group name-group">
                      <img
                        src="/images/email-icon.png"
                        className="iconleft"
                        alt=""
                      />
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
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/phone-icon.png"
                        className="iconleft emails"
                        alt=""
                      />
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
                        pattern="d{10}"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 10))
                        }
                      ></input>
                    </div>
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

                  {/* <div className='col-lg-4'>
              <div className="form-group email-group">
                  <img src="/images/City.png" className="iconleft emails" alt="" />
                  <select id="state" className="form-control" placeholder="State" value={selectedState} onChange={(e)=>
                      setSelectedState(e.target.value)}
                      required>
                        <option value="">Choose State</option>
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

        <div className='col-lg-4'>
              <div className="form-group email-group">
                  <img src="/images/City.png" className="iconleft emails" alt="" />
                  <select id="city" className="form-control" placeholder="City" value={selectedCity} onChange={(e)=>
                      setSelectedCity(e.target.value)}
                      >
                      <option value="">Choose City</option>
                      {availableCity.map((e, key) => {
                          return (
                              <option value={e.city_id} key={key}>
                                  {e.city_name}
                              </option>
                          );
                      })}
                  </select>
              </div>
        </div> */}

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/Interested.png"
                        className="iconleft emails"
                        alt=""
                      />
                      <select
                        className="form-control"
                        id="interestedin"
                        name="interestedin"
                        onChange={(e) => setInterestedin(e.target.value)}
                        required
                      >
                        <option value="">I'm Interested In</option>
                        <option value="The Motorcycle">The Motorcycle</option>
                        <option value="Getting in touch with PR Team">
                          Getting in touch with PR Team
                        </option>
                        <option value="Apply Dealership">
                          Apply Dealership
                        </option>
                        <option value="Complaint">Complaint</option>
                        <option value="Career">Career</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group email-group">
                      <img
                        src="/images/email-icon.png"
                        className="iconleft emails ch-place"
                        alt=""
                      />
                      <textarea
                        type="textarea"
                        placeholder="Message"
                        className="form-control inputfield"
                        id="textarea"
                        required
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="contactus-message">
                      {!otpbtn ? (
                        <>
                          <div className="otp_wraper">
                            <div className="form-group name-gro/up otp_field">
                              <input
                                type="number"
                                maxlength="6"
                                id="otp"
                                className="form-control inputfield"
                                placeholder="OTP"
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                pattern="d{10}"
                                onInput={(e) =>
                                  (e.target.value = e.target.value.slice(0, 6))
                                }
                              ></input>
                            </div>
                            <span id="message"></span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {/* pincode */}
                  <div id="statecity" className="my-2  font-weight-bold">
                    {pinstate}
                  </div>
                  {/* pincode */}
                  <div className="col-lg-12">
                    <div className="form-group contact-whats">
                      <p>
                        Get <img alt="" className="wp" src="/images/wp.png" />{" "}
                        WhatsApp Reminders &amp; updates on everything that's
                        relevant.
                      </p>
                      <div>
                        <label htmlFor="check" className="contactus-label">
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

                  <div className="col-lg-12">
                    <div className="submit-btns form-group">
                      {otpbtn ? (
                        <input
                          type="button"
                          className="next action-button- sl-btn sb-btn"
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
                      {submitbtn && (
                        <button
                          type="submit"
                          disabled={otpbtn}
                          id="btnNew"
                          className="btnNew"
                        >
                          SEND MESSAGE
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="contactus-note">
                    <p>
                      *By clicking “Send Message”, I give my consent to Revolt
                      Intellicorp Private Limited and its authorised service
                      providers to hold my personal data and communicate with me
                      by e-mail, WhatsApp, SMS or phone call for Notify
                      purposes.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-details padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3">
              <div className="info-contact">
                <img src="/images/c-1.png" alt="" />
                <h3>Revolt House</h3>
                <p>
                  5th Floor, Tower-B, Worldmark-1, Aerocity, New Delhi-110037
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-contact">
                <img src="/images/c-2.png" alt="" />
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:contact@revoltmotors.com">
                    contact@revoltmotors.com
                  </a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-contact">
                <img src="/images/c-3.png" alt="" />
                <h3>Helpline</h3>
                <p>
                  <a href="tel:+919873050505">+91-98 7305 0505</a> <br />{" "}
                  (Mon-Sun, 10 AM-7 PM)
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-contact">
                <img src="/images/c-4.png" alt="Whatsapp Icon" />
                <h3>WhatsApp Us </h3>
                <p>
                  <a href="tel:+919873050505">+91-98 7305 0505</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* map section starts  */}

      <RevoltMap></RevoltMap>

      {/* map section ends  */}
    </>
  );
}

export default ContactUs;
