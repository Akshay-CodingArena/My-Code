import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteOrder, listNotify } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import {
  ADMIN_TESTRIDE_DETAILS_FAIL,
  ORDER_DELETE_RESET,
} from "../../constants/orderConstants";
import Axios from "axios";
import { CSVLink } from "react-csv";
import { MDBDataTable } from "mdbreact";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";

export default function BecomeDealerListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/dealer") >= 0;

  const [becomedealerlist, setbecomedealerlist] = useState([]);
  const [selectfromdate, setSelectFromDate] = useState("");
  const [selecttodate, setSelectToDate] = useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userid = userInfo.id;
  const dispatch = useDispatch();
  // useEffect(() => {
  //  // console.log(userInfo);
  //   // dispatch({ type: ORDER_DELETE_RESET });

  //   dispatch(listbecomedealer( userInfo.id,selectfromdate,selecttodate,selectedState,selectedCity,selectedHub ));
  //  //
  // }, [dispatch, sellerMode, successDelete, userInfo.id]);

  ////////////////////////////////////////////////////////////////

  const getData = async () => {
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/becomedealerlist`,
        {
          userid,
          selectfromdate,
          selecttodate,
          selectedState,
          selectedCity,
          selectedHub,
        },
        {
          headers: { Authorization: userInfo.token },
        },
      );

      setbecomedealerlist(data.data.become_dealer);
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

  const table_data = becomedealerlist?.map((becomedealer) => {
    return {
      ID: (
        <a href={`/becomedealerdetail/${becomedealer?.id}`}>
          {becomedealer?.id}
        </a>
      ),
      NAME: becomedealer?.name,
      MOBILE: becomedealer?.mobile,
      EMAIL: becomedealer?.email,
      "CREATED ON": becomedealer?.created_on?.substring(0, 10),
      CITY: becomedealer?.city_name,
      STATE: becomedealer?.state_name,
      STATUS: becomedealer?.becomedealer_status
        ? becomedealer?.becomedealer_date.substring(0, 10)
        : "No",
      SOURCE:becomedealer?.source_name,
      UTM: becomedealer?.utm_source
        ? `utm_source=${becomedealer?.utm_source}&utm_medium=${becomedealer?.utm_medium}&utm_campaign=${becomedealer?.utm_campaign}`
        : "-",
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
        label: "NAME",
        field: "NAME",
        sort: "asc",
        width: 100,
      },
      {
        label: "MOBILE",
        field: "MOBILE",
        sort: "asc",
        width: 100,
      },
      {
        label: "EMAIL",
        field: "EMAIL",
        sort: "asc",
        width: 100,
      },
      {
        label: "CREATED ON",
        field: "CREATED ON",
        sort: "asc",
        width: 100,
      },
      {
        label: "CITY",
        field: "CITY",
        sort: "asc",
        width: 100,
      },
      {
        label: "STATE",
        field: "STATE",
        sort: "asc",
        width: 100,
      },
      {
        label: "Source",
        field: "SOURCE",
        sort: "asc",
        width: 100,
      },
      {
        label: "UTM",
        field: "UTM",
        sort: "asc",
        width: 100,
      },
    ],
    rows: table_data,
  };
  //  console.log(table_data);
  const report_data = becomedealerlist?.map((becomedealer) => {
    return {
      ID: becomedealer?.id,
      "CREATED ON": becomedealer?.created_on?.substring(0, 10),

      NAME: becomedealer?.name,
      Age: becomedealer?.age,
      "Education Qualification": becomedealer?.EducationQualification,
      EMAIL: becomedealer?.email,
      MOBILE: becomedealer?.mobile,

      STATE: becomedealer?.state_name,
      CITY: becomedealer?.city_name,
      District: becomedealer?.District,
      Pincode: becomedealer?.pincode,
      Source:becomedealer?.source_name,
      "Existing Business ": becomedealer?.ExistingBusiness,
      "Name of Business": becomedealer?.NameBusiness,
      "Total Turnover of all businesses": becomedealer?.Turnover,
      "Do you own any automobile dealership?": becomedealer?.OwnDealership
        ? "Yes"
        : "No",
      "Name of Automobile brand": becomedealer?.brand,

      "Proposed Dealership Premises": becomedealer?.ProposedDealershipPremises,
      "Area of Proposed Location (in Sq.ft.)": becomedealer?.Area,
      "Frontage of Proposed Location (in Ft.)": becomedealer?.Frontage,
      "Proposed premises address / Location": becomedealer?.Address,
      "Proposed Amount to Invest": becomedealer?.Invest,
      Details: becomedealer?.Details,
      UTM: becomedealer?.utm_source
        ? `utm_source=${becomedealer?.utm_source}&utm_medium=${becomedealer?.utm_medium}&utm_campaign=${becomedealer?.utm_campaign}`
        : "-",

      // "STATUS" :   becomedealer?.becomedealer_status? becomedealer?.becomedealer_date.substring(0, 10): 'No',
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
                    <h3 className="tab-title">Become a Dealer List</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="BecomeDealerData"
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
                  {!becomedealerlist ? (
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
