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

export default function TestrideDetailScreen(props) {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const [testride_data, setTestride_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/admintestride/${id}`,
      );

      setTestride_data(data.data.testride[0]);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

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
                      <h3 className="tab-title">Ride Detail</h3>
                    </div>
                    <div className="col-6 text-end">
                      <Pdf
                        targetRef={ref}
                        filename={`Receipt_Testride_${testride_data?.name}.pdf`}
                        y={20}
                        scale={0.7}
                      >
                        {({ toPdf }) => (
                          <button className="sl-btn" onClick={toPdf}>
                            Download Receipt{" "}
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
                  <div className="table-sectiondata booking-table half-width">
                    <table className="table table-striped table-bordered tableNSE">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{testride_data?.name}</td>
                        </tr>
                        <tr>
                          <td>Email Id</td>
                          <td>{testride_data?.email}</td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>{testride_data?.mobile}</td>
                        </tr>
                        <tr>
                          <td> Model</td>
                          <td> {testride_data?.bike_model}</td>
                        </tr>
                        <tr>
                          <td> Date</td>
                          {/* <td> {testride_data?.ride_date}</td> */}
                          <td>
                            {" "}
                            {testride_data?.created_on?.substring(0, 10)}
                          </td>
                        </tr>
                        {/* <tr>
                                                                <td>Slot</td>
                                                                <td>
                                                                    {testride_data?.slot}
                                                                </td>
                                                            </tr> */}
                        <tr>
                          <td>Pincode</td>
                          <td>{testride_data?.pincode}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{testride_data?.state_name}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{testride_data?.city_name}</td>
                        </tr>
                        <tr>
                          <td>Revolt Hub</td>
                          <td>{testride_data?.hub_name}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Slip start */}
                    <table
                      className="table table-striped table-bordered tableNSE "
                      style={{
                        position: "absolute",
                        left: "-8000px",
                        width: "90%",
                      }}
                      ref={ref}
                    >
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{testride_data?.name}</td>
                        </tr>
                        <tr>
                          <td>Email Id</td>
                          <td>{testride_data?.email}</td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>{testride_data?.mobile}</td>
                        </tr>
                        <tr>
                          <td> Model</td>
                          <td> {testride_data?.bike_model}</td>
                        </tr>
                        <tr>
                          <td> Date</td>
                          {/* <td> {testride_data?.ride_date}</td> */}
                          <td>
                            {" "}
                            {testride_data?.created_on?.substring(0, 10)}
                          </td>
                        </tr>
                        {/* <tr>
                                                                <td>Slot</td>
                                                                <td>
                                                                    {testride_data?.slot}
                                                                </td>
                                                            </tr> */}
                        <tr>
                          <td>Pincode</td>
                          <td>{testride_data?.pincode}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{testride_data?.state_name}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{testride_data?.city_name}</td>
                        </tr>
                        <tr>
                          <td>Revolt Hub</td>
                          <td>{testride_data?.hub_name}</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Slip end */}
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
