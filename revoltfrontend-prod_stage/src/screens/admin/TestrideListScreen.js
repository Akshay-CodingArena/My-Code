import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { deleteOrder, listTestrides } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import { CSVLink } from "react-csv";

import { MDBDataTable } from "mdbreact";
// import "mdbreact/dist/css/mdb.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";

export default function TestrideListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/dealer") >= 0;
  const testrideList = useSelector((state) => state.testrideList);
  const { loading, error, testrides } = testrideList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;

  const [selectfromdate, setSelectFromDate] = useState("");
  const [selecttodate, setSelectToDate] = useState("");
  const [selectModel, setSelectModel] = useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  const availableCity = cityList.filter((c) => c.state_id == selectedState);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const isDealer = userInfo?.isSeller ? "Y" : "N";
  const isAdmin = userInfo?.isAdmin ? "Y" : "N";
  const dispatch = useDispatch();

  const getTestRideData = () => {
    dispatch(
      listTestrides(
        userInfo.id,
        selectfromdate,
        selecttodate,
        selectedState,
        selectedCity,
        "",
        isDealer,
        isAdmin,
        selectModel
      )
    );
  };

  useEffect(() => {
    getTestRideData();
  }, [dispatch, sellerMode, successDelete, userInfo.id]);

  {
    /*  */
  }
  const table_data = testrides?.data?.map((testride) => {
    let dealer = isDealer == "Y" ? "dealer/" : "";
    return {
      ID: (
        <a href={`/testridedetail/${dealer}${testride?.id}`}>{testride?.id}</a>
      ),
      NAME: testride?.name,
      MOBILE: testride?.mobile,
      "BOOKED ON": testride?.created_on?.substring(0, 10),
      // "RIDE DATE": testride?.ride_date,
      // "TIME": testride?.slot,
      EMAILID: testride?.email,
      PINCODE: testride?.pincode,
      HUB: testride?.hub_name,
      CITY: testride?.city_name,
      STATE: testride?.state_name,
      BIKE_MODEL: testride?.bike_model,
      STATUS: testride?.isDelivered
        ? testride?.deliveredAt.substring(0, 10)
        : "No",
        SOURCE:testride?.source_name,
    };
  });

  const table_meta = {
    columns: [
      {
        label: "ID",
        field: "ID",
        sort: "asc",
        width: 100,
      },
      {
        label: "Name",
        field: "NAME",
        sort: "asc",
        width: 100,
      },

      {
        label: "Mobile",
        field: "MOBILE",
        sort: "asc",
        width: 100,
      },
      {
        label: "Booked On",
        field: "BOOKED ON",
        sort: "asc",
        width: 100,
      },

      // {
      //   label: 'Ride Date',
      //   field: 'RIDE DATE',
      //   sort: 'asc',
      //   width: 100
      // },
      // {
      //   label: 'Time',
      //   field: 'TIME',
      //   sort: 'asc',
      //   width: 100
      // },
      {
        label: "PINCODE",
        field: "PINCODE",
        sort: "asc",
        width: 100,
      },
      {
        label: "Hub",
        field: "HUB",
        sort: "asc",
        width: 100,
      },
      {
        label: "MODEL",
        field: "BIKE_MODEL",
        sort: "asc",
        width: 100,
      },
      {
        label: "City",
        field: "CITY",
        sort: "asc",
        width: 100,
      },
      {
        label: "State",
        field: "STATE",
        sort: "asc",
        width: 100,
      },
      {
        label: "Source",
        field: "SOURCE",
        sort: "asc",
        width: 100,
      }
    ],
    rows: table_data,
  };

  //  console.log(table_data);
  const report_data = testrides?.data?.map((testride) => {
    debugger
    let dealer = isDealer == "Y" ? "dealer/" : "";
    return {
      ID: testride?.id,
      NAME: testride?.name,
      MOBILE: testride?.mobile,
      EMAILID: testride?.email,
      "BOOKED ON": testride?.created_on?.substring(0, 10),
      // "RIDE DATE": testride?.ride_date,
      // "TIME": testride?.slot,

      PINCODE: testride?.pincode,
      HUB: testride?.hub_name,
      CITY: testride?.city_name,
      STATE: testride?.state_name,
      SOURCE:testride?.source_name,
      BIKE_MODEL: testride?.bike_model,
      STATUS: testride?.isDelivered
        ? testride?.deliveredAt.substring(0, 10)
        : "No"
    };
  });

  return (
    <div className="light-grey full-view padding-top-100 padding-bottom-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="box-table-panel">
              <div className="top-profile">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h3 className="tab-title">Test Rides</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="Testride"
                        className="sl-btn"
                      >
                        Download CSV
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="common-section">
                <div className="dealer_search form-default mt-3">
                  <div className="col-2">
                    <select
                      id="state"
                      className="form-control"
                      placeholder="Select State"
                      required
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedCity("");
                        setSelectedState(e.target.value);
                      }}
                    >
                      <option value="">State</option>
                      {stateList.map((value, key) => {
                        return (
                          <option value={value.state_id} key={key}>
                            {value.state_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-2">
                    <select
                      id="city"
                      className="form-control"
                      placeholder="City"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      required
                    >
                      <option value="">City</option>
                      {availableCity.map((e, key) => {
                        return (
                          <option value={e.city_id} key={key}>
                            {e.city_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-2">
                    <select
                      id="bikeModel"
                      placeholder="Reason Type"
                      className="form-control"
                      required
                      value={selectModel}
                      onChange={(e) => setSelectModel(e.target.value)}
                    >
                      <option value="">Model</option>
                      <option value="RV300">RV300</option>
                      <option value="RV1">RV1</option>
                      <option value="RV1+">RV1+</option>
                      <option value="RV400">RV400</option>
                      <option value="RV400BRZ">RV400BRZ</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <input
                      type="date"
                      id="fromdate"
                      className="form-control inputfield"
                      placeholder="from booking Date"
                      required
                      onChange={(e) => setSelectFromDate(e.target.value)}
                    ></input>
                  </div>

                  <div className="col-2">
                    <input
                      type="date"
                      id="todate"
                      className="form-control inputfield"
                      placeholder="Booking TO Date"
                      required
                      onChange={(e) => setSelectToDate(e.target.value)}
                    ></input>
                  </div>

                  <div className="col-2">
                    <button id="submit" onClick={getTestRideData}>
                      Search
                    </button>
                  </div>
                </div>

                <div className="table-sectiondata booking-table form-default ">
                  {loadingDelete && <LoadingBox></LoadingBox>}
                  {errorDelete && (
                    <MessageBox variant="danger">{errorDelete}</MessageBox>
                  )}
                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <MDBDataTable striped bordered small data={table_meta} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
