import React from "react";
import { useSelector } from "react-redux";
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import { listProductCategories } from '../../actions/productActions';
// import { signout } from '../../actions/userActions';
// import { ROOT_PATH } from '../../constants/cartConstants';
// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '.../../components/MessageBox';
import MetaTags from "react-meta-tags";
function UserNotifyScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      <MetaTags id="unlock-city">
        <title>
          {" "}
          India's 1st AI Enabled Electric Bike, Electric Motorcycle by Revolt
          Motors
        </title>
        <meta
          name="description"
          content="India's 1st AI enabled smart electric bike (EV Bike) with next-gen computing and mobility solution from Revolt Motors. Join the Revolt & its high-performance bike.
"
        />
        <meta
          property="og:title"
          content="Book now India's 1st AI-enabled motorcycle
"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub.
"
        />
      </MetaTags>

      <section className="signinnsignup">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="dashboard">
                <a href="/userdashboard">
                  <div className="media">
                    <img
                      className="mr-3"
                      src="/images/sadboard-icon.png"
                      alt="Sadboard Icon"
                    />
                    <div className="media-body">
                      <h5 className="mt-0"> Hello</h5>
                      <p>{userInfo.name}</p>
                    </div>
                  </div>
                </a>
                <div className="bookingride">
                  <ul>
                    <a href="/userbooking">
                      <li>
                        <img src="/images/bookingimg.png" alt="" />{" "}
                        <span>Bookings</span>
                      </li>
                    </a>
                    <a href="/usertestride">
                      <li className="active">
                        <img src="/images/testrideimg.png" alt="" />{" "}
                        <span>Test Rides</span>
                      </li>
                    </a>
                    <a href="/usercontactus">
                      <li>
                        <img src="/images/requestimg.png" alt="" />{" "}
                        <span>Request</span>
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-12 col-xs-12">
              <div className="requestid">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="requestride tablerideT">
                      <table>
                        <tbody>
                          <tr>
                            <td>Modal</td>
                            <td className="fwtd"> : RV 400</td>
                          </tr>
                          <tr>
                            <td>Location</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Revolt Hub</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td className="fwtd"> : 17-06-2022</td>
                          </tr>
                          <tr>
                            <td>Time</td>
                            <td className="fwtd"> : 4:30 pm</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="editcancel mt-4">
                        <a href="/#">Cancel / Edit</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="requestride tablerideT">
                      <table>
                        <tbody>
                          <tr>
                            <td>Modal</td>
                            <td className="fwtd"> : RV 400</td>
                          </tr>
                          <tr>
                            <td>Location</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Revolt Hub</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td className="fwtd"> : 17-06-2022</td>
                          </tr>
                          <tr>
                            <td>Time</td>
                            <td className="fwtd"> : 4:30 pm</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="editcancel mt-4">
                        <a href="/#">Cancel / Edit</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="requestride tablerideT">
                      <table>
                        <tbody>
                          <tr>
                            <td>Modal</td>
                            <td className="fwtd"> : RV 400</td>
                          </tr>
                          <tr>
                            <td>Location</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Revolt Hub</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td className="fwtd"> : 17-06-2022</td>
                          </tr>
                          <tr>
                            <td>Time</td>
                            <td className="fwtd"> : 4:30 pm</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="editcancel mt-4">
                        <a href="/#">Cancel / Edit</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="requestride tablerideT">
                      <table>
                        <tbody>
                          <tr>
                            <td>Modal</td>
                            <td className="fwtd"> : RV 400</td>
                          </tr>
                          <tr>
                            <td>Location</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Revolt Hub</td>
                            <td className="fwtd"> : Ghaziabad</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td className="fwtd"> : 17-06-2022</td>
                          </tr>
                          <tr>
                            <td>Time</td>
                            <td className="fwtd"> : 4:30 pm</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="editcancel mt-4 cancelled">
                        <a href="/#">Cancelled</a>
                      </div>
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

export default UserNotifyScreen;
