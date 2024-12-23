import { axios as Axios } from "../utilities/axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CheckoutSteps from "../components/CheckoutSteps";
import Pdf from "react-to-pdf";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import NumberFormat from "react-number-format";

export default function ThankyouScreenNotify(props) {
  const [notify_data, setNotify_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/notifyme/${id}`,
      );

      setNotify_data(data.data.notify[0]);
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-table-panel">
                <div className="top-profile">
                  <div className="row align-items-center">
                    <div className="col-12 text-center">
                      <h3 className="tab-title">THANK YOU</h3>
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div className="row">
                    <div className="col-12">
                      <div className="thanks-message mb-4 text-center">
                        <h1 className="mb-3"></h1>
                        {/* <p>We have registered your city on your behalf! <br/>We will notify you once Revolt is live in your city. Stay tuned!</p>
                         */}
                        <p>
                          We have registered your Interest!
                          <br />
                          We will notify you once the Beauty is unveiled. Stay
                          tuned!
                        </p>
                      </div>

                      <div className="table-sectiondata booking-table half-width change-wdh">
                        <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                          <tbody>
                            <tr>
                              <td>Name</td>
                              <td>{notify_data.name}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{notify_data.email}</td>
                            </tr>
                            <tr>
                              <td>Mobile</td>
                              <td>{notify_data.mobile}</td>
                            </tr>
                            <tr>
                              <td>Pincode</td>
                              <td>{notify_data.pincode}</td>
                            </tr>
                            {/* <tr>
                              <td>Model</td>
                              <td>{notify_data.bike_model}</td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
