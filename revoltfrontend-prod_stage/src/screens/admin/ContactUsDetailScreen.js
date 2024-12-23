import Axios from "axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  adminOrderDetails,
  payOrder,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CheckoutSteps from "../../components/CheckoutSteps";
import Pdf from "react-to-pdf";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import NumberFormat from "react-number-format";
export default function ContactUsDetailScreen(props) {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  const [contact_data, setContact_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/admincontactus/${id}`,
      );

      setContact_data(data.data.contactus[0]);
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
                    <div className="col-6">
                      <h3 className="tab-title">Contact Detail</h3>
                    </div>
                    <div className="col-6 text-end">
                      <Pdf
                        targetRef={ref}
                        filename="Receipt_Testride.pdf"
                        y={20}
                        scale={0.7}
                      >
                        {({ toPdf }) => (
                          <button className="sl-btn" onClick={toPdf}>
                            Download Receipt &nbsp;
                            <i
                              className="fa fa-file-pdf-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                      </Pdf>
                    </div>
                  </div>
                </div>
                <div className="common-section">
                  <div
                    className="table-sectiondata booking-table half-width change-wdh"
                    ref={ref}
                  >
                    <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                      <tbody>
                        <tr>
                          <td>Refernece Id</td>
                          <td>{contact_data?.contact_ref_id}</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>{contact_data?.name}</td>
                        </tr>
                        <tr>
                          <td>Email Id</td>
                          <td>{contact_data?.email}</td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>{contact_data?.mobile}</td>
                        </tr>
                        <tr>
                          <td>Interested In</td>
                          <td>{contact_data?.Interestedin}</td>
                        </tr>
                        <tr>
                          <td> Date</td>
                          <td>{contact_data?.created_on?.substring(0, 10)}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{contact_data?.city_name}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{contact_data?.state_name}</td>
                        </tr>
                        <tr>
                          <td>Comment</td>
                          <td>{contact_data?.comment}</td>
                        </tr>
                      </tbody>
                    </table>
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
