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

import { CSVLink } from "react-csv";
import { MDBDataTable } from "mdbreact";

export default function NotifyListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/dealer") >= 0;
  const notifyList = useSelector((state) => state.notifyList);
  const { loading, error, notifys } = notifyList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const [selectfromdate, setSelectFromDate] = useState("");
  const [selecttodate, setSelectToDate] = useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedHub, setSelectedHub] = React.useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(userInfo);
    // dispatch({ type: ORDER_DELETE_RESET });

    dispatch(
      listNotify(
        userInfo.id,
        selectfromdate,
        selecttodate,
        selectedState,
        selectedCity,
        selectedHub,
      ),
    );
    //
  }, [dispatch, sellerMode, successDelete, userInfo.id]);
  // const deleteHandler = (order) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     dispatch(deleteOrder(order.order_id));
  //   }
  // };
  //console.log(notifys);

  const table_data = notifys?.data?.notify?.map((notify) => {
    console.log(notify);
    return {
      ID: <a href={`/notifydetail/${notify?.id}`}>{notify?.id}</a>,
      NAME: notify?.name,
      MOBILE: notify?.mobile,
      EMAIL: notify?.email,
      "CREATED ON": notify?.created_on?.substring(0, 10),
      // "CITY" :  notify?.city_name,
      // "STATE" :  notify?.state_name ,
      PINCODE: notify?.pincode,
      // "STATUS" :   notify?.notify_status? notify?.notify_date.substring(0, 10): 'No',
      MODEL: notify?.bike_model,
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
        label: "PINCODE",
        field: "PINCODE",
        sort: "asc",
        width: 100,
      },
      {
        label: "MODEL",
        field: "MODEL",
        sort: "asc",
        width: 100,
      },
      // ,
      // {
      //   label: 'CITY',
      //   field: 'CITY',
      //   sort: 'asc',
      //   width: 100
      // },
      // {
      //   label: 'STATE',
      //   field: 'STATE',
      //   sort: 'asc',
      //   width: 100
      // }
    ],
    rows: table_data,
  };
  //  console.log(table_data);
  const report_data = notifys?.data?.notify?.map((notify) => {
    return {
      ID: notify?.id,
      NAME: notify?.name,
      MOBILE: notify?.mobile,
      EMAIL: notify?.email,
      "CREATED ON": notify?.created_on?.substring(0, 10),
      PINCODE: notify?.pincode,
      // "CITY" :  notify?.city_name,
      // "STATE" :  notify?.state_name ,
      MODEL: notify?.bike_model,
      STATUS: notify?.notify_status
        ? notify?.notify_date.substring(0, 10)
        : "No",
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
                    <h3 className="tab-title">Notify</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="NotifyData"
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
