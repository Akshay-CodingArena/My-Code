import { useEffect, useState } from "react";
import { axios } from "../utilities/axios";
import { useParams } from "react-router-dom";
import moment from "moment";
// import { format } from "date-fns";
import { MDBDataTable } from "mdbreact";

const BookingHistory = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const {
    state: stateList,
    city: cityList,
    hub: hubList,
  } = JSON.parse(localStorage.getItem("state_city_hub"));

  const fetchData = async () => {
    try {
      let res = await axios.get(
        process.env.REACT_APP_URL_API + "/api/v1/customer/booking/updates/" + id,
      );
      console.log(res.data);
      setData(res.data.data.data);
    } catch (error) {
      console.error("Error fetching booking updates:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const table_data = data?.map((item) => {
    return {
      // DATE: format(new Date(item.updated_at), "yyyy-MM-dd HH:mm:ss"),
      ID: item.booking_id,
      MODEL: item.bike_model,
      COLOR: item.bike_color,
      NAME: item.name,
      EMAIL: item.email,
      MOBILE: item.mobile,
      STATE:
        stateList.find((state) => state.state_id === item.state)?.state_name ||
        "N/A",
      CITY:
        cityList.find((city) => city.city_id === item.city)?.city_name || "N/A",
      HUB: hubList.find((hub) => hub.hub_id === item.area)?.hub_name || "N/A",
      BY: item.created_by,
    };
  });

  const table_meta = {
    columns: [
      {
        // label: "Updated Date | Time",
        field: "DATE",
        sort: "asc",
        width: 25,
      },
      {
        label: "BOOKING ID",
        field: "ID",
        sort: "asc",
        width: 100,
      },
      {
        label: "Bike Model",
        field: "MODEL",
        sort: "asc",
        width: 5,
      },
      {
        label: "Bike Color",
        field: "COLOR",
        sort: "asc",
        width: 5,
      },
      {
        label: "Name",
        field: "NAME",
        sort: "asc",
        width: 5,
      },
      {
        label: "Email",
        field: "EMAIL",
        sort: "asc",
        width: 5,
      },
      {
        label: "Mobile",
        field: "MOBILE",
        sort: "asc",
        width: 5,
      },
      {
        label: "State",
        field: "STATE",
        sort: "asc",
        width: 5,
      },
      {
        label: "City",
        field: "CITY",
        sort: "asc",
        width: 5,
      },
      {
        label: "Hub",
        field: "HUB",
        sort: "asc",
        width: 5,
      },
      {
        label: "Updated By",
        field: "BY",
        sort: "asc",
        width: 5,
      },
    ],
    rows: table_data,
  };

  return (
    <div className="light-grey full-view padding-top-100 padding-bottom-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="box-table-panel"></div>
            <div>
              <h3>Booking Updates History</h3>
              <div className="admin_table">
                <MDBDataTable
                  striped
                  bordered
                  small
                  data={table_meta}
                  className="admin_table"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
