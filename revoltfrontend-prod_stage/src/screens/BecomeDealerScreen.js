import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axios as Axios } from "../utilities/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { userBookingReducer } from "../reducers/userReducers";
import { URL_API, URL_APIX } from "../constants/cartConstants";
import OtpTimer from "otp-timer";
import CascadingDropdown from "../components/state_city_hub";
import clevertap from "clevertap-web-sdk";
import {
  EDUCATION_LEVEL_OPTIONS,
  INVEST_AMOUNT,
  TOTAL_TURNOVER,
} from "../constants/userConstants";
import { MetaTags } from "react-meta-tags";

export default function BecomeDealerScreen(props) {
  const [cityStateDisable, setCityStateDisable] = useState({
    city: false,
    state: false,
  });
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = useSelector(
    (state) => state.state_city_hub.state_city_hub,
  );
  const stateList = stateList_myArr?.state;
  const cityList = stateList_myArr?.city;
  const hubList = stateList_myArr?.hub;

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const navigate = useNavigate();
  const [name, setName] = useState(
    userInfo_myArr?.name ? userInfo_myArr.name : "",
  );
  const [age, setAge] = useState(userInfo_myArr?.age ? userInfo_myArr.age : "");
  const [pincode, setPincode] = useState(
    userInfo_myArr?.pincode ? userInfo_myArr.pincode : "",
  );
  const [brand, setBrand] = useState(
    userInfo_myArr?.brand ? userInfo_myArr.brand : "",
  );
  const [ExistingBusiness, setExistingBusiness] = useState(
    userInfo_myArr?.ExistingBusiness ? userInfo_myArr.ExistingBusiness : "",
  );
  const [NameBusiness, setNameBusiness] = useState(
    userInfo_myArr?.NameBusiness ? userInfo_myArr.NameBusiness : "",
  );
  const [Turnover, setTurnover] = useState(
    userInfo_myArr?.Turnover ? userInfo_myArr.Turnover : "",
  );
  const [EducationQualification, setEducationQualification] = useState(
    userInfo_myArr?.EducationQualification
      ? userInfo_myArr.EducationQualification
      : "",
  );
  const [InformationSource, setInformationSource] = useState(
    userInfo_myArr?.InformationSource ? userInfo_myArr.InformationSource : "",
  );
  const [ProposedDealershipPremises, setProposedDealershipPremises] = useState(
    userInfo_myArr?.ProposedDealershipPremises
      ? userInfo_myArr.ProposedDealershipPremises
      : "",
  );
  const [Invest, setInvest] = useState(
    userInfo_myArr?.Invest ? userInfo_myArr.Invest : "",
  );
  const [Details, setDetails] = useState(
    userInfo_myArr?.Details ? userInfo_myArr.Details : "",
  );
  const [OwnDealership, setOwnDealership] = useState(false);
  const [Area, setArea] = useState(
    userInfo_myArr?.Area ? userInfo_myArr.Area : "",
  );
  const [Frontage, setFrontage] = useState(
    userInfo_myArr?.Frontage ? userInfo_myArr.Frontage : "",
  );
  const [Address, setAddress] = useState(
    userInfo_myArr?.Address ? userInfo_myArr.Address : "",
  );

  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr.mobile : "",
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr.email : "",
  );

  const [socialDropdownValues, setSocialDropdownValues] = useState([]);
  const [source, setSource] = useState("");

  const [selectModel, setSelectModel] = React.useState("");
  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");

  const [District, setDistrict] = React.useState(
    userInfo_myArr?.District ? userInfo_myArr.District : "",
  );

  const [whatsapp, setWhatsapp] = useState(false);

  const [notify, setNotify] = useState([]);

  const [otp, setOtp] = useState("");
  const [otpbtn, setOtpbtn] = useState(true);

  const [statelist, setStatelist] = useState([]);
  let availableState = [];

  const availableCity = cityList?.filter((c) => c.state_id == selectedState);
  //const availableHub = hubList?.filter((c) => c.city_id == selectedCity) ;

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Become a dealer screen",
      "Page Url": window.location.href,
    });
  }, []);


  useEffect(async () => {
    const { data } = await Axios.get(`${URL_API}/api/v1/customer/dropdown`);
    setSocialDropdownValues(data.message);
  }, [])

  async function submitnotify(
    name,
    age,
    pincode,
    brand,
    ExistingBusiness,
    NameBusiness,
    Turnover,
    EducationQualification,
    InformationSource,
    ProposedDealershipPremises,
    Invest,
    Details,
    mobile,
    email,
    state,
    city,
    District,
    Area,
    Frontage,
    Address,
    OwnDealership,
    whatsapp,
    source
  ) {
    debugger
    console.log(name);
    let utm = "";
    if (window.location.href.split("?")?.[1]) {
      utm = "?" + window.location.href.split("?")[1];
    } else {
      utm = "?" + sessionStorage.getItem("utm");
    }
    const { data } = await Axios.post(
      `${URL_API}/api/v1/customer/becomedealer${utm}`,
      {
        name,
        age,
        pincode,
        brand,
        ExistingBusiness,
        NameBusiness,
        Turnover,
        EducationQualification,
        InformationSource,
        ProposedDealershipPremises,
        Invest,
        Details,
        mobile,
        email,
        state,
        city,
        District,
        Area,
        Frontage,
        Address,
        OwnDealership,
        whatsapp,
        source
      },
    );
    console.log("data");
    setNotify(data);

    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (data?.status == false) {
      message.style.color = badColor;
      message.innerHTML = data.message;
    } else {
      ////
      clevertap.onUserLogin.push({
        Site: {
          Name: name,
          Identity: mobile,
          Email: email,
          Phone: "+91" + mobile,
        },
      });

      let formData = {
        State: stateList?.filter((value, index) => value.state_id == state)[0]
          .state_name,
        City: cityList?.filter((value, index) => value.city_id == city)[0]
          .city_name,
        District: District,
        "Pin Code": pincode,
        Name: name,
        Age: age,
        Qualification: EducationQualification,
        Email: email,
        Mobile: mobile,
        "Existing Business": ExistingBusiness,
        "Name of Business": NameBusiness,
        "Total Turnover of all business": Turnover,
        "Dealership Premises": ProposedDealershipPremises,
        "Area of Proposed Location": Area,
        "Frontage of Proposed Location": Frontage,
        "Proposed premises address/ Location": Address,
        "Proposed amount to invest": Invest,
        Details: Details,
        Date: new Date(),
      };

      if (OwnDealership) {
        formData.AutomobileBrand = brand;
      }
      clevertap.event.push("Applied For Dealership", formData);
      ///
      navigate(`/thankyoudealer/${data.dealer_id}`);
    }
  }
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
  };
  const handleMobile = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobile(value);
  };

  async function checkOTP(checkbox) {
    let mobile_no = document.getElementById("mobile").value;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (mobile_no === "" || mobile_no === null || mobile_no.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    }
    // else if (EducationQualification === "") {
    //   message.style.color = badColor;
    //   message.innerHTML = "Please Select Education Qualification.";
    // }
    else if (
      age === null ||
      age === "" ||
      parseInt(age) < 18 ||
      parseInt(age) > 100
    ) {
      message.style.color = badColor;
      message.innerHTML = "Age should be between 18-100";
    } else if (email === "" || email === null) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Email Id.";
    }
    // else if (selectModel === "" || selectModel === null) {

    //   message.style.color = badColor;
    //   message.innerHTML = "Please Select Model.";
    // }
    else if (selectedState === "" || selectedState === null) {
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

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    console.log(age);
    if (age > 18 || age < 100) {
      try {
        const { data } = await Axios.post(`${URL_API}/api/v1/auth/verifyotp`, {
          mobile,
          otp,
          headers: { Authorization: process.env.REACT_APP_API_KEY },
        });

        if (data.status === true) {
          message.innerHTML = "";
          dispatch(
            submitnotify(
              name,
              age,
              pincode,
              brand,
              ExistingBusiness,
              NameBusiness,
              Turnover,
              EducationQualification,

              InformationSource,
              ProposedDealershipPremises,
              Invest,
              Details,
              mobile,
              email,

              selectedState,
              selectedCity,
              District,

              Area,
              Frontage,
              Address,
              OwnDealership ? 1 : 0,
              whatsapp,
              source
            ),
          );
        } else {
          message.style.color = badColor;
          message.innerHTML = "Please Enter Valid OTP.";
        }
      } catch (error) { }
    } else {
      message.innerHTML = "Age must be between 18-100.";
    }

    // otp verify end
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");
    const cityParam = params.get("city");
    const disableCityState = { city: false, state: false };
    let selectedStateId;
    if (stateParam) {
      selectedStateId = stateList?.find(
        (state) => state.state_name.toLowerCase() === stateParam.toLowerCase(),
      )?.state_id;

      if (selectedStateId) {
        disableCityState.state = true;
        setSelectedState(selectedStateId);
      }
    }

    if (cityParam && selectedStateId) {
      const selectedCityId = cityList?.find(
        (city) =>
          city.city_name.toLowerCase() === cityParam.toLowerCase() &&
          city.state_id === selectedStateId,
      )?.city_id;
      if (selectedCityId) {
        disableCityState.city = true;
        setSelectedCity(selectedCityId);
      }
    }
    setCityStateDisable({ ...disableCityState });

    if (notify) {
      console.log(notify);
      //alert("submit successfully!");
    }
  }, [stateList_myArr]);

  return (
    <>
      <MetaTags id="becomedealer">
        <title>Become an Electric Bike Dealer - Revolt Motors</title>
        <meta
          name="description"
          content="Explore dealer opportunities for electric bikes. Join us and boost your business with India's number 1 electric bike brand. "
        />

        <meta
          property="og:title"
          content="Become an Electric Bike Dealer - Revolt Motors"
        />
        <meta
          property="og:description"
          content="Explore dealer opportunities for electric bikes. Join us and boost your business with India's number 1 electric bike brand. "
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />

        <link
          rel="canonical"
          href="https://www.revoltmotors.com/become-dealer"
        />
      </MetaTags>
      <section className="image-abts">
        <img
          className="desktop"
          src="/images/newhomepage/BannersDesktop/14.png"
          alt="Revolt"
        />
        <img
          className="mobile"
          src="/images/newhomepage/BannersMobile/10.png"
          alt="Revolt"
        />
      </section>
      <section className="test-ride-page light-grey padding-top-100 padding-bottom-100">
        <div className="container">
          {/*  */}
          <form id="msforms" className="form newTest" onSubmit={submitHandler}>
            <fieldset>
              <div className="form-bg">
                <div className="row">
                  <div className="col-12 text-left">
                    <h2 className="fs-title text-center">
                      <b>Become a Revolt Dealer</b>
                    </h2>
                    <p>
                      Revolt Motors employs a comprehensive and professional
                      process for Dealership allotment. Dealer selection is done
                      based on a variety of criteria including a personal
                      meeting with the applicant. It is only post completion of
                      the evaluation and selection process, that other
                      formalities are considered.
                    </p>
                    <p>
                      There are some unscrupulous elements posing to be
                      employees of /agents of Revolt Motors are offering
                      Dealership allotment of Revolt Motors by providing
                      misleading information through fraudulent websites,
                      emails, telephone, messages, etc. and demanding money in
                      this regard.{" "}
                    </p>
                    <p>
                      You are advised not to share any personal data or transfer
                      any money to such fraudsters. We strongly advise you to
                      seek clarifications by writing to us at{" "}
                      <a href="mailto:ddrevolt@revoltmotors.com">
                        ddrevolt@revoltmotors.com
                      </a>{" "}
                      / visiting our official website at{" "}
                      <b>https://www.revoltmotors.com/</b> or calling us at{" "}
                      <b>9873050505</b>.
                    </p>
                  </div>
                </div>
                {/* <div className="row">
                    <div className="col-12 text-center">
                         <h2 className="mb-5">Become a Revolt Dealer</h2>
                    </div>

                  </div> */}

                {/* //////////////Location Applied for start////////////////////////////// */}
                <div className="row">
                  <div className="col-12 text-left">
                    <h3 className="mt-3 mb-3">Location Applied for</h3>
                  </div>
                </div>

                <div className="form-default">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <select
                        id="state"
                        className="form-control"
                        placeholder="Select State"
                        required
                        value={selectedState}
                        disabled={cityStateDisable.state ? true : false}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option>Select State</option>
                        {stateList?.map((value, key) => {
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
                        disabled={cityStateDisable.city ? true : false}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                      >
                        <option>Choose City</option>
                        {availableCity?.length != 0 &&
                          availableCity?.length != null
                          ? availableCity?.map((e, key) => {
                            return (
                              <option value={e.city_id} key={key}>
                                {e.city_name}
                              </option>
                            );
                          })
                          : ""}
                      </select>
                    </div>
                    {/* District start */}
                    <div className="form-group col-md-6 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">District</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        maxLength={40}
                        type="text"
                        className="form-control inputfield"
                        id="District"
                        placeholder="District"
                        required
                        value={District}
                        onChange={(e) => setDistrict(e.target.value)}
                        onInput={(e) =>
                        (e.target.value = e.target.value.replace(
                          /([^a-z-]+)/gi,
                          "",
                        ))
                        }
                      ></input>
                    </div>
                    {/* District end  */}

                    {/* Pincode start */}
                    {/* <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Pin Code</label>
                        <span className="star">*</span>
                      </div>
                      <input
                        type="text"
                        className="form-control inputfield"
                        id="pincode"
                        placeholder="Pin Code"
                        required
                        maxLength="6"
                        value={pincode}
                        // onChange={(e) => {setPincode(e.target.value)}}
                        onChange={handleChange}
                        // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                      ></input>
                    </div> */}
                    {/* Pincode end  */}
                  </div>
                </div>

                {/*////////////Location Applied for end //////////  */}

                {/* //////////////Applicant Details start////////////////////////////// */}
                <div className="row">
                  <div className="col-12 text-left">
                    <h3 className="mt-3 mb-3">Applicant Details</h3>
                  </div>
                </div>

                <div className="form-default">
                  <div className="row">
                    {/*  */}
                    {/* Name start */}
                    <div className="form-group col-md-6 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Applicant Name</label>
                        <span className="star">*</span>
                      </div>
                      <input
                        type="text"
                        className="form-control inputfield"
                        id="name"
                        placeholder="Name"
                        maxLength={40}
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
                    {/* Name end  */}

                    {/* Age start */}
                    <div className="form-group col-md-6 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Age</label>
                        <span className="star">*</span>
                      </div>
                      <input
                        type="number"
                        className="form-control inputfield"
                        id="age"
                        placeholder="Age"
                        required
                        value={age}
                        onChange={(e) =>
                          e.target.value.length > 3
                            ? ""
                            : setAge(e.target.value)
                        }
                        onInput={(e) =>
                        (e.target.value = e.target.value.replace(
                          /([^0-9]+)/gi,
                          "",
                        ))
                        }
                      ></input>
                    </div>
                    {/* Age end  */}

                    {/* Education Qualification start */}
                    {/* <div className="form-group col-md-4">
                      <select
                        id="EducationQualification"
                        className="form-control"
                        placeholder="Education Qualification"
                        value={EducationQualification}
                        onChange={(e) =>
                          setEducationQualification(e.target.value)
                        }
                        required
                      >
                        <option value="">Education Qualification</option>
                        {EDUCATION_LEVEL_OPTIONS?.map((e, key) => {
                          return (
                            <option value={e.Value} key={key}>
                              {e.Option}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}

                    {/* <div className="form-group col-md-4 name-group"> 
                        <div className="palceholder">

                          <label htmlFor="name">Education Qualification</label>
                          <span className="star">*</span>

                        </div>
                        {/* <input
                          type="text"
                          className="form-control inputfield"
                          id="EducationQualification"
                          placeholder="Education Qualification"
                          required
                          value={EducationQualification}
                          onChange={(e) => setEducationQualification(e.target.value)}
                          // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                        ></input> *
                      </div> */}
                    {/* Education Qualification end  */}

                    <div className="form-group col-md-6 email-group">
                      <div className="palceholder">
                        <label htmlFor="email">Email </label>
                        <span className="star">*</span>
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="form-control inputfield"
                        placeholder="Email"
                        maxLength={50}
                        required
                        value={email}
                        onInput={(e) =>
                        (e.target.value = e.target.value.replace(
                          /([^a-z 0-9 @ . ]+)/gi,
                          "",
                        ))
                        }
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>

                    {/* Mobile start */}

                    <div className="form-group col-md-6 name-group">
                      <div className="palceholder">
                        <label htmlFor="Phone">Mobile </label>
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
                        required
                        // onChange={(e) => setMobile(e.target.value)}
                        onChange={handleMobile}
                      ></input>
                    </div>
                    {/* Mobile end */}

                    {/*  */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 text-left">
                    <h3 className="mt-3 mb-3">Where did you hear about Revolt</h3>
                  </div>
                </div>

                <div className="form-default">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <select
                        id="source"
                        placeholder="Where did you hear about Revolt?"
                        className="form-control"
                        required
                        value={source}
                        onChange={(e) =>
                          setSource(e.target.value)
                        }
                      >
                        <option value="">Where did you hear about Revolt?</option>
                        {socialDropdownValues?.map((e, key) => {
                          return (
                            <option value={e.id} key={key}>
                              {e.source}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>


                {/*////////////Applicant Details end //////////  */}

                {/* //////////////Existing Business Details start////////////////////////////// */}
                <div className="row">
                  <div className="col-12 text-left">
                    <h3 className="mt-3 mb-3">Existing Business Details</h3>
                  </div>
                </div>

                <div className="form-default">
                  <div className="row">
                    {/*  */}
                    {/* Existing Business start */}
                    {/* <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Existing Business</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="text"
                        className="form-control inputfield"
                        id="ExistingBusiness"
                        placeholder="Existing Business"
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /([^a-z 0-9 ]+)/gi,
                            "",
                          ))
                        }
                        required
                        maxLength={40}
                        value={ExistingBusiness}
                        onChange={(e) => setExistingBusiness(e.target.value)}
                        // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                      ></input>
                    </div> */}
                    {/* Existing Business end  */}

                    {/* Name of Business start */}
                    {["NO", "N/A", "NONE", "NA"].includes(
                      ExistingBusiness?.toUpperCase(),
                    ) ? null : (
                      <>
                        {/* <div className="form-group col-md-4 name-group">
                          <div className="palceholder">
                            <label htmlFor="name">Name of Business</label>
                            <span className="star">*</span>
                          </div>

                          <input
                            type="text"
                            className="form-control inputfield"
                            id="NameBusiness"
                            placeholder="Name of Business"
                            required
                            maxLength={40}
                            value={NameBusiness}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /([^a-z 0-9]+)/gi,
                                "",
                              ))
                            }
                            onChange={(e) => setNameBusiness(e.target.value)}
                            // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                          ></input>
                        </div> */}
                        {/* Name of Business end  */}

                        {/* Turnover start */}
                        {/* <div className="form-group col-md-4 name-group">
                          <select
                            id="Turnover"
                            className="form-control"
                            placeholder="Total Turnover of all businesses"
                            value={Turnover}
                            onChange={(e) => setTurnover(e.target.value)}
                            required
                          >
                            <option value="">
                              Total Turnover of all businesses
                            </option>
                            {TOTAL_TURNOVER?.map((e, key) => {
                              return (
                                <option value={e.Value} key={key}>
                                  {e.Option}
                                </option>
                              );
                            })}
                          </select>
                        </div> */}
                      </>
                    )}
                    {/* <div className="form-group col-md-4 name-group"> 
                        <div className="palceholder"  >

                          <label htmlFor="Phone">Total Turnover of all businesses </label>
                          <span className="star">*</span>
                        </div>

                        <input
                          type="number"
                          id="Turnover"
                          className="form-control inputfield"
                          placeholder="Total Turnover of all businesses"
                          value={Turnover}
                          minLength="10" maxLength="10"
                          required
                          onChange={(e) => setTurnover(e.target.value)}
                        ></input>
                      </div> */}
                    {/* Turnover end */}

                    <div className="col-md-12 whatsaapform">
                      <div className="form-group col-md-12 checkboxihave">
                        <label>
                          <input
                            type="checkbox"
                            id="OwnDealership"
                            name="OwnDealership"
                            className="input"
                            onChange={(e) => setOwnDealership(e.target.checked)}
                          />
                          Do you own any automobile dealership? {OwnDealership}
                        </label>
                      </div>
                    </div>

                    {OwnDealership && (
                      <>
                        {/* brand start */}
                        <div className="form-group col-md-6 name-group">
                          <div className="palceholder">
                            <label htmlFor="name">
                              Name of Automobile brand
                            </label>
                            <span className="star">*</span>
                          </div>

                          <input
                            type="text"
                            className="form-control inputfield"
                            id="brand"
                            placeholder="Name of Automobile brand"
                            required
                            value={brand}
                            maxLength={30}
                            onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /([^a-z 0-9]+)/gi,
                              "",
                            ))
                            }
                            onChange={(e) => setBrand(e.target.value)}
                          // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                          ></input>
                        </div>
                        {/* brand end  */}
                      </>
                    )}
                    {/*  */}
                  </div>
                </div>

                {/*////////////Existing Business Details end //////////  */}

                {/* //////////////Proposed Premises Details start////////////////////////////// */}
                <div className="row">
                  <div className="col-12 text-left">
                    <h3 className="mt-3 mb-3">Proposed Premises Details</h3>
                  </div>
                </div>

                <div className="form-default">
                  <div className="row">
                    {/*  */}

                    {/* Proposed Dealership Premises Start */}
                    <div className="form-group col-md-6">
                      <select
                        id="ProposedDealershipPremises"
                        placeholder="Proposed Dealership Premises"
                        className="form-control"
                        required
                        value={ProposedDealershipPremises}
                        onChange={(e) =>
                          setProposedDealershipPremises(e.target.value)
                        }
                      >
                        <option>Select Dealership Premises</option>

                        <option value="Own" key="Own">
                          Own
                        </option>

                        <option value="Leased" key="Leased">
                          Leased
                        </option>

                        <option value="Rented" key="Rented">
                          Rented
                        </option>

                        <option value="Not finalized" key="Notfinalized">
                          Not finalized
                        </option>
                      </select>
                    </div>
                    {/* Proposed Dealership Premises end */}

                    {ProposedDealershipPremises != "Not finalized" && (
                      <>
                        {/* Area of Proposed Location (in Sq.ft.) start */}
                        {/* <div className="form-group col-md-4 name-group">
                          <div className="palceholder">
                            <label htmlFor="Phone">
                              Area of Proposed Location (in Sq.ft.)
                            </label>
                            <span className="star">*</span>
                          </div>

                          <input
                            type="number"
                            id="Turnover"
                            className="form-control inputfield"
                            placeholder="Area of Proposed Location (in Sq.ft.)"
                            value={Area}
                            minLength="10"
                            maxLength="10"
                            required
                            onChange={(e) =>
                              e.target.value.length > 10
                                ? ""
                                : setArea(e.target.value)
                            }
                          ></input>
                        </div> */}
                        {/* Area end */}

                        {/* Frontage of Proposed Location (in Ft.) start */}
                        {/* <div className="form-group col-md-4 name-group">
                          <div className="palceholder">
                            <label htmlFor="Phone">
                              Frontage of Proposed Location (in Ft.)
                            </label>
                            <span className="star">*</span>
                          </div>

                          <input
                            type="number"
                            id="Turnover"
                            className="form-control inputfield"
                            placeholder="Frontage of Proposed Location (in Ft.) "
                            value={Frontage}
                            minLength="10"
                            maxLength="10"
                            required
                            onChange={(e) =>
                              e.target.value.length > 10
                                ? ""
                                : setFrontage(e.target.value)
                            }
                          ></input>
                        </div> */}
                        {/* Frontage of Proposed Location (in Ft.) end */}

                        {/* Proposed premises address / Location start */}
                        {/* <div className="form-group col-md-4 name-group">
                          <div className="palceholder">
                            <label htmlFor="name">
                              Proposed premises address / Location
                            </label>
                            <span className="star">*</span>
                          </div>
                          <input
                            type="text"
                            className="form-control inputfield"
                            id="Address"
                            placeholder="Proposed premises address / Location"
                            required
                            value={Address}
                            maxLength={120}
                            onChange={(e) => setAddress(e.target.value)}
                            // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9]+)/gi, '') }
                          ></input>
                        </div> */}
                        {/* Proposed premises address / Location end  */}
                      </>
                    )}

                    {/* Proposed Amount to Invest start */}
                    {/* <div className="form-group col-md-4 name-group">
                      <select
                        id="EducationQualification"
                        className="form-control"
                        placeholder="Total Turnover of all businesses"
                        value={Invest}
                        onChange={(e) => setInvest(e.target.value)}
                        required
                      >
                        <option value="">Proposed Amount to Invest</option>
                        {INVEST_AMOUNT?.map((e, key) => {
                          return (
                            <option value={e.Value} key={key}>
                              {e.Option}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}
                    {/* <div className="form-group col-md-4 name-group"> 
                        <div className="palceholder"  >

                          <label htmlFor="Phone">Proposed Amount to Invest </label>
                          <span className="star">*</span>
                        </div>

                        <input
                          type="number"
                          id="Invest"
                          className="form-control inputfield"
                          placeholder="Proposed Amount to Invest"
                          value={Invest}
                          minLength="10" maxLength="10"
                          required
                          onChange={(e) => setInvest(e.target.value)}
                        ></input>
                      </div> */}
                    {/* Proposed Amount to Invest end */}

                    {/* Details start */}
                    {/* <div className="form-group col-md-4 name-group">
                      <div className="palceholder">
                        <label htmlFor="name">Details</label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="text"
                        className="form-control inputfield"
                        id="Details"
                        placeholder="Details"
                        required
                        value={Details}
                        maxLength={120}
                        onChange={(e) => setDetails(e.target.value)}
                        // onInput={(e) => e.target.value = e.target.value.replace(/([^a-z 0-9 / - ,]+)/gi, '') }
                      ></input>
                    </div> */}
                    {/* Details end  */}

                    {/*  */}
                    {/* Proposed Amount to Invest start * */}
                    <div className="form-group col-md-6 name-group">
                      <select
                        id="EducationQualification"
                        className="form-control"
                        placeholder="Total Turnover of all businesses"
                        value={Invest}
                        onChange={(e) => setInvest(e.target.value)}
                        required
                      >
                        <option value="">Proposed Amount to Invest</option>
                        {INVEST_AMOUNT?.map((e, key) => {
                          return (
                            <option value={e.Value} key={key}>
                              {e.Option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/*////////////Proposed Premises Details end //////////  */}

                <div className="form-default">
                  <div className="row">
                    {/* Information Source Start */}
                    {/* <div className="form-group col-md-4">

                      <select id="InformationSource"
                      placeholder="Information Source"
                      className="form-control"
                      required
                      value={InformationSource}
                      onChange={(e) => setInformationSource(e.target.value)}
                      >
                      <option>Select Source</option>

                      <option value='Existing Revolt Dealer' key='ExistingRevoltDealer'>
                      Existing Revolt Dealer
                      </option>


                      <option value='Customer' key='Customer'>
                      Customer
                      </option>


                      <option value='Revolt Employee' key='RevoltEmployee'>
                      Revolt Employee
                      </option>


                      <option value='News Paper' key='NewsPaper'>
                      News Paper
                      </option>


                      <option value='Website' key='Website'>
                      Website
                      </option>


                      <option value='Friends' key='Friends'>
                      Friends
                      </option>


                      <option value='Others' key='Others'>
                      Others
                      </option>
 
                      </select>
                      </div> */}
                    {/* Information Source end */}

                    {/* ////////////////////////////// */}

                    {/* <div className="form-group col-md-4">

                        <select id="area"
                          placeholder="Dealer Hub"
                          className="form-control"
                          required
                          value={selectModel}
                          onChange={(e) => setSelectModel(e.target.value)}
                        >
                          <option>Select your Preferred Model</option>

                          <option value='RV400' key='RV400'>
                            RV400
                          </option>


                        </select>
                      </div> */}

                    {/* ///////////////////////////////////// */}

                    {/* <div className="col-md-12 whatsaapform">
                        <p>Get <b> <img src="/images/whtsapp_icon.jpg" />WhatsApp</b> reminders & updates on everything that's relevant</p>
                      </div>

                      <div className="form-group col-md-4 checkboxihave">
                        <label>
                        <input type="checkbox" id='check' name="whatsapp" className="input" onChange={(e)=> setWhatsapp(e.target.checked)}/>Yes, opt me in</label>
                      </div> */}
                  </div>
                </div>
                {/*  OTP start */}
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
                          maxLength="6"
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
                {/*  OTP end */}
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
