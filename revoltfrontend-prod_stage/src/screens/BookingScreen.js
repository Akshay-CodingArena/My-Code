import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_BOOK_RESET } from "../constants/userConstants";
import { userBookingReducer } from "../reducers/userReducers";
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import { axios as Axios } from "../utilities/axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import $ from "jquery";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";
import { Helmet } from "react-helmet";

import {
  detailsProduct,
  detailsProductAll,
  listStateCityHub,
  listStateCityHub_SC,
  listStateCityHub_upgrade,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Captcha from "../components/Captcha";

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

const RV400FestiveOffer =
  "Get flat ₹10,000 off* + Additional benefits worth up to ₹23,200* on RV400";
const RV400BRZFestiveOffer =
  "Get flat ₹15,000 off* + Additional benefits worth up to ₹25,700* on RV400 BRZ";

export default function BookingScreen(props) {
  const location = useLocation();
  const captchaRef = useRef({ result: "", entry: "" });
  const [model, setModel] = useState("RV1");
  const dispatch = useDispatch();
  const [comments, setComments] = useState("");
  ////////////////////////BRZ//////////////////////
  const [festiveOfferText, setFestiveOfferText] =
    useState(RV400BRZFestiveOffer);

  const cityStateList = useSelector((state) => state.state_city_hub_upgrade);
  const productDetail = useSelector((state) => state.productDetails);
  // console.log("Detailsssssssssssssss", productDetail)
  // console.log(cityStateList)

  const [submitbtn, setsubmitbtn] = useState(true);
  const [existingEmail, setExistingEmail] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  // const [loader, setLoader] = useState(false)
  //
  const [socialDropdownValues, setSocialDropdownValues] = useState([]);
  const [source, setSource] = useState("");

  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = statecityhub
    ? JSON.parse(statecityhub)
    : cityStateList?.state_city_hub_upgrade;
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;
  //
  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const bookinginfo = useSelector((state) => state.bookinginfo);
  // const {company} = useSelector((state)=>state.vendor)
  const { bookInfo, error } = bookinginfo;

  const navigate = useNavigate();

  const [usertoken, setUsertoken] = useState(
    userInfo_myArr?.token ? userInfo_myArr?.token : ""
  );
  const [isDealer, setIsDealer] = useState(
    userInfo_myArr?.isSeller ? "Y" : "N"
  );
  const [isAdmin, setIsAdmin] = useState(userInfo_myArr?.isAdmin ? "Y" : "N");

  const [name, setName] = useState(isDealer == "N" ? userInfo_myArr?.name : "");
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr?.mobile : ""
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr?.email : ""
  );

  //const usertoken = userInfo_myArr?.token ? userInfo_myArr?.token : '';
  //const isDealer = userInfo_myArr?.isSeller ? 'Y' : 'N';
  const [pincode, setPincode] = useState(
    isDealer == "Y" ? userInfo_myArr?.pincode : ""
  );
  const [selectedState, setSelectedState] = React.useState(
    userInfo_myArr?.state ? userInfo_myArr?.state : ""
  );
  const [selectedCity, setSelectedCity] = React.useState(
    userInfo_myArr?.city ? userInfo_myArr?.city : ""
  );
  const [selectedHub, setSelectedHub] = React.useState(
    userInfo_myArr?.area ? userInfo_myArr.area : ""
  );

  const availableStateList = stateList?.filter((c) => c.status == 1);
  //console.log(availableStateList);
  const availableCity = cityList?.filter(
    (c) => c.state_id == selectedState && c.status == 1
  );
  const availableHub = hubList?.filter(
    (c) => c.city_id == selectedCity && c.status == 1
  );

  const avaialblepin = availableHub?.filter((c) => c.hub_id == selectedHub);

  ///////////////////////////////////////////////////////
  const productDetails = useSelector((state) => state.allProducts);

  const { loading, product, errors } = productDetails;

  // if(loading){
  //   if(loader===true){
  //     setLoader(loading)
  //   }
  // }

  let [color, setColor] = useState({});

  ////////////////////////////////////////////

  useEffect(() => {
    if (selectedHub) {
      if (selectedState == 1) {
        localStorage.setItem("bookingCity", "Delhi");
      }
      checkBookingSlot(selectedHub);
    }
  }, []);

  useEffect(async () => {
    const { data } = await Axios.get(`${URL_API}/api/v1/customer/dropdown`);
    setSocialDropdownValues(data.message);
  }, []);

  useEffect(() => {
    // console.log("Params are", queryParams);
    console.log(stateList_myArr);
    if (
      stateList_myArr?.state &&
      queryParams.location?.toUpperCase() == "karolbagh".toUpperCase()
    ) {
      let delhiState = stateList_myArr.state.filter(
        (state) => state.state_id == 1
      );
      //   console.log("delhistate is", delhiState);
      //let delhiCity = stateList_myArr.city.filter((state) => state.id == 1);
      setSelectedState(1);
      setSelectedCity(10);
      setSelectedHub(190);
      checkBookingSlots(190);

      // if(stateList_myArr.length){
      //   if(window.location.pathname)
      // }
    }
  }, [product, cityStateList]);

  const checkBookingSlots = async (e) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`
      );
      //   console.log(data.data);
      localStorage.setItem("bookingCity", "Delhi");
      setSlotAvilable(data.data);
    } catch (error) {
      console.log("Not available");
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("isVendor");
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
        : {}
    );
  }, [product]);

  useEffect(() => {
    if (color?.model_id) {
      dispatch(detailsProduct(color?.model_id));
    }
  }, [color]);

  const listenerCallBackScroll = (e) => {
    if (
      document.documentElement.clientHeight >
      document.querySelectorAll("input")[3].getBoundingClientRect().y
    ) {
      document.querySelector(".mobile-next-container").style.position = "fixed";
      document.querySelector(".mobile-next-container").style.bottom = "0px";
      document.querySelector(".mobile-next-container").style.display = "block";
      // document.querySelector(".mobile-next-container").style.bottom = "0px !important"
    } else {
      document.querySelector(".mobile-next-container").style.display = "none";
    }
  };

  useEffect(() => {
    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
    let listener;
    if (document.documentElement.clientWidth < 575) {
      listener = window.addEventListener("scroll", listenerCallBackScroll);
    }
    return () => window.removeEventListener("scroll", listenerCallBackScroll);
  }, []);

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    let searchModel = url.get("model");
    if (searchModel) {
      setModel(
        searchModel.toLowerCase() == "RV1Plus".toLowerCase()
          ? "RV1+"
          : searchModel
      );
    }

    sessionStorage.clear();
    sessionStorage.setItem("oldBooking", false);
    sessionStorage.removeItem("selectedPlan");
  }, []);

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Booking screen",
      "Page Url": window.location.href,
    });

    // let RV400ProductId = "RM0400RRCP1CWBLK";
    let RV400ProductId = "";
    // setLoader(true)
    console.log("All Products callled");
    dispatch(detailsProductAll());
    if (location.state?.model === "RV400BRZ") {
      setModel("RV400BRZ");
    }
  }, []);

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
          (value, index) => value.state_id == selectedState
        )[0].state_name,
        customer_city: availableCity.filter(
          (value, index) => value.city_id == selectedCity
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
    if (!data.status) {
      setExistingEmail(data.data.message);
    } else {
      setsubmitbtn(false);
      localStorage.setItem(
        "contact_id",
        data?.data?.id ? data?.data?.id : null
      );
      localStorage.setItem(
        "org_contact_id",
        "" + data.data.org_contact_id ? data.data.org_contact_id : null
      );
      if (SlotAvilable?.city_stock == "ok") {
        //  setLoader(true)

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
            comments,
          })
        );
        const resp = await dispatch(
          booking(
            true,
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
            model,
            "",
            false,
            source,
            comments
          )
        );

        //  console.log(error);
        if (error) {
          //dispatch({ type: USER_BOOK_RESET });
          // alert('Your are having account with Revolt, Please SignIn!')
          localStorage.setItem("colorInfo", JSON.stringify(color));
          let utm = window.location.search;
          navigate(`/product/${color.model_id + utm}`, {
            state: {
              model,
              color,
            },
          });
        } else {
          //if(bookInfo) {
          localStorage.setItem("colorInfo", JSON.stringify(color));
          let utm = window.location.search;
          navigate(`/product/${color.model_id + utm}`, {
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
    console.log(
      "captcha result",
      parseInt(captchaRef.current.entry),
      captchaRef.current.result
    );
    if (parseInt(captchaRef.current.entry) == captchaRef.current.result) {
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
            (value, index) => value.city_id == selectedCity
          )[0].city_name,
          State: availableStateList.filter(
            (value, index) => value.state_id == selectedState
          )[0].state_name,
          "Dealer Hub": availableHub.filter(
            (value, index) => value.hub_id == selectedHub
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
    } else {
      var message = document.getElementById("captchaMessage");
      var goodColor = "#0C6";
      var badColor = "#ed1c24";
      message.innerHTML =
        "You have entered the wrong answer, please try again!";
    }
  };

  const numberFormatPrice = (value) => {
    let numberVal = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
    let result1 = numberVal.split("₹");
    let result2 = result1[1].split(".");
    let result =
      "₹" + result2[0] + (parseInt(result2[1]) > 0 ? "." + result2[1] : "");
    return result;
  };

  const checkBookingSlot = async (e) => {
    setSelectedHub(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`
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
  localStorage.setItem("colorImage", color?.image);
  // const productArr = product?.product ? [...product?.product].reverse() : [];
  const productArr = product?.[model] ? [...product?.[model]].reverse() : [];
  return (
    <div>
      {loading ? <Loader /> : null}
      <MetaTags id="home">
        <title>Book Your New Electric Bike @ ₹499 Only</title>
        <meta
          name="description"
          content="Book Your New Electric Bike @ ₹499 Only. To experience the best in class features, speed, range and eco-friendly ride, Join The Revolution.
          "
        />
        <meta
          property="og:title"
          content="Book Your New Electric Bike @ ₹499 Only"
        />
        <meta
          property="og:description"
          content="Book Your New Electric Bike @ ₹499 Only. To experience the best in class features, speed, range and eco-friendly ride, Join The Revolution.
          "
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />

        <link rel="canonical" href="https://www.revoltmotors.com/book" />
      </MetaTags>

      {/*  */}

      <section className="light-grey bookNow newBookNow">
        <div className="headerMobile">
          {" "}
          <h1>Book your Revolt </h1>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-xs-12 col-sm-8 rv-pr">
              <div className="carouselVieworder mobileCarouselView">
                <div
                  className={`placeholder-text ${
                    model === "RV400BRZ" ? "brz" : ""
                  }`}
                >
                  {model}
                </div>
                <div className="row">
                  <div className="col-12 col-sm-3 order-sm-1 order-md-1">
                    {" "}
                    <div id="msformNew" className="mobile-choose-model">
                      <div className="form-card">
                        <div className="rvModel-choose head-mobile">
                          {/* <div className="bikeOfferBox">
                            {" "}
                            <h5> Festive Offer</h5>
                            <p>
                              Get flat ₹15,000 off* + Additional benefits worth
                              up to ₹25,700*. <span>*T&C Apply</span>
                            </p>
                          </div> */}
                          <h4>Choose your model</h4>
                          <div className="rvModel-chooseBlock">
                            <div
                              id="rv1"
                              className={`model-item ${
                                model === "RV1" ? "selected-bg" : ""
                              }`}
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
                                //   setFestiveOfferText(RV400FestiveOffer);
                              }}
                            >
                              RV1
                            </div>
                            <div
                              id="rv2+"
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
                                //  setFestiveOfferText(RV400FestiveOffer);
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
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Conditional Rendering of Bike Cards */}
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
                  <div className="col-12">
                    <div className="mobile-choose-model">
                      {Object.keys(color).length ? (
                        <h5>
                          <strong>Color : </strong> {color?.color}
                        </h5>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-9 order-sm-2 order-md-2 rv-pr">
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
                  <div className="mobile-color-pallet">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4  p-3 formView">
              <form
                id="msformNew"
                className="form booking-form"
                onSubmit={submitHandler}
              >
                <div className="form-card">
                  <div className="desktop-color-pallet">
                    <div className="rvModel-choose desktop-choose-model">
                      <h1>Book your Revolt</h1>
                      {/* <div className="bikeOfferBox">
                        {" "}
                        <h5> Festive Offer</h5>
                        <p>
                          {festiveOfferText}
                          <span>*T&C Apply</span>
                        </p>
                      </div> */}
                      <h4>Choose your model</h4>
                      <div className="rvModel-chooseBlock">
                        <div
                          id="rv1"
                          className={`model-item ${model === "RV1" ? "selected-bg" : ""}`}
                          onClick={() => {
                            setModel("RV1");
                            setColor(
                              product?.RV1?.length
                                ? { ...product?.RV1?.[product?.RV1.length - 1] }
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
                          className={`model-item ${model === "RV400BRZ" ? "selected-bg" : ""}`}
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
                          className={`model-item ${model === "RV400" ? "selected-bg" : ""}`}
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
                  </div>

                  <div>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}

                    <div>
                      {/* <h2>
                        Hey! Great to see you in the future. Let's help you book
                        your Revolt.
                      </h2> */}
                      <p>
                        Please enter your personal details below for purchase
                        and registration of your Revolt Motorcycle.
                      </p>
                    </div>
                  </div>

                  <div className="login-space-no">
                    <div className="row">
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
                              ""
                            ))
                          }
                        ></input>
                      </div>
                      <div className="form-group col-md-12 name-group">
                        <div className="palceholder">
                          <label htmlFor="mobile">Mobile </label>
                          <span className="star">*</span>
                        </div>

                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          className="form-control inputfield"
                          placeholder="Mobile "
                          pattern="[6-9]{1,1}[0-9]{9,9}"
                          title="Please enter a valid mobile number"
                          maxLength={10}
                          required
                          value={mobile}
                          onChange={(e) => {
                            if (
                              (!e.target.value ||
                                parseInt(
                                  e.target.value[e.target.value.length - 1]
                                )) >= 0
                            ) {
                              //   console.log("Mobile", e.target.value);
                              setMobile(e.target.value);
                            }
                          }}
                          onInput={(e) => {
                            let value = e.target.value;
                            e.target.value = e.target.value.slice(0, 10);
                            if (/[A-Za-z]/.test(value)) {
                              e.target.value = mobile;
                            }
                          }}
                        ></input>
                      </div>

                      <div className="form-group col-md-12 email-group">
                        <div className="palceholder">
                          <label htmlFor="email">Email </label>
                          <span className="star">*</span>
                        </div>
                        <input
                          type="email"
                          pattern="^[A-Za-z]{1,1}[A-Za-z0-9]{0,}(?!.*\.\.)[_.A-Za-z0-9]{1,}[a-zA-Z0-9]{1,1}@[A-Za-z]{1,}\.([a-zA-Z]{2,})(\.([a-zA-Z]{2,})){0,1}$"
                          title="Please enter a valid email address"
                          id="email"
                          className="form-control inputfield"
                          placeholder="Email"
                          maxlength="50"
                          name="email"
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
                      <div className="col-md-12">
                        <div className="row">
                          <div className="form-group col-md-6 col-6">
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
                                    id={value.state_name}
                                  >
                                    {value.state_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-6 col-6">
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
                                  <option
                                    value={e.city_id}
                                    key={key}
                                    id={e.city_name}
                                  >
                                    {e.city_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
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
                              <option
                                value={e.hub_id}
                                key={key}
                                id={"id" + e.hub_id}
                              >
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
                        <select
                          id="area"
                          placeholder="Where did you hear about Revolt?"
                          className="form-control"
                          required
                          value={source}
                          onChange={(e) => {
                            console.log("Lllllll", e.target.value);
                            setSource(e.target.value);
                          }}
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
                            rows={1}
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

                      {/* rand1={rand1} rand2={rand2} */}
                      <div className="form-group col-md-12 checkboxihave mt-1">
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
                          <input type="checkbox" id="checkbox" required />I
                          agree to the{" "}
                          <a target="_blank" href="/terms">
                            Terms & Conditions
                          </a>{" "}
                          for this booking.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 testride_submit_wrapper">
                    <span id="otpmessage"></span>
                    <div className="otp_btn_wrapper"></div>
                    <div className="BookingButtonWrapper">
                      <ul className="d-flex justify-content-between">
                        <li>
                          <h5>Booking Amount</h5>
                        </li>
                        <li>
                          <h4>
                            {numberFormatPrice(
                              !productDetail.loading
                                ? productDetail?.product?.subscription?.[0]
                                    ?.booking_amount
                                : 499
                            )}{" "}
                            <span>
                              Fully Refundable{" "}
                              <div className="rvtooltip">
                                <img src="/images/info-circle-grey.svg" />{" "}
                                <span className="tooltiptext">
                                  Get a full refund if you cancel your booking
                                  within 90 days.
                                </span>
                              </div>
                            </span>
                          </h4>
                        </li>
                      </ul>
                    </div>
                    {submitbtn && (
                      <div className="desktop-container">
                        <input
                          id="submitButton"
                          type="submit"
                          disabled={
                            mobile.length != 10 ||
                            SlotAvilable?.city_stock != "ok"
                          }
                          name="next"
                          className="next action-button newNextBtn"
                          value="Next"
                        />
                        <img src="/images/next-arrow.svg" />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {submitbtn && (
          <div>
            <div className="mobile-next-container">
              <ul className="d-flex justify-content-between">
                <li>
                  <h5>Booking Amount</h5>
                </li>
                <li>
                  <h4>
                    {numberFormatPrice(
                      !productDetail.loading
                        ? productDetail?.product?.subscription?.[0]
                            ?.booking_amount
                        : 499
                    )}{" "}
                    <span>
                      Fully Refundable{" "}
                      <div className="rvtooltip">
                        <img src="/images/info-circle-grey.svg" />{" "}
                        <span className="tooltiptext">
                          Get a full refund if you cancel your booking within 30
                          days.
                        </span>
                      </div>
                    </span>
                  </h4>
                </li>
              </ul>
              <div className="">
                <button
                  disabled={
                    mobile.length != 10 || SlotAvilable?.city_stock != "ok"
                  }
                  onClick={() =>
                    document.getElementById("submitButton").click()
                  }
                  name="next"
                  className="next action-button newNextBtn"
                >
                  Next <img src="/images/next-arrow.svg" />
                </button>
              </div>
            </div>
          </div>
        )}
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
