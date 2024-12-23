import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Loader from "../components/Loader";
import OtpTimer from "otp-timer";
import { axios } from "../utilities/axios";

const TOTAL_YEARS_OF_EXPERIENCE_DROPDOWN = [
  {
    label: "0 Years",
    value: "0 Years",
  },
  {
    label: "1 Years",
    value: "1 Years",
  },
  {
    label: "2 Years",
    value: "2 Years",
  },
  {
    label: "3 Years",
    value: "3 Years",
  },
  {
    label: "4 Years",
    value: "4 Years",
  },
  {
    label: "5 Years",
    value: "5 Years",
  },
  {
    label: "6 Years",
    value: "6 Years",
  },
  {
    label: "7 Years",
    value: "7 Years",
  },
  {
    label: "8 Years",
    value: "8 Years",
  },
  {
    label: "9 Years",
    value: "9 Years",
  },
  {
    label: "10 Years",
    value: "10 Years",
  },
  {
    label: "11 Years",
    value: "11 Years",
  },
  {
    label: "12 Years",
    value: "12 Years",
  },
  {
    label: "13 Years",
    value: "13 Years",
  },
  {
    label: "14 Years",
    value: "14 Years",
  },
  {
    label: "15 Years",
    value: "15 Years",
  },
  {
    label: "16 Years",
    value: "16 Years",
  },
  {
    label: "17 Years",
    value: "17 Years",
  },
  {
    label: "18 Years",
    value: "18 Years",
  },
  {
    label: "19 Years",
    value: "19 Years",
  },
  {
    label: "20 Years",
    value: "20 Years",
  },
  {
    label: "21 Years",
    value: "21 Years",
  },
  {
    label: "22 Years",
    value: "22 Years",
  },
  {
    label: "23 Years",
    value: "23 Years",
  },
  {
    label: "24 Years",
    value: "24 Years",
  },
  {
    label: "25 Years",
    value: "25 Years",
  },
  {
    label: "26 Years",
    value: "26 Years",
  },
  {
    label: "27 Years",
    value: "27 Years",
  },
  {
    label: "28 Years",
    value: "28 Years",
  },
  {
    label: "29 Years",
    value: "29 Years",
  },
  {
    label: "30 Years",
    value: "30 Years",
  },
  {
    label: "30+ Years",
    value: "30+ Years",
  },
];

const NOTICE_PERIOD_DROPDOWN = [
  {
    label: "0-15 Days",
    value: "0-15 Days",
  },
  {
    label: "1 Month",
    value: "1 Month",
  },
  {
    label: "2 Months",
    value: "2 Months",
  },
  {
    label: "3 Months",
    value: "3 Months",
  },
];

const HIGHEST_QUALIFICATION_DROPDOWN = [
  {
    label: "High School Diploma / GED",
    value: "High School Diploma / GED",
  },
  {
    label: "Associate Degree",
    value: "Associate Degree",
  },
  {
    label: "Master's Degree",
    value: "Master's Degree",
  },
  {
    label: "Doctoral Degree (PhD, EdD, etc.)",
    value: "Doctoral Degree (PhD, EdD, etc.)",
  },
  {
    label: "Professional Degree (MD, JD, etc.)",
    value: "Professional Degree (MD, JD, etc.)",
  },
  {
    label: "Postdoctoral Research",
    value: "Postdoctoral Research",
  },
];

