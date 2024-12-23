import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import UserSideBar from "../../components/UserSideBar";
import { Link } from "react-router-dom";
import { axios as Axios } from "../../utilities/axios";
import { URL_API } from "../../constants/cartConstants";
import { MetaTags } from "react-meta-tags";

export default function UserProfileEditScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);

  const [name, setName] = useState(
    userInfo_myArr?.name ? userInfo_myArr.name : "",
  );
  const [mobile, setMobile] = useState(
    userInfo_myArr?.mobile ? userInfo_myArr.mobile : "",
  );
  const [email, setEmail] = useState(
    userInfo_myArr?.email ? userInfo_myArr.email : "",
  );
  const [selectModel, setSelectModel] = useState("");
  const [selectTestDate, setSelectTestDate] = useState("");
  const [selecttimeSlot, setSelectTimeSlot] = useState("");

  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isCaller, setIsCaller] = useState(false);
  const [isFinanceTeam, setIsFinanceTeam] = useState(false);

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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    setName(userInfo?.name ? userInfo?.name : "");
    setEmail(userInfo?.email ? userInfo?.email : "");
    setIsAdmin(userInfo?.isAdmin ? userInfo?.isAdmin : "");
    setIsSeller(userInfo?.isSeller ? userInfo?.isSeller : "");
    setIsCaller(userInfo?.isCaller ? userInfo?.isCaller : "");
    setIsFinanceTeam(userInfo?.isFinanceTeam ? userInfo?.isFinanceTeam : "");
    // console.log(userInfo);
    // if (userInfo) {
    //   console.log(user);
    //   dispatch({ type: USER_UPDATE_PROFILE_RESET });
    //   dispatch(detailsUser(userInfo.id));
    // } else {
    //   setName(userInfo.name);
    //   setEmail(userInfo.email);
    //  /* if (user.seller) {
    //     setSellerName(user.seller.name);
    //     setSellerLogo(user.seller.logo);
    //     setSellerDescription(user.seller.description);
    //   }*/
    // }
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      let URL_CONTACT_CREATE =
        URL_API + "/api/v1/common/freshdesk_records/contacts";
      const formData = {
        name: name,
        email: email,
        mobile: mobile,
        address: "",
        booking_id: "",
        org_contact_id: "",
        contact_id: "",
        chassis_number: "",
        sales_dealer: "",
        last_visited_service_center: " ",
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
      Axios.post(URL_CONTACT_CREATE, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic UGdLbHowcDAwNW1uRGZuZVBKZ0U6WA==",
        },
      });
      dispatch(
        updateUserProfile({
          userId: userInfo?.id,
          name: name,
          mobile: mobile,
          email: email,
          password: password,
          state: selectedState,
          city: selectedCity,
          // "area":selectedHub,
          sellerName: sellerName,
          sellerLogo: sellerLogo,
          sellerDescription: sellerDescription,
          isSeller: isSeller,
          isAdmin: isAdmin,
          isCaller: isCaller,
        }),
      );
    }
  };
  return (
    <>
      <MetaTags>
        <link rel="canonical" href="https://www.revoltmotors.com/profile" />
      </MetaTags>
      <section className="light-grey userDashboard padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row dashboard-section">
            <div className="col-4">
              <UserSideBar></UserSideBar>
            </div>
            <div className="col-8">
              <div className="right-profile-info">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Edit Information</h3>
                    </div>
                  </div>
                </div>

                <div className="edit-profile-info">
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                      <MessageBox variant="success">
                        Profile Updated Successfully
                      </MessageBox>
                    )}

                    <div className="form-default">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="label">Name</label>
                            <input
                              className="form-control"
                              id="name"
                              type="text"
                              placeholder="Enter Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              disabled={
                                userInfo?.isSeller || userInfo?.isCaller
                              }
                            ></input>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            {userInfo?.isSeller != true && (
                              <>
                                <label className="label">Email</label>
                                <input
                                  className="form-control"
                                  id="email"
                                  type="email"
                                  placeholder="Enter email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  disabled={
                                    userInfo?.isSeller || userInfo?.isCaller
                                  }
                                ></input>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="label">Password</label>
                            <input
                              className="form-control"
                              id="password"
                              type="password"
                              placeholder="Enter password"
                              onChange={(e) => setPassword(e.target.value)}
                              minlength="8"
                              maxLength="20"
                            ></input>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="label">Confirm Password</label>
                            <input
                              className="form-control"
                              id="confirmPassword"
                              type="password"
                              placeholder="Enter confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              minlength="8"
                              maxLength="20"
                            ></input>
                          </div>
                        </div>
                        {userInfo?.isSeller != true &&
                          userInfo?.isCaller != true && (
                            <>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">State</label>
                                  <select
                                    id="state"
                                    className="form-control"
                                    placeholder="Select State"
                                    required
                                    value={selectedState}
                                    onChange={(e) =>
                                      setSelectedState(e.target.value)
                                    }
                                  >
                                    <option>--Choose State--</option>
                                    {stateList.map((value, key) => {
                                      return (
                                        <option
                                          value={value.state_id}
                                          key={key}
                                        >
                                          {value.state_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="label">City</label>
                                  <select
                                    id="city"
                                    className="form-control"
                                    placeholder="City"
                                    value={selectedCity}
                                    onChange={(e) =>
                                      setSelectedCity(e.target.value)
                                    }
                                    required
                                  >
                                    <option>--Choose City--</option>
                                    {availableCity.map((e, key) => {
                                      return (
                                        <option value={e.city_id} key={key}>
                                          {e.city_name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </>
                          )}
                        {/*}  <div className='col-12 col-md-12'>
                  <div className='form-group'>
                       <label className='label'>Hub</label>
                       <select id="area" placeholder="Dealer Hub" className="form-control" required value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)} >
                                <option value="">--Dealer Hub --</option>
                                {availableHub.map((e, key) => {
                                  return (
                                    <option value={e.hub_id} key={key}>
                                      {e.hub_name}
                                    </option>
                                  );
                                })}
                      </select>  
                  </div> 
            </div> */}

                        <div className="col-12 col-md-12">
                          <div className="bn">
                            <a
                              className="sl-btn wh-text"
                              onClick={submitHandler}
                            >
                              Update
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
