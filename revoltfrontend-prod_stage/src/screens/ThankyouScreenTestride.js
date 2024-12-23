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

export default function ThankyouScreenTestride(props) {
  const ref = React.createRef();
  const pdfDataRef = React.useRef();
  const [pdfData, setPdfData] = useState([]);
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
        `${URL_API}/api/v1/customer/testride/${id}`,
      );
      if (data.data.pdf.data) {
        setPdfData([...data.data.pdf.data]);
        pdfDataRef.current = [...data.data.pdf.data];
        console.log("Data pre buffer", pdfDataRef);
      }
      console.log("pdf buffer is", pdfData, pdfDataRef.current);
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
                      <h3 className="tab-title">Test Ride Confirmation</h3>
                    </div>
                    <div className="col-6 text-end">
                      <Pdf
                        targetRef={ref}
                        filename="Receipt_Testride.pdf"
                        y={20}
                        x={5}
                        scale={0.7}
                      >
                        {({ toPdf }) => (
                          <button
                            className="sl-btn"
                            onClick={() => {
                              console.log("Data Buffer", pdfDataRef.current);
                              let blob = new Blob([
                                new Uint8Array(pdfData).buffer,
                              ]);
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute(
                                "download",
                                "Invoice-Receipt.pdf",
                              );
                              link.click();

                              //  toPdf()
                            }}
                          >
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
                  <div className="row">
                    <div className="col-12">
                      <div className="thanks-message mb-4 text-center">
                        <h1 className="mb-3">THANK YOU</h1>
                        <p>
                          Hey, thanks for registering for your{" "}
                          {testride_data?.bike_model === "RV2" ? "RV1+" : testride_data?.bike_model} test ride. <br />
                          Please visit the selected Revolt Hub at your scheduled
                          date and time to ensure a great experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="table-sectiondata booking-table half-width change-wdh"
                    ref={ref}
                  >
                    <table className="table table-striped tableNSEbooking table-bordered tableNSE">
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
                          <td> {testride_data?.bike_model === "RV2" ? "RV1+" : testride_data?.bike_model}</td>
                        </tr>
                        <tr>
                          <td> Date</td>
                          {/* <td> {testride_data?.ride_date}</td> */}
                          <td>
                            {" "}
                            {testride_data?.created_on?.substring(0, 10)}
                          </td>
                        </tr>
                        {/*<tr>
                                                                <td>Slot</td>
                                                                <td>
                                                                    {testride_data?.slot}
                                                                </td>
                                                            </tr> */}
                        <tr>
                          <td>Pincode</td>
                          <td>{testride_data?.pincode}</td>
                        </tr>
                       
                        {testride_data?.hub_name != "REVOLT CENTRAL HUB" ? (
                          <>
                            <tr>
                              <td>State</td>
                              <td>{testride_data?.state_name}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>{testride_data?.city_name}</td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        <tr>
                          <td>Revolt Hub</td>
                          <td>{testride_data?.hub_name}</td>
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
