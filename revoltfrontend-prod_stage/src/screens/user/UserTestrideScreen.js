import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import { listProductCategories } from "../../actions/productActions";
import { signout } from "../../actions/userActions";
import UserSideBar from "../../components/UserSideBar";

// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '.../../components/MessageBox';
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";

function UserTestrideScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const [testride_list, setTestride_list] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  // const { id } = params;
  const deleteHandler = async (testride_id) => {
    if (window.confirm("Are you sure to cancel your ride?")) {
      try {
        const { data } = await Axios.delete(
          `${URL_API}/api/v1/customer/deletetestride/${testride_id}`,
        );
        console.log(data);
        getData();
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      }
    }
  };

  const getData = async () => {
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/testridelist/${userInfo.mobile}`,
      );
      console.log(data);
      setTestride_list(data.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
                    <div className="col-12">
                      <h3 className="tab-title">Test Rides</h3>
                    </div>
                  </div>
                </div>

                <div className="common-section">
                  {testride_list?.map((testride) => (
                    <div className="box-request" key={testride.id}>
                      <div className="req-title">
                        <h3>
                          Booking ID :{" "}
                          <span className="red-color">
                            {testride.bike_model}-0{testride.id}
                          </span>
                        </h3>
                      </div>
                      <div className="req-info">
                        <div className="row">
                          <div className="col-4">
                            <div className="req-data">
                              <h4>Model</h4>
                              <p>{testride.bike_model}</p>
                            </div>
                          </div>
                          <div className="col-4">
                            {testride?.hub_name != "REVOLT CENTRAL HUB" ? (
                              <div className="req-data">
                                <h4>Pincode/ State / City</h4>
                                <p>
                                  {testride?.pincode} / {testride.state_name} /{" "}
                                  {testride.city_name}
                                </p>
                              </div>
                            ) : (
                              <div className="req-data">
                                <h4>Pincode</h4>
                                <p>{testride?.pincode} </p>
                              </div>
                            )}
                          </div>
                          <div className="col-4">
                            <div className="req-data">
                              <h4>Revolt Hub</h4>
                              <p>{testride.hub_name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-4">
                            <div className="req-data">
                              <h4>Booking Date</h4>
                              {testride?.created_on?.substring(0, 10)}
                              {/* <p>{testride.ride_date}</p> */}
                            </div>
                          </div>
                          <div className="col-4"></div>
                          {/* <div className='col-4'>
                          <div className='req-data'>
                                  <h4>Time</h4>
                                  <p>{testride.slot}</p>
                          </div>
                    </div> */}
                          <div className="col-4">
                            <div className="text-center">
                              {testride.status == "Cancelled" ? (
                                <a className="sl-btn sb-btn d-block" disabled>
                                  Cancelled
                                </a>
                              ) : (
                                <a
                                  className="sl-btn d-block simple-btn"
                                  onClick={() => deleteHandler(testride.id)}
                                >
                                  Cancel
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className='req-title text-right'>
             
      </div> */}
                    </div>
                  ))}

                  {(() => {
                    if (!testride_list?.length) {
                      return (
                        <div className="not-found">
                          <div className="not-found-message text-center">
                            <p>
                              {" "}
                              You have not booked any test ride yet. Please{" "}
                              <Link to="/test-ride">click here</Link> to book
                              your test ride.
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTestrideScreen;
