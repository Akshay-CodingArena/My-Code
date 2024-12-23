import { axios as Axios } from "../utilities/axios";
import { URL_API } from "../constants/cartConstants";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3JCb29raW5nSWQiOiI2MCIsImFjdGlvbiI6ImFwcHJvdmVkIiwiaWF0IjoxNzA2ODU1NDUzLCJleHAiOjE3MDY4NTkwNTN9.atywyeDiWIBZ2vqliJMTj-deA3-lFld1jszRCOLh13s'; // Replace with actual token

// const decoded = jwtDecode(token);

// console.log(decoded);

const VendorBookingAction = () => {
  let [message, setMessage] = useState("");
  let obj = {};
  if (window.location.search.split("?")[1]) {
    const token = window.location.search.split("?")[1];
    obj = jwtDecode(token);
  }

  useEffect(() => {
    actionTaken();
  }, []);

  const actionTaken = async () => {
    const { data } = await Axios.get(
      URL_API +
        `/api/v1/customer/vendor/booking_confirmation/${obj.vendorBookingId}/${obj.action}`,
    );
    console.log("test", data.data.message);
    setMessage(data?.data?.message);
  };

  return (
    <div className="light-grey admin-page padding-top-100 padding-bottom-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="box-table-panel">
              <div className="top-profile">
                <div className="row align-items-center">
                  <div className={`col-12`}>
                    <h3
                      className="tab-title"
                      style={{
                        textAlign: "center",
                        fontSize: "26px",
                        padding: "20px 0px 0px",
                      }}
                    >
                      Booking Confirmation
                    </h3>
                    {obj.action === "approved" ? (
                      <>
                        <p
                          style={{
                            textAlign: "center",
                            margin: "20px auto",
                            maxWidth: "440px",
                            lineHeight: "30px",
                            fontSize: "18px",
                          }}
                        >
                          {message}.
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          style={{
                            textAlign: "center",
                            margin: "20px auto",
                            maxWidth: "440px",
                            lineHeight: "30px",
                            fontSize: "18px",
                          }}
                        >
                          {message}.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBookingAction;
