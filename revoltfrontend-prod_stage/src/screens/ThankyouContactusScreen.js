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

export default function ThankyouContactusScreen(props) {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const [contactus_data, setcontactus_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/contactus/${id}`,
      );

      setcontactus_data(data.data.contactus[0]);
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
                        <p>
                          Thanks for reaching out. Our concerned team will get
                          back to you shortly.
                        </p>
                        <p>
                          Reference Id : <b>{contactus_data?.contact_ref_id}</b>
                        </p>
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
