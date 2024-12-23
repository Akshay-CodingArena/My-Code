import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { listProductCategories } from '../../actions/productActions';
// import { signout } from '../../actions/userActions';
// import { ROOT_PATH } from '../../constants/cartConstants';
// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '.../../components/MessageBox';

import UserSideBar from "../../components/UserSideBar";

function UserDashboardScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("Userinformation is", userInfo);
  return (
    <>
      <section className="light-grey userDashboard padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row dashboard-section">
            <div className="col-12 col-sm-4">
              <UserSideBar></UserSideBar>
            </div>
            <div className="col-12 col-sm-8">
              <div className="right-profile-info">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h3 className="tab-title">Personal Information</h3>
                    </div>
                    <div className="col-6">
                      {userInfo?.isAdmin === false &&
                        (userInfo?.isSalesTeam === false ||
                          userInfo?.isSalesTeam === undefined) &&
                        (userInfo?.isFinanceTeam === false ||
                          userInfo?.isFinanceTeam === undefined) && (
                          <div className="text-right">
                            <Link className="sl-btn" to={"/profile"}>
                              Edit Profile
                            </Link>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="common-section">
                  <div className="req-info">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="req-data">
                          <h4>Name</h4>
                          <p>{userInfo?.name}</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="req-data">
                          <h4>Email</h4>
                          <p>{userInfo?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="req-data">
                          <h4>Phone</h4>
                          <p>{userInfo?.mobile}</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="req-data">
                          <h4>State</h4>
                          <p>{userInfo?.state_name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="req-data">
                          <h4>City</h4>
                          <p>{userInfo?.city_name}</p>
                        </div>
                      </div>
                      {/*  <div className='col-12 col-md-6'>
                                                                                <div className='req-data'>
                                                                                <h4>Hub</h4>
                                                                                <p>{userInfo?.area_name}</p>
                                                                                </div>
                                                                        </div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDashboardScreen;
