import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  USER_BOOKING_SUCCESS,
  USER_BOOK_RESET,
} from "../constants/userConstants";
import { userBookingReducer } from "../reducers/userReducers";
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import Slider from "react-slick";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import { axios as Axios } from "../utilities/axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import $ from "jquery";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

import {
  detailsProduct,
  detailsProductAll,
  listStateCityHub,
  listStateCityHub_SC,
  listStateCityHub_upgrade,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Captcha from "../components/Captcha";
import { getCompanyNames } from "../actions/vendorActions";
import SelectSearch from "../components/SelectSearch";

const colors = [
  {
    name: "Blue",
    code: "#0080FB",
    imagesPath: ["/images/blue_revolt(2).png", "/images/blue_revolt(2).png"],
  },
  { name: "Red", code: "#F43737", imagesPath: ["/images/product_red.png"] },
  {
    name: "Cosmic Black",
    code: "#262525",
    imagesPath: ["/images/product_black.png"],
  },
  {
    name: "Stealth Black",
    code: "#363639",
    imagesPath: ["/images/stealth-black.png"],
  },
  { name: "White", code: "#D1D3D4", imagesPath: ["/images/product_grey.png"] },
];

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function VendorBooking(props) {
  const [file, setFile] = useState(false);
  const location = useLocation();
  const captchaRef = useRef({ result: "", entry: "" });
  const [model, setModel] = useState("RV400BRZ");
  const dispatch = useDispatch();
  const [submitbtn, setsubmitbtn] = useState(true);
  const [existingEmail, setExistingEmail] = useState(false);
  // const [loader, setLoader] = useState(false)
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  console.log("hublist is", hubList);
  //
  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const bookinginfo = useSelector((state) => state.bookinginfo);
  const { company } = useSelector((state) => state.vendor);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employeeId, setEmployeeId] = useState("");
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

  const [vendorEmail, setVendorEmail] = useState("");
  //const usertoken = userInfo_myArr?.token ? userInfo_myArr?.token : '';
  //const isDealer = userInfo_myArr?.isSeller ? 'Y' : 'N';
  const [pincode, setPincode] = useState(
    isDealer == "Y" ? userInfo_myArr?.pincode : "",
  );
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

  console.log("Available Hub", availableHub);

  const avaialblepin = availableHub?.filter((c) => c.hub_id == selectedHub);

  ///////////////////////////////////////////////////////
  const productDetails = useSelector((state) => state.allProducts);

  const { loading, product } = productDetails;
  const [vendorLoading, setVendorLoading] = useState(false);

  // if(loading){
  //   if(loader===true){
  //     setLoader(loading)
  //   }
  // }

  let [color, setColor] = useState({});

  ////////////////////////////////////////////
  useEffect(() => {
    if (
      !loading &&
      product &&
      (!localStorage.getItem("state_city_hub") ||
        !localStorage.getItem("state_city_hub_upgrade") ||
        !localStorage.getItem("state_city_hub_SC"))
    ) {
      localStorage.getItem("state_city_hub") ?? dispatch(listStateCityHub());
      localStorage.getItem("state_city_hub_upgrade") ??
        dispatch(listStateCityHub_upgrade());
      localStorage.getItem("state_city_hub_SC") ??
        dispatch(listStateCityHub_SC());
    }
  }, [product]);

  useEffect(() => {
    setPincode(avaialblepin?.[0]?.dealer_pincode);
    //  console.log(avaialblepin[0]?.dealer_pincode);
  }, [avaialblepin]);

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
    setColor(
      product?.[model]?.length
        ? { ...product?.[model][product?.[model].length - 1] }
        : {},
    );
  }, [product]);

  useEffect(() => {
    if (color?.model_id) {
      dispatch(detailsProduct(color?.model_id));
    }
  }, [color]);

  useEffect(() => {
    console.log("Window is", window.location.href.split("=")[1]);
    if (window.location.href.split("?")?.[1]?.includes("model=RV400BRZ")) {
      setModel("RV400BRZ");
    }
    document.getElementById("selectedCompany").style.display = "none";
  }, []);

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Booking screen",
      "Page Url": window.location.href,
    });

    // let RV400ProductId = "RM0400RRCP1CWBLK";
    let RV400ProductId = "";
    // setLoader(true)
    dispatch(detailsProductAll());
    dispatch(getCompanyNames());
    if (location.state?.model === "RV400BRZ") {
      setModel("RV400BRZ");
    }
    document.getElementById("uploadedFile").style.display = "none";
  }, []);

  useEffect(() => {
    if (file) {
      let fileCheck;
      let text = "";
      fileCheck = file.size / 1024 < 2048 ? true : false;
      text = !fileCheck ? "File size should be below 2 Mb" : "";
      if (fileCheck) {
        fileCheck =
          file.type.includes("jpg") ||
          file.type.includes("pdf") ||
          file.type.includes("png") ||
          file.type.includes("jpeg");
        text = "Only jpg, jpeg, png, pdf format are accepted";
      }

      if (!fileCheck) {
        document.getElementById("uploadedFile").innerText = text;
        document.getElementById("uploadedFile").style.display = "block";
        document.getElementById("uploadedFile").style.position = "absolute";
      } else {
        document.getElementById("uploadedFile").innerText = "";
        document.getElementById("uploadedFile").style.display = "none";
      }
    }
    document.getElementById("uploadedFile").style.margin = "0px !important";
  }, [file]);

  async function submitbooking() {
    //////////////////
    sessionStorage.setItem("selectedModel", model);
    sessionStorage.setItem("selectedProductId", color.model_id);
    sessionStorage.setItem("colorInfo", JSON.stringify(color));

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

    const { data } = await Axios.post(URL, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
      },
    });

    localStorage.setItem(
      "bookingPayload",
      JSON.stringify({
        user_id: userInfo_myArr?.id,
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
        model,
      }),
    );

    // console.log("data is",data?.data?.id, data?.data?.errors?.[0]?.additional_info?.user_id)
    console.log("data is xyzzzzzzzzzzzzz", data);
    if (!data.status) {
      setExistingEmail(data.data.message);
    } else {
      //  setsubmitbtn(false);
      localStorage.setItem(
        "contact_id",
        data?.data?.id ? data?.data?.id : null,
      );
      localStorage.setItem(
        "org_contact_id",
        "" + data.data.org_contact_id ? data.data.org_contact_id : null,
      );
      if (SlotAvilable?.city_stock == "ok") {
        //  setLoader(true)

        formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("state", selectedState);
        formData.append("city", selectedCity);
        formData.append("area", selectedHub);
        formData.append(
          "pincode",
          availableHub.filter((value, index) => value.hub_id == selectedHub)[0]
            .dealer_pincode,
        );
        formData.append("url", "");
        formData.append("isSeller", isDealer == "Y" ? 1 : 0);
        formData.append("employee_code", employeeId);
        formData.append(
          "vendor_email",
          company?.vendorDetails.filter((vendor) => {
            if (vendor.id == selectedCompany) {
              return true;
            } else {
              return false;
            }
          })[0]?.poc_email_id,
        );
        formData.append("product_type", model);
        formData.append("files", file, "Lota.png");
        formData.append("company_id", selectedCompany);

        let URI = `${URL_API}/api/v1/customer/vendor_bookings`;
        let response = await Axios.post(URI, formData, {
          "Content-Type": "multipart/form-data",
        });
        sessionStorage.setItem(
          "vendorBookingId",
          response.data.data.vendorBookingId,
        );
        localStorage.setItem(
          "bookingLeadDetails",
          JSON.stringify(response.data.data.lsq_booking_lead),
        );
        console.log("Booking info ", response.data.data.lsq_booking_lead);
        let outputj = {
          id: userInfo_myArr?.id,
          token: usertoken,
          isAdmin: isAdmin,
          isSeller: isDealer,
          name: name,
          email: email,
          mobile: mobile,
          state: selectedState,
          city: selectedCity,
          area: selectedHub,
          pincode: availableHub.filter(
            (value, index) => value.hub_id == selectedHub,
          )[0].dealer_pincode,
          state_name: "",
          city_name: "",
          area_name: "",
          incentive: "",
          region: "",
          status: "1",
          coupon: "",
          type: "vendor",
        };
        console.log("oooooooooooo", outputj);
        localStorage.setItem("bookinginfo", JSON.stringify(outputj));
        localStorage.setItem("shippingAddress", JSON.stringify(outputj));
        await dispatch({ type: USER_BOOKING_SUCCESS, payload: outputj });
        console.log("response is", response);

        // const resp = await dispatch(
        //   booking(
        //     userInfo_myArr?.id,
        //     name,
        //     mobile,
        //     email,
        //     selectedState,
        //     selectedCity,
        //     selectedHub,
        //     pincode,
        //     usertoken,
        //     isDealer,
        //     isAdmin,
        //     search,
        //     model
        //   )
        // );
        console.log("colors is", color);
        //  console.log(error);
        if (error) {
          //dispatch({ type: USER_BOOK_RESET });
          // alert('Your are having account with Revolt, Please SignIn!')
          navigate(`/product/${color.model_id}` + search, {
            state: {
              model,
              color,
            },
          });
        } else {
          //if(bookInfo) {
          localStorage.setItem("colorInfo", JSON.stringify(color));
          navigate(`/product/${color.model_id}` + search, {
            state: {
              model,
              color,
            },
          });
          //}
        }
      } else {
      }
    }

    ////////////////
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    let error = false;
    if (!selectedCompany) {
      error = true;
      document.getElementById("selectedCompany").innerText =
        "Please search your Company Name";
      document.getElementById("selectedCompany").style.display = "block";
      document.getElementById("selectedCompany").style.padding = "0px";
      document.getElementById("selectedCompany").style.margin = "0px";
      // document.getElementById("selectedCompany").style.position = "absolute"
    }
    if (!file) {
      error = true;
      document.getElementById("uploadedFile").innerText =
        "Please upload your id proof";
      document.getElementById("uploadedFile").style.display = "block";
      document.getElementById("uploadedFile").style.position = "absolute";
    }
    if (parseInt(captchaRef.current.entry) !== captchaRef.current.result) {
      error = true;
      var message = document.getElementById("captchaMessage");
      var goodColor = "#0C6";
      var badColor = "#ed1c24";
      message.innerHTML =
        "You have entered the wrong answer, please try again!";
    }
    if (!error) {
      console.log("captcha is", captchaRef.current);
      // setsubmitbtn(false);
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
        setVendorLoading(true);
        message.innerHTML = "";
        submitbooking();

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
      } catch (error) {
        setVendorLoading(false);
      }

      // otp verify end

      // navigate(`/product/RM0400RRCP1CWBLK`);
      //navigate(`/cart/${productId}?qty=${qty}`);
      //zconsole.log(error)
    }
  };

  const checkBookingSlot = async (e) => {
    setSelectedHub(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`,
      );
      //   console.log(data.data);
      setSlotAvilable(data.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    if (isDealer == "Y" || selectedHub) {
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

    sessionStorage.setItem("isVendor", 1);
    sessionStorage.setItem("oldBooking", false);
    // alert("sam");
  }, []);

  const handleStateChange = (e) => {
    //  console.log("change", e.target.value);
    let bookingCity = stateList.filter((state) => {
      if (state.state_id == e.target.value) {
        return true;
      } else {
        return false;
      }
    })[0]?.state_name;
    localStorage.setItem("bookingCity", bookingCity);
    setSelectedState(e.target.value);
  };

  console.log("product", product);
  // const productArr = product?.product ? [...product?.product].reverse() : [];
  const productArr = product?.[model] ? [...product?.[model]].reverse() : [];
  console.log("array", productArr);

  console.log("color is ", color);
  console.log("Khjsajdjasdsa......", company?.vendorDetails);
  return (
    <div>
      {loading || vendorLoading ? <Loader /> : null}
      <MetaTags id="home">
        <title>
          Electric Bike Booking Starts, Buy EV Bikes Online at Revolt Motors
        </title>
        <meta
          name="description"
          content="India's 1st smart electric bike online booking starts at Revolt Motors. Get a step closer to your stylish electronic motorcycle by selecting your e bike model.
"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          property="og:title"
          content="Book now India's 1st AI-enabled motorcycle"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub."
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>

      {/*  */}
      <section className="light-grey bookNow newBookNow">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-xs-12 col-sm-8 ">
              <div
                className={`placeholder-text ${
                  model === "RV400BRZ" ? "brz" : ""
                }`}
              >
                {model}
              </div>
              <div className="row ">
                <div className="col-12 col-sm-9 order-sm-2 order-md-2">
                  <div className="carouselView book-bike">
                    {Object.keys(color).length ? (
                      <img
                        loading="lazy"
                        src={"/images/" + color.image}
                        className="rounded mx-auto d-block"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-3 order-sm-1 order-md-1">
                  {" "}
                  <div className="bike-card-box">
                    <div
                      className="bike-model-card"
                      style={{ backgroundColor: "transparent" }}
                    >
                      {/* <div className="bike-model-header">RV400</div>
                          <hr /> */}
                      <div
                        className="bike-model-body"
                        style={{
                          backgroundColor: "transparent",
                          backgroundColor: "transparent",
                          border: "1px solid #707070",
                          borderRadius: "10px",
                        }}
                      >
                        <div>
                          <img
                            alt="Revolt Battery
"
                            src="/images/calenderhours.svg"
                          />
                          <p>0-100%</p>
                          <h5>IN 4.5 HOURS*</h5>
                        </div>
                        <br />
                        <div>
                          <img
                            alt="Electric bike speed"
                            src="/images/speed.svg"
                          />
                          <p>
                            85 KM/H{""}
                            <span data-title="Ideal Driving Conditions">*</span>
                          </p>
                          <h5>TOP SPEED</h5>
                        </div>
                        <br />
                        <div>
                          <img
                            alt="Motorcycle Battery Lifespan"
                            src="/images/battery.svg"
                          />

                          <p>
                            150 KMS{""}
                            <span data-title="Ideal Driving Conditions">*</span>
                          </p>
                          <h5>Per Charge</h5>
                        </div>
                        <br />
                        {model == "RV400" ? (
                          <div>
                            <img
                              alt="Revolt Mobile App
                              "
                              style={{ maxWidth: "18px" }}
                              src="/images/phone.svg"
                            />
                            <p style={{ textTransform: "capitalize" }}>
                              mobile app
                            </p>
                            <h5>
                              WITH SMART
                              <br /> FEATURES
                            </h5>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4  p-3 formView">
              <form id="msformNew" className="form" onSubmit={submitHandler}>
                <div className="form-card">
                  <div className="rvModel-choose">
                    <h4>Choose your model</h4>
                    <div className="rvModel-chooseBlock">
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
                              : {},
                          );
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
                              : {},
                          );
                        }}
                      >
                        RV400
                      </div>
                    </div>
                  </div>
                  {Object.keys(color).length ? (
                    <h5>
                      <strong>Color : </strong> {color?.color}
                    </h5>
                  ) : (
                    ""
                  )}
                  <div className="bikeColorList">
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
                                }}
                              ></span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}

                    <div>
                      <h2>
                        Hey! Great to see you in the future. Let's help you book
                        your Revolt.
                      </h2>
                      <p>
                        Please enter your personal details below for purchase
                        and registration of your Revolt Motorcycle.
                      </p>
                    </div>
                  </div>

                  <div className="login-space-no">
                    <div className="row">
                      <div className="form-group col-md-12 name-group">
                        <SelectSearch
                          list={company?.vendorDetails}
                          setItem={setSelectedCompany}
                          item={selectedCompany}
                        />
                        <div
                          className="emi_tooltip"
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "12px",
                          }}
                        >
                          {" "}
                          <img src="/images/info.svg" alt="Info Icon" />
                          <span className="emi_tooltip_text vendorBooking">
                            Please select your currrent organization name as it
                            will go to your employment verification process.
                          </span>
                        </div>
                        <p id="selectedCompany" style={{ color: "red" }}></p>
                      </div>
                      <div className="form-group col-md-12 name-group">
                        <div className="palceholder">
                          <label htmlFor="email">Employee Id</label>
                          <span className="star">*</span>
                        </div>
                        <input
                          type="text"
                          id="employeeId"
                          className="form-control inputfield"
                          placeholder="Employee Id"
                          maxlength="50"
                          name="name"
                          required
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                        ></input>
                      </div>
                      {/* <div className="form-group col-md-12 email-group">
                        <div className="palceholder">
                          <label htmlFor="email">Vendor Email </label>
                          <span className="star">*</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          className="form-control inputfield"
                          placeholder="Vendor Email"
                          maxlength="50"
                          name="email"
                          required
                          value={vendorEmail}
                          onChange={(e) => setVendorEmail(e.target.value)}
                        ></input>
                      </div> */}
                      <div className="form-group col-md-12 name-group">
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
                          maxlength="40"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /([^a-z ]+)/gi,
                              "",
                            ))
                          }
                        ></input>
                      </div>
                      <div className="form-group col-md-12 name-group">
                        <div className="palceholder">
                          <label htmlFor="Phone">Mobile </label>
                          <span className="star">*</span>
                        </div>

                        <input
                          type="number"
                          id="mobile"
                          name="mobile"
                          className="form-control inputfield"
                          placeholder="Mobile "
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

                      <div className="form-group col-md-12 email-group">
                        <div className="palceholder">
                          <label htmlFor="email">Email </label>
                          <span className="star">*</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          className="form-control inputfield"
                          placeholder="Email"
                          maxlength="50"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="form-group col-md-6">
                        <select
                          id="state"
                          className="form-control"
                          placeholder="Choose State"
                          required
                          value={selectedState}
                          name="state"
                          onChange={handleStateChange}
                          disabled={isDealer == "Y"}
                        >
                          <option>Choose State</option>
                          {availableStateList?.map((value, key) => {
                            return (
                              <option
                                value={value.state_id}
                                name={value.state_name}
                                key={key}
                              >
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
                          placeholder="Choose City"
                          value={selectedCity}
                          name="city"
                          onChange={(e) => setSelectedCity(e.target.value)}
                          required
                          disabled={isDealer == "Y"}
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
                          name="area"
                          required
                          value={selectedHub}
                          onChange={(e) => checkBookingSlot(e.target.value)}
                          disabled={isDealer == "Y"}
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
                        <span id="message" className="mt-1 text-left pl-2">
                          {SlotAvilable?.city_stock != "ok"
                            ? SlotAvilable?.city_stock
                            : ""}

                          {existingEmail ? existingEmail : null}
                        </span>
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          style={{
                            margintTop: "10px",
                            fontSize: "13px",
                            color: "rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          Upload Employee ID Card
                        </label>{" "}
                        <input
                          type={"file"}
                          accept=".jpg, .png, .jpeg , .pdf"
                          onChange={(e) => {
                            // console.log("file is",e,e.target.files[0])
                            setFile(e.target.files[0]);
                          }}
                        />
                        <p id="uploadedFile" style={{ color: "red" }}></p>
                      </div>
                      {/* rand1={rand1} rand2={rand2} */}
                      <div className="form-group col-md-12 checkboxihave">
                        {" "}
                        <label>Please verify you are a human</label>{" "}
                        <Captcha captchaRef={captchaRef} />
                        <span
                          id="captchaMessage"
                          style={{ color: "red" }}
                        ></span>
                      </div>
                      <div className="form-group col-md-12 checkboxihave">
                        <label>
                          {" "}
                          <input type="checkbox" id="checkox" required />I agree
                          to the{" "}
                          <a target="_blank" href="/terms">
                            Terms & Conditions
                          </a>{" "}
                          for this booking.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 testride_submit_wrapper">
                  <span id="otpmessage"></span>
                  <div className="otp_btn_wrapper"></div>

                  {submitbtn && (
                    <>
                      <input
                        type="submit"
                        disabled={
                          mobile.length != 10 || SlotAvilable.city_stock != "ok"
                        }
                        name="next"
                        className="next action-button newNextBtn"
                        value="Next"
                      />
                      <p> </p>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center p-0 ">
              <div className="form-bg form-default">

                <form id="msformNew" className="form" onSubmit={submitHandler}>
                  <ul id="progressbar">
                    <li className="active" id="account"><strong>Your Details </strong></li>
                    <li id="personal"><strong> Choose Model & MRP</strong></li>
                    <li id="payment"><strong> Booking Payment </strong></li>
                    <li id="confirm"><strong> Start My Revolt Plan </strong></li>
                  </ul>

                  <fieldset>
                    <div className="form-card">
                      <div className="row">
                        <div className="col-12">
                          {error && <MessageBox variant="danger">{error}</MessageBox>}

                          <div className='text-center'>
                            <h2 className="fs-title text-center"><b>Hey! Great to see you in the future.
                              Let's help you book your Revolt.</b></h2>
                            <p>Please enter your personal details below. Make sure you enter the information with which you want to purchase & register your Revolt Motorcycle. All payment related information and other important updates will be shared on those contact details only. Booking your Revolt involves a nominal cost — an amount which is completely refundable upon cancellation.</p>
                          </div>
                        </div>
                      </div>

                      <div className="login-space-no">
                        <div className="row">
                          <div className="form-group col-md-4 name-group">

                            <div className="palceholder">

                              <label htmlFor="name">User Name / Mobile Number</label>
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
                              onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '')}
                            ></input>
                          </div>
                          <div className="form-group col-md-4 name-group">
                           
                            <div className="palceholder"  >

                              <label htmlFor="Phone">Mobile </label>
                              <span className="star">*</span>
                            </div>

                            <input
                              type="number"
                              id="mobile"
                              name="mobile"
                              className="form-control inputfield"
                              placeholder="Mobile"
                              value={mobile}
                              pattern="d{10}"
                              maxLength={10}
                              required
                              onChange={(e) => setMobile(e.target.value)}
                              onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                            ></input>
                          </div>

                          <div className="form-group col-md-4 email-group">
                            <div className="palceholder" >

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

                            <select id="state"
                              className="form-control"
                              placeholder="Select State"
                              required
                              value={selectedState}
                              name="state"
                              onChange={handleStateChange}
                              disabled={isDealer == 'Y'}
                            >
                              <option>Choose State</option>
                              {availableStateList?.map((value, key) => {
                                return (
                                  <option value={value.state_id} name={value.state_name} key={key}>
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
                              disabled={isDealer == 'Y'}
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
                              value={selectedHub}
                              onChange={(e) => checkBookingSlot(e.target.value)}
                              disabled={isDealer == 'Y'}
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
                          </div>
                          <div className="form-group col-md-12 checkboxihave">
                            <label> <input type="checkbox" id='checkox' required />
                              I have read and I agree to the <a target="_blank" href="/terms">Terms & Conditions</a> for this booking.</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="testride_submit_wrapper">
                      <span id="otpmessage"></span>
                      <div className="otp_btn_wrapper">


                      </div>
                      {submitbtn &&
                        <>
                          <input type="submit"
                            disabled={(mobile.length != 10) || SlotAvilable.city_stock != "ok"}
                            name="next" className="next action-button" value="Next" />
                          <p> </p>
                        </>}



                    </div>
                

                  </fieldset>

                </form>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
