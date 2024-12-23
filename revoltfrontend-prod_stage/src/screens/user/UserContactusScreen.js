import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { listProductCategories } from '../../actions/productActions';
// import { signout } from '../../actions/userActions';
import UserSideBar from "../../components/UserSideBar";

// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '.../../components/MessageBox';
import Axios from "axios";
import { URL_API } from "../../constants/cartConstants";

function UserContactusScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const ref = React.createRef();
  //   const options = {
  //       orientation: 'landscape',
  //       unit: 'in',
  //       format: [4,2]
  //   };

  const [contact_list, setContact_list] = useState([]);
  //   const navigate = useNavigate();
  //   const params = useParams();

  // const { id } = params;

  const getData = async () => {
    try {
      const { data } = await Axios.post(
        `${URL_API}/api/v1/customer/contactlist/${userInfo.mobile}`,
      );
      console.log(data);
      setContact_list(data.data.contactus);
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

  return (
    <section className="light-grey userDashboard padding-top-100 padding-bottom-100">
      <div className="container">
        <div className="row dashboard-section">
          <div className="col-4">
            <UserSideBar></UserSideBar>
          </div>
          <div className="col-8">
            <div className="right-profile-info">
              <div className="top-profile">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h3 className="tab-title">Request</h3>
                  </div>
                </div>
              </div>

              <div className="common-section">
                {contact_list?.map((contact, key) => (
                  <div className="box-request" key={key}>
                    <div className="req-title">
                      <h3>
                        Request ID :{" "}
                        <span className="red-color">
                          {contact.contact_ref_id}
                        </span>
                      </h3>
                    </div>
                    <div className="req-info">
                      <div className="row">
                        <div className="col-12">
                          <div className="req-data">
                            <h4>Message</h4>
                            <p>{contact.comment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <div className="req-data">
                            <h4>Interested In</h4>
                            <p>{contact.Interestedin}</p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="req-data">
                            <h4>Date</h4>
                            <p>{contact.contactus_date}</p>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="req-data">
                            <h4>Status</h4>
                            <p>{contact.status == "1" ? "Active" : "Close"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(() => {
                  if (!contact_list.length) {
                    return (
                      <div className="not-found">
                        <div className="not-found-message text-center">
                          <p>
                            No request yet. <br />
                            Please <Link to="/contact-us">click here</Link> to
                            initiate a new request
                          </p>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserContactusScreen;
