import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { contactList } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { listCotacts } from "../../actions/orderActions";
// import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import Pdf from "react-to-pdf";
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import { CSVLink } from "react-csv";
import { MDBDataTable } from "mdbreact";

export default function ContactUsListScreen(props) {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  const { pathname } = useLocation();
  //const sellerMode = pathname.indexOf('/dealer') >= 0;

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contact_list } = contactList;

  //const [contact_list, setContact_list] =  useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const [selectfromdate, setSelectFromDate] = useState("");
  const [selecttodate, setSelectToDate] = useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  // const { id } = params;
  // const deleteHandler = (order) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     dispatch(deleteOrder(order.order_id));
  //   }
  // };
  /*
  const getData = async () => {
    try {
      const { data } = await Axios.post(`${URL_API}/api/v1/customer/contactlist`  );
      //console.log(data);
     // setContact_list(data.data.contactus)
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      
    }
  };*/

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listCotacts(
        userInfo.id,
        selectfromdate,
        selecttodate,
        selectedState,
        selectedCity,
      ),
    );

    //  getData()
  }, [dispatch, userInfo.id]);

  //console.log(process.env.evn_URL_API);
  //console.log(contact_list);

  const table_data = contact_list?.data?.contactus?.map((contact_data) => {
    return {
      "REF ID": (
        <a href={`/contactusdetail/${contact_data?.id}`}>
          {contact_data?.contact_ref_id}
        </a>
      ),
      NAME: contact_data?.name,
      MOBILE: contact_data?.mobile,
      EMAIL: contact_data?.email,
      CITY: contact_data?.city_name,
      PINCODE: contact_data?.pincode,
      "INTERESTED IN": contact_data?.Interestedin,
      "CREATED ON": contact_data?.created_on?.substring(0, 10),
    };
  });

  const table_meta = {
    columns: [
      {
        label: "REF ID",
        field: "REF ID",
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
        label: "CITY",
        field: "CITY",
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
        label: "INTERESTED IN",
        field: "INTERESTED IN",
        sort: "asc",
        width: 100,
      },
      {
        label: "CREATED ON",
        field: "CREATED ON",
        sort: "asc",
        width: 100,
      },
    ],
    rows: table_data,
  };
  //  console.log(table_data);
  const report_data = contact_list?.data?.contactus?.map((contact_data) => {
    return {
      "REF ID": contact_data?.contact_ref_id,
      NAME: contact_data?.name,
      MOBILE: contact_data?.mobile,
      EMAIL: contact_data?.email,
      CITY: contact_data?.city_name,
      PINCODE: contact_data?.pincode,
      "INTERESTED IN": contact_data?.Interestedin,
      DATE: contact_data?.created_on?.substring(0, 10),
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
                    <h3 className="tab-title">Request</h3>
                  </div>
                  <div className="col-6 text-end">
                    {report_data && (
                      <CSVLink
                        data={report_data}
                        filename="RequestData"
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
