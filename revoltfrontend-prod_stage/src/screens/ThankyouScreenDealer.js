import Axios from "axios";
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

export default function ThankyouScreenDealer(props) {
  const [becomeDealear_data, setbecomeDealear_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/becomedealer/${id}`,
      );

      setbecomeDealear_data(data.data.become_dealer[0]);
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    //      getData(id)
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
                        <p>Our team will get in touch with you shortly.</p>
                      </div>

                      {/* <div className='table-sectiondata booking-table half-width change-wdh'>
                                                                  <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                                                                      <tbody> 
                                                                          <tr>
                                                                              <td>Name</td>
                                                                              <td>
                                                                                    {becomeDealear_data.name}
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                               <td>Email</td>
                                                                               <td>
                                                                                    {becomeDealear_data.email}
                                                                               </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td>Mobile</td>
                                                                              <td>
                                                                                    {becomeDealear_data.mobile}
                                                                              </td>
                                                                          </tr>
                                                                           
                                                                      </tbody>
                                                                  </table>     
                                                            </div>  */}
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
