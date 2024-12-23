import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
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
import axios from "../../node_modules/axios/index";
import { flushSync } from "react-dom";

function ContactUs({ blocker }) {
  const { search } = useLocation();
  const [complaintType, setComplaintType] = useState("");
  const [subject, setSubject] = useState("");
  const [model, setModel] = useState("");
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  //

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

  const [comment, setComment] = useState("");
  const [interestedin, setInterestedin] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);

  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr.state : ""
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr.city : ""
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : ""
  );

  const availableCity = cityList?.filter((c) => c.state_id == selectedState);
  const availableHub = hubList?.filter((c) => c.city_id == selectedCity);

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);
  const [mobileverify, setMobileverify] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    interestedin,
    whatsapp,
    comment
  ) {
    //insert test ride start
    const { data } = await Axios.post(`${URL_API}/api/v1/customer/contact-us`, {
      name,
      mobile,
      email,
      state,
      city,
      interestedin,
      whatsapp,
      comment,
      search,
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

    if (interestedin === "Complaint") {
      let URL = URL_API + "/api/v1/common/freshdesk_records/tickets";
      let formData = {
        ticket: {
          email: email,
          description: comment,
          subject: subject,
          custom_fields: {
            cf_complaint_type: complaintType,
            cf_bike_model: "RV400",
            cf_customer_name: name,
          },
          status: 2,
          priority: 1,
          source: 2,
        },
      };

      axios.post(URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
        },
      });
      //  insert test ride end
    }
    //  else{
    //   let URL = URL_API+"/api/v1/common/freshdesk_records/contacts"
    //   let formData = {
    //     "name": name,
    //     "email": email,
    //     "mobile": mobile,
    //     "address": "",
    //     "custom_fields": {
    //         "customer_state": stateList.filter((value,index)=>value.state_id == state)[0].state_name,
    //         "customer_city": availableCity.filter((value,index)=>value.city_id == city)[0].city_name,
    //         "customer_pincode": "",
    //         "gender": "",
    //         "date_of_birth": null,
    //         "date_of_anniversary": null,
    //        "service_due_date": null
    //     }
    // }
    // axios.post(URL,formData, {headers:{"Content-Type":"application/json", Authorization:"Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA=="}})
    //  }
  }

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    console.log("Executing.....................", otpbtn);
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
        submitcontactus(
          name,
          mobile,
          email,
          selectedState,
          selectedCity,
          interestedin,
          whatsapp,
          comment
        );
      } else {
        message.style.color = badColor;
        message.innerHTML = "Please Enter Valid OTP Number.";
        flushSync(() => setIsSubmitting(false));
      }
    } catch (error) {
      flushSync(() => setIsSubmitting(false));
    }

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
      if (!blocker) {
        const { data } = await Axios.post(`${URL_API}/api/v1/auth/sendotp`, {
          mobile,
          email,
        });
        setOtpbtn(false);
      }

      // message.innerHTML = "";
    }
  }

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
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
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
                onSubmit={(e) => {
                  e.preventDefault();
                  flushSync(() => setIsSubmitting(true));
                  console.log(
                    "Button is",
                    document.querySelector("#btnNew").getAttribute("disabled")
                  );
                  submitHandler(e);
                }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group name-group">
                      <img
                        src="/images/users.png"
                        className="iconleft"
                        alt="User Icon"
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
                            ""
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
                        alt="Email Icon"
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
                    <div></div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/phone-icon.png"
                        className="iconleft emails"
                        alt="Phone Icon"
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

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/City.png"
                        className="iconleft emails"
                        alt="City Icon"
                      />
                      <select
                        id="state"
                        className="form-control"
                        placeholder="State"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        required
                      >
                        <option value="">Choose State</option>
                        {stateList?.map((value, key) => {
                          return (
                            <option value={value.state_id} key={key}>
                              {value.state_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/City.png"
                        className="iconleft emails"
                        alt="City Icon"
                      />
                      <select
                        id="city"
                        className="form-control"
                        placeholder="City"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value="">Choose City</option>
                        {availableCity?.map((e, key) => {
                          return (
                            <option value={e.city_id} key={key}>
                              {e.city_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group email-group">
                      <img
                        src="/images/Interested.png"
                        className="iconleft emails"
                        alt="Intrested Icon"
                      />
                      <select
                        className="form-control"
                        id="interestedin"
                        name="interestedin"
                        onChange={(e) => setInterestedin(e.target.value)}
                        required
                      >
                        <option value="">I'm Interested In</option>
                        {/* <option value="The Motorcycle">The Motorcycle</option> */}
                        <option value="Getting in touch with PR Team">
                          Getting in touch with PR Team
                        </option>
                        <option value="Apply Dealership">
                          Apply Dealership
                        </option>
                        {/* <option value="Complaint">Complaint</option> */}
                        <option value="Career">Career</option>
                      </select>
                    </div>
                  </div>
                  {interestedin === "Complaint" ? (
                    <>
                      <div className="col-lg-4">
                        <div className="form-group email-group">
                          <img
                            src="/images/Interested.png"
                            className="iconleft emails"
                            alt="Intrested Icon"
                          />
                          <select
                            className="form-control"
                            id="interestedin"
                            name="interestedin"
                            onChange={(e) => setComplaintType(e.target.value)}
                            required
                          >
                            <option value="">Complaint Type</option>
                            <option value="Test Ride">Test Ride</option>
                            <option value="Product Availability">
                              Product Availability
                            </option>
                            <option value="Refund Status">Refund Status</option>
                            <option value="Spare Part Availability">
                              Spare Part Availability
                            </option>
                            <option value="Acciedental & Insurance">
                              Acciedental & Insurance
                            </option>
                            <option value="Website/Application">
                              Website/Application
                            </option>
                            <option value="Service Quality">
                              Service Quality
                            </option>
                            <option value="Others">Others</option>
                            {/* <option value="Complaint">Complaint</option>
                  <option value="Career">Career</option> */}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group name-group">
                          <img
                            src="/images/users.png"
                            className="iconleft"
                            alt="User Icon"
                          />
                          <input
                            type="text"
                            className="form-control inputfield"
                            id="name"
                            placeholder="Subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^a-z 0-9]+)/gi,
                                ""
                              ))
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group email-group">
                          <img
                            src="/images/Interested.png"
                            className="iconleft emails"
                            alt="Interested Icon"
                          />
                          <select
                            className="form-control"
                            id="interestedin"
                            name="interestedin"
                            onChange={(e) => setModel(e.target.value)}
                            required
                          >
                            <option value="">Model</option>
                            <option value="RV400">RV400</option>
                            {/* <option value="Complaint">Complaint</option>
                  <option value="Career">Career</option> */}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="col-lg-12">
                    <div className="form-group email-group">
                      <img
                        src="/images/email-icon.png"
                        className="iconleft emails ch-place"
                        alt="Email Icon"
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

                  <div className="col-lg-12">
                    <div className="form-group contact-whats">
                      <p>
                        Get{" "}
                        <img
                          alt="Whatsapp Icon"
                          className="wp"
                          src="/images/wp.png"
                        />{" "}
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

                      <button
                        type="submit"
                        disabled={isSubmitting || otpbtn}
                        id="btnNew"
                        className="btnNew"
                      >
                        SEND MESSAGE
                      </button>
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
                <img src="/images/c-1.png" alt="Location Icon" />
                <h3>Revolt House</h3>
                <p>No.4, Sector 8 Rd, Imt Manesar, Gurugram, Haryana 122051</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-contact">
                <img src="/images/c-2.png" alt="Message Icon" />
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
                <img src="/images/c-3.png" alt="Call Us Icon" />
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
                <h3>WhatsApp Us</h3>
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
