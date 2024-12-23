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
export default function BecomeDealerDetailScreen(props) {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  const [becomedealer_data, setbecomedealer_data] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const getData = async (id) => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/customer/adminbecomedealerdeatial/${id}`,
      );

      setbecomedealer_data(data.data.becomedealer[0]);
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
                      <h3 className="tab-title">Become a Dealer Detail</h3>
                    </div>
                    <div className="col-6 text-end">
                      <Pdf
                        targetRef={ref}
                        filename="Receipt_BecomeDealer.pdf"
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
                    className="table-sectiondata booking-table half-width"
                    ref={ref}
                  >
                    <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                      <tbody>
                        <tr>
                          <td> Date</td>
                          <td>
                            {becomedealer_data?.created_on?.substring(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{becomedealer_data?.state_name}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{becomedealer_data?.city_name}</td>
                        </tr>
                        <tr>
                          <td>District</td>
                          <td>{becomedealer_data?.District}</td>
                        </tr>

                        <tr>
                          <td>Pincode</td>
                          <td>{becomedealer_data?.pincode}</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>{becomedealer_data?.name}</td>
                        </tr>
                        <tr>
                          <td>Age</td>
                          <td>{becomedealer_data?.age}</td>
                        </tr>
                        <tr>
                          <td>Education Qualification</td>
                          <td>{becomedealer_data?.EducationQualification}</td>
                        </tr>
                        <tr>
                          <td>Email Id</td>
                          <td>{becomedealer_data?.email}</td>
                        </tr>
                        <tr>
                          <td>Mobile</td>
                          <td>{becomedealer_data?.mobile}</td>
                        </tr>

                        {/*  */}
                        {/* <tr>
                                                                <td colspan="2"  className="fs-title text-center">Applicant Details</td>
                                                                 
                                                            </tr> */}

                        <tr>
                          <td>Existing Business</td>
                          <td>{becomedealer_data?.ExistingBusiness}</td>
                        </tr>
                        <tr>
                          <td>Name of Business</td>
                          <td>{becomedealer_data?.NameBusiness}</td>
                        </tr>
                        <tr>
                          <td>Total Turnover of all businesses</td>
                          <td>{becomedealer_data?.Turnover}</td>
                        </tr>

                        <tr>
                          <td>Do you own any automobile dealership?</td>
                          <td>
                            {becomedealer_data?.OwnDealership ? "Yes" : "NO"}
                          </td>
                        </tr>
                        <tr>
                          <td>Name of Automobile brand</td>
                          <td>{becomedealer_data?.brand}</td>
                        </tr>
                        {/*  */}

                        {/* <tr>
                                                                <td colspan="2"   ><h2>Proposed Premises Details</h2></td>
                                                                 
                                                            </tr> */}

                        {/* <tr>
                                                                <td>Information Source</td>
                                                                <td>
                                                                    {becomedealer_data?.InformationSource}
                                                                </td>
                                                            </tr> */}

                        <tr>
                          <td>Proposed Dealership Premises</td>
                          <td>
                            {becomedealer_data?.ProposedDealershipPremises}
                          </td>
                        </tr>

                        <tr>
                          <td>Area of Proposed Location (in Sq.ft.)</td>
                          <td>{becomedealer_data?.Area}</td>
                        </tr>

                        <tr>
                          <td>Frontage of Proposed Location (in Ft.)</td>
                          <td>{becomedealer_data?.Frontage}</td>
                        </tr>

                        <tr>
                          <td>Proposed premises address / Location</td>
                          <td>{becomedealer_data?.Address}</td>
                        </tr>

                        <tr>
                          <td>Proposed Amount to Invest</td>
                          <td>{becomedealer_data?.Invest}</td>
                        </tr>

                        <tr>
                          <td>Details</td>
                          <td>{becomedealer_data?.Details}</td>
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
