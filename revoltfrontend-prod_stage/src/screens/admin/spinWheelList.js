import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import Axios from "axios";
import { CSVLink } from "react-csv";
import { MDBDataTable } from "mdbreact";
import { URL_API } from "../../constants/cartConstants";

export default function SpinWheelListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [prizeList, setPrizeList] = useState([]);

  const [selectfromdate, setSelectFromDate] = useState("");
  const [selecttodate, setSelectToDate] = useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userid = userInfo.id;
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////

  const getData = async () => {
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/spin/spin-reward/list`,
        {},
        { headers: { Authorization: userInfo.token } }
      );

      setPrizeList(data.data);
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
  ////////////////////////////////////////////////////////////////

  const table_data = prizeList?.map((data) => {
    return {
      BOOKING_ID: data?.booking_id,
      BOOKING_DATE: data?.booking_date?.substring(0, 10),
      CUSTOMER_MOBILE: data?.customer_mobile,
      CUSTOMER_NAME: data?.customer_name,
      REWARD: data?.reward_name,
      MODEL: data?.item_name,
      ORDER_STATUS:
        data?.order_status == "Created" ? "Active" : data?.order_status,
      SERIAL_NUMBER: data?.serial_number,
      REDEEM_STATUS: data?.is_redeemed === 1 ? "Redeemed" : "Not Redeemed",
      REDEMPTION_DATE: data?.redemption_date?.substring(0, 10),
      //   INVOICE: data?.invoice,
      HUB_NAME: data?.area_name,
    };
  });

  const table_meta = {
    columns: [
      {
        label: "BOOKING ID",
        field: "BOOKING_ID",
        sort: "asc",
        width: 100,
      },
      {
        label: "BOOKING DATE",
        field: "BOOKING_DATE",
        sort: "asc",
        width: 100,
      },
      {
        label: "CUSTOMER NAME",
        field: "CUSTOMER_NAME",
        sort: "asc",
        width: 100,
      },
      {
        label: "CUSTOMER MOBILE",
        field: "CUSTOMER_MOBILE",
        sort: "asc",
        width: 100,
      },
      {
        label: "REWARD",
        field: "REWARD",
        sort: "asc",
        width: 100,
      },
      {
        label: "MODEL",
        field: "MODEL",
        sort: "asc",
        width: 100,
      },
      {
        label: "Order Status",
        field: "ORDER_STATUS",
        sort: "asc",
        width: 100,
      },
      {
        label: "SERIAL NUMBER",
        field: "SERIAL_NUMBER",
        sort: "asc",
        width: 100,
      },
      {
        label: "REDEEEM STATUS",
        field: "REDEEM_STATUS",
        sort: "asc",
        width: 100,
      },
      {
        label: "REDEMPTION DATE",
        field: "REDEMPTION_DATE",
        sort: "asc",
        width: 100,
      },
      //   {
      //     label: "INVOICE",
      //     field: "INVOICE",
      //     sort: "asc",
      //     width: 100,
      //   },
      {
        label: "HUB NAME",
        field: "HUB_NAME",
        sort: "asc",
        width: 100,
      },
    ],
    rows: table_data,
  };

  const report_data = prizeList?.map((data) => {
    return {
      "BOOKING ID": data?.booking_id,
      "BOOKING DATE": data?.booking_date?.substring(0, 10),
      "CUSTOMER MOBILE": data?.customer_mobile,
      "CUSTOMER NAME": data?.customer_name,
      REWARD: data?.reward_name,
      MODEL: data?.item_name,
      ORDER_STATUS:
        data?.order_status == "Created" ? "Active" : data?.order_status,
      "SERIAL NUMBER": data?.serial_number,
      "REDEEM STATUS": data?.is_redeemed === 1 ? "Redeemed" : "Not Redeemed",
      "REDEMPTION DATE": data?.redemption_date?.substring(0, 10),
      INVOICE: data?.invoice,
      "HUB NAME": data?.area_name,
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
                    <h3 className="tab-title">Spin Wheel Prize List</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="PrizeListData"
                        className="sl-btn"
                      >
                        Download CSV
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="common-section">
                <div className="table-sectiondata booking-table form-default ">
                  {!prizeList ? (
                    <LoadingBox></LoadingBox>
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
