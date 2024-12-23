import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import Axios from "axios";
import { CSVLink } from "react-csv";
import { MDBDataTable } from "mdbreact";
import { URL_API } from "../../constants/cartConstants";

export default function FeedbackSurveyScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [feedbackList, setfeedbackList] = useState([]);

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
        `${URL_API}/api/v1/customer/feedback`,
        {},
        { headers: { Authorization: userInfo.token } }
      );

      setfeedbackList(data.data);
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

  const table_data = feedbackList?.map((data) => {
    return {
      //   BOOKING_ID: data?.booking_id,
      //   BOOKING_DATE: data?.booking_date?.substring(0, 10),
      //   CUSTOMER_MOBILE: data?.customer_customer_id,
      //   CUSTOMER_NAME: data?.customer_name,
      //   REWARD: data?.reward_name,
      //   MODEL: data?.item_name,
      //   ORDER_STATUS:
      //     data?.order_status == "Created" ? "Active" : data?.order_status,
      //   SERIAL_NUMBER: data?.serial_number,
      //   REDEEM_STATUS: data?.is_redeemed === 1 ? "Redeemed" : "Not Redeemed",
      //   REDEMPTION_DATE: data?.redemption_date?.substring(0, 10),
      //   //   INVOICE: data?.invoice,
      //   HUB_NAME: data?.area_name,
      //   id: data?.id,
      Customer_Id: data?.customer_id,
      Phone_Number: data?.phone_number,
      Satisfaction: data?.satisfaction_rating,
      Dealer_Name: data?.dealer_name,
      Sales_Process: data?.sales_process_rating,
      Performance_Speed: data?.performance_speed,
      Performance_Handling: data?.performance_handling,
      Performance_Battery_Life: data?.performance_battery_life,
      Performance_Speed_Power: data?.performance_speed_power,
      Performance_Smoothness: data?.performance_smoothness,
      Design_Build_Quality: data?.design_build_quality,
      Design_Look_Style: data?.design_look_style,
      Design_Comfort: data?.design_comfort,
      Recommendation: data?.recommendation_rating === 1 ? "Yes" : "No",
      Like_Most: data?.like_most,
      Improve_Change: data?.improve_change,
      Created_Date: data?.created_at?.substring(0, 10),
    };
  });

  const table_meta = {
    columns: [
      //   {
      //     label: "ID",
      //     field: "id",
      //     sort: "asc",
      //     width: 100,
      //   },
      {
        label: "Customer Id",
        field: "Customer_Id",
        sort: "asc",
        width: 100,
      },
      {
        label: "Phone Number",
        field: "Phone_Number",
        sort: "asc",
        width: 100,
      },
      {
        label: "Hub",
        field: "Dealer_Name",
        sort: "asc",
        width: 100,
      },

      {
        label: "Experience with Revolt",
        field: "Satisfaction",
        sort: "asc",
        width: 100,
      },
      {
        label: "Buying journey OF Revolt",
        field: "Sales_Process",
        sort: "asc",
        width: 100,
      },
      {
        label: "Pick-up & Speed",
        field: "Performance_Speed",
        sort: "asc",
        width: 100,
      },
      {
        label: "Ease of handling & turn",
        field: "Performance_Handling",
        sort: "asc",
        width: 100,
      },
      {
        label: "Kilometer range in full charge",
        field: "Performance_Battery_Life",
        sort: "asc",
        width: 100,
      },
      {
        label: "Power & load carrying capacity",
        field: "Performance_Speed_Power",
        sort: "asc",
        width: 100,
      },
      {
        label: "Overall Riding Experience",
        field: "Performance_Smoothness",
        sort: "asc",
        width: 100,
      },
      {
        label: "Build quality and sturdiness",
        field: "Design_Build_Quality",
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
        label: "Look and style of the bike",
        field: "Design_Look_Style",
        sort: "asc",
        width: 100,
      },
      {
        label: "Comfort of the seat & riding position",
        field: "Design_Comfort",
        sort: "asc",
        width: 100,
      },
      {
        label: "Recommend Revolt RV1",
        field: "Recommendation",
        sort: "asc",
        width: 100,
      },
      {
        label: "Like Most About RV1",
        field: "Like_Most",
        sort: "asc",
        width: 100,
      },
      {
        label: "Suggestions",
        field: "Improve_Change",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date",
        field: "Created_Date",
        sort: "asc",
        width: 100,
      },
    ],
    rows: table_data,
  };

  const report_data = feedbackList?.map((data) => {
    return {
      "Customer Id": data?.customer_id,
      "Phone Number": data?.phone_number,
      Hub: data?.dealer_name,
      "Experience with Revolt": data?.satisfaction_rating,
      "Buying journey OF Revolt": data?.sales_process_rating,
      "Pick-up & Speed": data?.performance_speed,
      "Ease of handling & turn": data?.performance_handling,
      "Kilometer range in full charge": data?.performance_battery_life,
      "Power & load carrying capacity": data?.performance_speed_power,
      "Overall Riding Experience": data?.performance_smoothness,
      "Build quality and sturdiness": data?.design_build_quality,
      "Look and style of the bike": data?.design_look_style,
      "Comfort of the seat & riding position": data?.design_comfort,
      "Recommend Revolt RV1": data?.recommendation_rating === 1 ? "Yes" : "No",
      "Like Most About RV1": data?.like_most,
      Suggestions: data?.improve_change,
      Date: data?.created_at?.substring(0, 10),
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
                    <h3 className="tab-title">Feedback List</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="feedbackListData"
                        className="sl-btn"
                      >
                        Download CSV
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="common-section">
                <div
                  className="table-sectiondata booking-table form-default "
                  style={{ overflowX: "scroll" }}
                >
                  {!feedbackList ? (
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
