import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function UserSideBar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("User Information", userInfo);
  //console.log(userInfo);
  return (
    <div className="profile-info">
      <div className="profile-widget">
        <div className="profile-info-box">
          <div className="profile-bg"></div>
          <div className="profile-detail">
            <div className="profile-image">
              <img alt="Profile Icon" src="/images/profile-4.png" />
            </div>
          </div>
          <div className="profile-data text-center">
            <h3>Hello</h3>
            <h2>
              <Link to="/userdashboard">{userInfo?.name}</Link>
            </h2>
            <p>{userInfo?.email}</p>
          </div>
        </div>
      </div>

      {userInfo?.isAdmin === false &&
        userInfo?.isSeller === false &&
        (userInfo?.isCaller === false || userInfo?.isCaller === undefined) &&
        (userInfo?.isSalesTeam === false ||
          userInfo?.isSalesTeam === undefined) &&
        (userInfo?.isFinanceTeam === false ||
          userInfo.isFinanceTeam === undefined) && (
          <div className="profile-widget">
            <div className="profile-links">
              <ul>
                <li>
                  <NavLink to="/userbooking">
                    <img alt="" src="/images/profile-1.png" /> Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/upgradebooking">
                    <img alt="" src="/images/profile-1.png" />
                    Upgrade Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/usertestride">
                    <img alt="" src="/images/profile-2.png" /> Test Rides
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/usercontactus">
                    <img alt="" src="/images/profile-3.png" /> Request
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}

      {userInfo?.isCaller === true && (
        <div className="profile-widget">
          <div className="profile-links">
            <ul>
              <li>
                <NavLink to="/ccsupport">
                  <img alt="" src="/images/profile-1.png" />
                  CC Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/upgradeccsupport">
                  <img alt="" src="/images/profile-1.png" />
                  Upgrade CC Support
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