const QUALIFICATION_TYPE_DROPDOWN = [
  {
    label: "Full Time",
    value: "Full Time",
  },
  {
    label: "Part Time",
    value: "Part Time",
  },
];
const JobDetails = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();

  ////////////////////////////////
  // let data = location.state.data;
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [data, setJob] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  let [formData, setFormData] = useState({
    mobile: "",
    email: "",
    name: "",
    work_experience: "",
    highest_qualification: "",
    qualification_type: "",
    work_location: "",
    company_name: "",
    notice_period: "",
    current_ctc: "",
    expected_ctc: "",
    file: "",
    otp: "",
    checkBox: false
  });

  const [otpbtn, setOtpbtn] = useState(true);

  const applyNow = async () => {
    const payloadFormData = new FormData();

    payloadFormData.append("name", formData.name);
    payloadFormData.append("email_id", formData.email);
    payloadFormData.append("mobile_number", formData.mobile);
    payloadFormData.append("work_experience", formData.work_experience);
    payloadFormData.append("file", formData.file);
    payloadFormData.append(
      "highest_qualification",
      formData.highest_qualification,
    );
    payloadFormData.append("qualification_type", formData.qualification_type);
    payloadFormData.append("current_company", formData.company_name);
    payloadFormData.append("work_location", formData.work_location);
    payloadFormData.append("notice_period", formData.notice_period);
    payloadFormData.append("current_ctc", formData.current_ctc);
    payloadFormData.append("expected_ctc", formData.expected_ctc);
    payloadFormData.append("job_id", data[0].id);

    setLoading(true);

    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/candidate/details`;

    try {
      const response = await Axios.post(url, payloadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setFormData({
          mobile: "",
          email: "",
          name: "",
          work_experience: "",
          file: "",
        });
        setShowThankYou(true);
        // setTimeout(() => {
        //   navigate("/career-with-us");
        // }, 2000);
      } else {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFile = (e) => {
    setFormData({ ...formData, file: e.target.files[0] })
  };
  const handleCloseThankYou = () => {
    navigate("/");
  };

  const checkOTP = async () => {
    let mobile_no = formData.mobile;
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";

    if (
      mobile_no === "" ||
      mobile_no === null ||
      mobile_no.length != 10 ||
      mobile_no[0] < 6
    ) {
      message.style.color = badColor;
      message.innerHTML = "Please Enter Valid Mobile Number.";
    } else {
      setLoading(true);

      try {
        const result = await Axios.post(
          `${process.env.REACT_APP_URL_API}/api/v1/auth/sendotp`,
          {
            mobile: formData.mobile,
            email: formData.email,
          },
        );
        if (result.data.status) {
          setOtpbtn(false);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // applyNow();
    var message = document.getElementById("message");
    var goodColor = "#0C6";
    var badColor = "#ed1c24";
    //verfit otp

    try {
      setLoading(true);

      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL_API}/api/v1/auth/verifyotp`,
        {
          mobile: formData.mobile,
          otp: formData.otp,
          headers: { Authorization: process.env.REACT_APP_API_KEY },
        },
      );

      if (data.status === true) {
        setErrorMessage("");
        applyNow();
      } else {
        setErrorMessage("Please Enter Valid OTP.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getJobsData = useCallback(async (e) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?id=${id}`;
    try {
      const result = await axios.get(url);
      if (result.data.success) {
        setJob(result.data.data);
        // console.log("My data",result.data.data)
      }
    } catch (err) {
      setJob([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getJobsData();
  }, []);

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <div className="jd-container">
        <h3>{data?.[0]?.designation}</h3>
        <h6>Job description:</h6>
        <div
          className="jd-text"
          dangerouslySetInnerHTML={{ __html: data[0]?.rnr }}
        ></div>
        {/* <button
          type="button"
          onClick={handleShow}
          className="submitBtn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Apply Now
        </button> */}

        {/* <!-- Modal --> */}

        <div className="row">
          <h3 style={{ textAlign: "center" }}>Candidate Details</h3>
          <form onSubmit={submitHandler}>
            <div className="form-default mt-3">
              <div className="row careerApplyForm">
                <div className="form-group col-md-3 name-group">
                  <div className="palceholder">
                    <label>User Name</label>
                    <span className="star">*</span>
                  </div>
                  <input
                    type="text"
                    className="form-control inputfield"
                    id="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    maxLength={40}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onInput={(e) =>
                    (e.target.value = e.target.value.replace(
                      /([^a-z 0-9]+)/gi,
                      "",
                    ))
                    }
                  ></input>
                </div>
                <div className="form-group col-md-3 name-group">
                  <div className="palceholder">
                    <label>Mobile </label>
                    <span className="star">*</span>
                  </div>

                  <input
                    type="text"
                    id="mobile"
                    className="form-control inputfield"
                    placeholder="Mobile"
                    value={formData.mobile}
                    minLength="10"
                    maxLength="10"
                    pattern="[6-9]{1,1}[0-9]{9,9}"
                    title="Please enter a valid mobile number"
                    onInput={(e) => {
                      let value = e.target.value;
                      e.target.value = e.target.value.slice(0, 10);
                      if (/[A-Za-z]/.test(value)) {
                        e.target.value = formData.mobile;
                      }
                    }}
                    required
                    onChange={(e) => {
                      if (
                        !e.target.value ||
                        parseInt(e.target.value[e.target.value.length - 1]) > -1
                      ) {
                        setFormData({ ...formData, mobile: e.target.value });
                      }
                    }}
                  ></input>
                </div>

                <div className="form-group col-md-3 email-group">
                  <div className="palceholder">
                    <label>Email </label>
                    <span className="star">*</span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    pattern="^[A-Za-z]{1,1}[A-Za-z0-9]{0,}(?!.*\.\.)[_.A-Za-z0-9]{1,}[a-zA-Z0-9]{1,1}@[A-Za-z]{1,}\.([a-zA-Z]{2,})(\.([a-zA-Z]{2,})){0,1}$"
                    title="Please enter a valid email address"
                    className="form-control inputfield"
                    placeholder="Email"
                    required
                    value={formData.email}
                    maxLength={50}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onInput={(e) => {
                      let value = e.target.value;
                      let length = value.length;
                      if (value[length - 1] == "\\") {
                        e.target.value = value.slice(0, length - 1);
                      }
                    }}
                  ></input>
                </div>

                <div className="form-group col-md-3">
                  <select
                    id="highest qualification"
                    className="form-control"
                    placeholder="Select Highest Qualification"
                    required
                    value={formData.highest_qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        highest_qualification: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Highest Qualification</option>
                    {HIGHEST_QUALIFICATION_DROPDOWN.map((data, key) => {
                      return (
                        <option value={data.value} key={key}>
                          {data.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <select
                    id="highest qualification"
                    className="form-control"
                    placeholder="Select Highest Qualification"
                    required
                    value={formData.qualification_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification_type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Qualification Type</option>
                    {QUALIFICATION_TYPE_DROPDOWN.map((data, key) => {
                      return (
                        <option value={data.value} key={key}>
                          {data.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <select
                    id="work experience"
                    className="form-control"
                    placeholder="Select Work Experience"
                    required
                    value={formData.work_experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        work_experience: e.target.value,
                      })
                    }
                  >
                    <option value="">Total Years of Experience</option>
                    {TOTAL_YEARS_OF_EXPERIENCE_DROPDOWN.map((data, key) => {
                      return (
                        <option value={data.value} key={key}>
                          {data.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-md-3 name-group">
                  <div className="palceholder">
                    <label>Current Company Name</label>
                    <span className="star">*</span>
                  </div>
                  <input
                    type="text"
                    className="form-control inputfield"
                    id="company name"
                    placeholder="Current Company Name"
                    required
                    value={formData.company_name}
                    maxLength={40}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    onInput={(e) =>
                    (e.target.value = e.target.value.replace(
                      /([^a-z 0-9]+)/gi,
                      "",
                    ))
                    }
                  ></input>
                </div>

                <div className="form-group col-md-3 name-group">
                  <div className="palceholder">
                    <label>Work Location</label>
                    <span className="star">*</span>
                  </div>
                  <input
                    type="text"
                    className="form-control inputfield"
                    id="work location"
                    placeholder="Current Work Location"
                    required
                    value={formData.work_location}
                    maxLength={40}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        work_location: e.target.value,
                      })
                    }
                    onInput={(e) =>
                    (e.target.value = e.target.value.replace(
                      /([^a-z 0-9]+)/gi,
                      "",
                    ))
                    }
                  ></input>
                </div>

                <div className="form-group col-md-3">
                  <select
                    id="notice period"
                    className="form-control"
                    placeholder="Notice Period"
                    required
                    value={formData.notice_period}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notice_period: e.target.value,
                      })
                    }
                  >
                    <option value="">Notice Period</option>
                    {NOTICE_PERIOD_DROPDOWN.map((data, key) => {
                      return (
                        <option value={data.value} key={key}>
                          {data.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <div className="palceholder">
                    <label>Current CTC</label>
                    <span className="star">*</span>
                  </div>

                  <input
                    type="text"
                    id="current_ctc"
                    className="form-control inputfield"
                    placeholder="Current CTC"
                    value={formData.current_ctc}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        current_ctc: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                    required
                  ></input>
                </div>

                <div className="form-group col-md-3">
                  <div className="palceholder">
                    <label>Expected CTC</label>
                    <span className="star">*</span>
                  </div>

                  <input
                    type="text"
                    id="expected_ctc"
                    className="form-control inputfield"
                    placeholder="Expected CTC"
                    value={formData.expected_ctc}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        expected_ctc: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                    required
                  ></input>
                </div>

                <div className="form-group col-md-12">
                  <input
                    type="file"
                    id="file"
                    onChange={handleChangeFile}
                    accept="application/pdf"
                    required
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="file" style={{ cursor: 'pointer', border: '1px solid black', padding: '4px 6px'}}>
                    Upload Resume
                  </label>
                </div>
                <div className="col-12">
                  <input id="check" style={{ cursor: "pointer" }} value={formData.checkBox} onChange={(e) => {
                    if (e.target.value) {
                      setFormData({ ...formData, checkBox: e.target.value })
                    }
                  }} type="checkbox"></input>

                  <label style={{ display: "inline", cursor: "pointer" }} htmlFor="check">Disclaimer : By signing this form or checking this box, you consent to our use of the information you provide to communicate with you via email, text messages, and calls. This may include details about our products or services as well as promotional and marketing updates. Your information will be securely handled and processed in accordance with our privacy policy.</label>

                </div>

                {!otpbtn ? (
                  <>
                    <div className="form-group col-md-12 mt-2">
                      <div className="palceholder">
                        <label>OTP </label>
                        <span className="star">*</span>
                      </div>

                      <input
                        type="text"
                        id="otp"
                        className="form-control inputfield"
                        placeholder="OTP"
                        pattern="^[0-9]{0,6}$"
                        value={formData.otp}
                        maxlength="6"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            otp: e.target.value.replace(/\D/g, ""),
                          });
                        }}
                        required
                      ></input>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="text-danger mb-3">{errorMessage}</div>

                {otpbtn ? (
                  <div className="form-group col-md-12">
                    <button
                      disabled={!(formData.mobile.length === 10 && formData.checkBox)}
                      onClick={checkOTP}
                      className="careerOtpButton"
                      type="button"
                      style={{
                        width: "200px",
                        cursor:
                          formData.mobile.length === 10
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      Send OTP
                    </button>
                  </div>
                ) : (
                  <div className="otp_wrapper">
                    <OtpTimer
                      seconds={60}
                      minutes={0}
                      resend={checkOTP}
                      text="Resend OTP After"
                    />
                  </div>
                )}

                {!otpbtn ? (
                  <div className="form-group col-md-12 mt-3">
                    <button style={{ width: "200px" }} type="submit" className="careerModalSubmitBtn">
                      Apply Now
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
        {showThankYou ? (
          <div className="thank-you-modal">
            <div
              id="myModal"
              class="modal"
              style={{ display: showThankYou ? "block" : "none" }}
            >
              <div class="modal-content">
                <span
                  class="close"
                  onClick={(e) => {
                    setShowThankYou(false);
                  }}
                >
                  &times;
                </span>
                <p className="title">
                  Thank you for your effort and interest in this opportunity. We
                  will be in touch with you soon regarding the next steps in the
                  hiring process.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default JobDetails;
