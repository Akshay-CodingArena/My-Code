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
import NumberFormat from "react-number-format";
// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '.../../components/MessageBox';
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import moment from "moment";
import UserSideBar from "../../components/UserSideBar";
////////////////////////////////
const dateConverter = (startDate) => {
  // console.log("startDate "+startDate)

  const createdate = startDate.split(" ")[0];
  // console.log("createdate "+createdate)
  const [day, month, year] = createdate.split("-");

  const newEndDate = month + "-" + day + "-" + year;
  const newStartDate = moment().format("MM-DD-YYYY");

  // console.log(newStartDate)
  // console.log(newEndDate)

  let result = moment(newStartDate).diff(newEndDate, "days");

  let validDate = false;

  // console.log("days "+result);
  if (result < 30 && result >= 0) {
    validDate = true;
    //     console.log(validDate)
  }
  if (result == 0) {
    validDate = true;
    //     console.log(validDate)
  }

  return validDate;
};
////////////////////////////////////////////////////////////////
function UserBookingScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const [order_list, setOrder_list] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  // const { id } = params;

  const getData = async () => {
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/orderlist/${userInfo.id}`,
        {
          //user_id,selectfromdate,selecttodate,selectedState,selectedCity,selectedHub
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );
      // const { data } = await Axios.post(`${URL_API}/api/v1/customer/contactlist/${userInfo.mobile}`  );
      //      console.log(data);
      setOrder_list(data.data);
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
                    <h3 className="tab-title">Booking Information</h3>
                  </div>
                </div>
              </div>

              <div className="common-section">
                {order_list?.map((order, i) => (
                  <div className="box-request" key={i}>
                    <div className="req-title">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <h3>
                            Booking ID :{" "}
                            <span className="red-color">
                              {order.isPaid == 1 ? (
                                <>{order.booking_id}</>
                              ) : (
                                <b> Not Booked</b>
                              )}
                            </span>
                          </h3>
                        </div>
                        <div className="col-6 text-right">
                          {order.order_status == "Cancel" ? (
                            <>
                              <a className="sl-btn sb-btn" href={`/book`}>
                                Book Again
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="req-info">
                      <div className="row">
                        <div className="col-6">
                          <div className="info-image mb-4">
                            <img src={`images/${order.image}`} />
                          </div>
                          {/* <div className='req-data mb-4'>
                                              <h4>Tentative Delivery</h4>
                                              <p>{order.delivery_batch}</p>
                                        </div> */}

                          {order.order_status != "Cancel" && (
                            <div className="req-data mb-4">
                              <h4>Expected Delivery </h4>
                              <p> Immediate</p>
                            </div>
                          )}
                          <div className="req-data flex-dta">
                            <p>
                              <span>
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                />
                              </span>
                              <span>
                                {order.area_name} | {order.city_name},{" "}
                                {order.state_name}
                              </span>
                            </p>
                            <p>
                              <span>
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                />{" "}
                              </span>
                              <span>
                                {order.isPaid == 1
                                  ? "Booking Date and Time"
                                  : "Date"}{" "}
                                - {order.createdAt}
                              </span>
                            </p>
                            {order.order_status == "Cancel" ? (
                              <>
                                <p>
                                  <span>
                                    <i
                                      className="fa fa-calendar"
                                      aria-hidden="true"
                                    />{" "}
                                  </span>
                                  <span>
                                    Cancellation - {order.cancel_date}
                                  </span>
                                </p>
                                <p>
                                  <span>
                                    <i
                                      className="fa fa-calendar"
                                      aria-hidden="true"
                                    />{" "}
                                  </span>
                                  <span>Refund Id - {order.refund_id}</span>
                                </p>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="space-border">
                            <div className="row">
                              <div className="col-12">
                                <div className="row align-items-center">
                                  <div className="col-4">
                                    <div className="req-data">
                                      <h4>Model</h4>
                                    </div>
                                  </div>
                                  <div className="col-8">
                                    <div className="model-name">
                                      {order.item_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12">
                                <div className="booking-table">
                                  <table className="table table-striped tableNSEbooking">
                                    <thead>
                                      <tr>
                                        <th>Booking Amount </th>
                                        <th>
                                          <NumberFormat
                                            value={order.booking_amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                          />
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Vehicle Ex-Showroom Price</td>
                                        <td>
                                          <NumberFormat
                                            value={order.itemsPrice}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                          />
                                        </td>
                                      </tr>
                                      {order.schemeStatus ? (
                                        <tr>
                                          <td>Employee Discount Offer</td>
                                          <td>{order.schemeStatus}</td>
                                        </tr>
                                      ) : null}
                                      {/* <tr>
                                                                            <td>Fame II Incentive 1 (b)</td>
                                                                            <td>
                                                                                   <NumberFormat value={order.fame_subsidy_at_booking} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                      </tr>
                                                                      <tr>
                                                                            <td>State Incentive</td>
                                                                            <td>
                                                                                    <NumberFormat value={order.state_incentive_amount} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                      </tr> */}
                                      {/* <tr>
                                                                            <td>Revolt Charger </td>
                                                                            <td>
                                                                                    <NumberFormat value="19975" displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                      </tr> */}
                                      {/* <tr>
                                                                            <td>Cost before on-Road  </td>
                                                                            <td>
                                                                                    <NumberFormat displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" value={order.totalPrice} />
                                                                            </td>
                                                                      </tr> */}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="row btn-width">
                                  {order.order_status == "Cancel" ? (
                                    <>
                                      <div className="col-12">
                                        <div className="cancel_biooking_1">
                                          <a
                                            className="sl-btn sb-btn"
                                            href="#"
                                            disabled
                                          >
                                            Cancelled
                                          </a>
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="cancel_biooking_1">
                                          <a
                                            className="sl-btn"
                                            href={`/bookingdetail/${order.order_id}`}
                                          >
                                            Booking Detail
                                          </a>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {dateConverter(order?.createdAt) && (
                                        <div className="col-12">
                                          <div className="cancel_biooking_1">
                                            {order.razorpay_payment_id ==
                                            "cash" ? (
                                              <p className="text-center">
                                                <b>Please Contact Dealership</b>
                                              </p>
                                            ) : (
                                              <a
                                                className="sl-btn sb-btn"
                                                href={`/cancel-my-revolt/${order.booking_id}`}
                                              >
                                                Cancel Booking
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      <div className="col-12">
                                        <div className="cancel_biooking_1">
                                          <a
                                            className="sl-btn"
                                            href={`/bookingdetail/${order.order_id}`}
                                          >
                                            Booking Detail
                                          </a>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(() => {
                  if (!order_list.length) {
                    return (
                      <div className="not-found">
                        <div className="not-found-message text-center">
                          <p>
                            {" "}
                            You have not made any booking(s) yet.
                            <br />
                            Please <Link to="/book">click here</Link> to book
                            your Revolt bike!
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
  );
}

export default UserBookingScreen;
