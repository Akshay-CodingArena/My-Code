import { useCallback, useState, useEffect, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { axios } from "../utilities/axios"
import { MAP_STATUS } from "../utils"
import moment from "moment"
import { MDBDataTable } from "mdbreact"
import { numberFormatPrice } from "../utilities/utilities"

const TYPE = {
  "Full Time": "Full Time",
  "Part Time": "Part Time",
}

const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
}

const ApplicantDetails = () => {
  const navigate = useNavigate()
  let [candidatesList, setCandidatesList] = useState([])
  const [loading, setLoading] = useState(false)
  let table_data = useMemo(() => {
    let data = candidatesList.map((candidate) => {
      return {
        ID: candidate.id,
        APPLIED_DATE: moment(new Date(candidate.created_at)).format(
          "DD-MM-YYYY"
        ),
        DESIGNATION: candidate.designation,
        NAME: candidate.name,
        EMAIL: candidate.email_id,
        MOBILE: candidate.mobile_number,
        EXP: candidate.work_experience,
        CURRENT_CTC: numberFormatPrice(candidate.current_ctc),
        EXPECTED_CTC: numberFormatPrice(candidate.expected_ctc),
        ACTION: (
          <button
            type="button"
            className="sl-btn sb-btn"
            onClick={async () => {
              const { data } = await axios.get(
                `${process.env.REACT_APP_URL_API}/api/v1/requisition/candidate/details/${candidate.id}`
              )
              window.open(data.data[0].signed_url, "_blank")
            }}
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Resume
          </button>
        ),
      }
    })
    return data
  }, [candidatesList])

  const getCandidatesData = useCallback(async (e) => {
    setLoading(true)
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/candidate/details`
    try {
      const result = await axios.get(url)
      if (result.data.success) {
        setCandidatesList(result.data.data)
      }
    } catch (err) {
      setCandidatesList([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getCandidatesData()
  }, [])

  const table_meta = {
    columns: [
      {
        label: "ID",
        field: "ID",
        sort: "asc",
        width: 5,
      },
      {
        label: "APPLIED_DATE",
        field: "APPLIED_DATE",
        sort: "asc",
        width: 100,
      },
      // {
      //   label: "POSITION",
      //   field: "POSITION",
      //   sort: "asc",
      //   width: 100,
      // },
      {
        label: "DESIGNATION",
        field: "DESIGNATION",
        sort: "asc",
        width: 100,
      },
      // {
      //   label: "DEPARTMENT",
      //   field: "DEPARTMENT",
      //   sort: "asc",
      //   width: 100,
      // },
      {
        label: "NAME",
        field: "NAME",
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
        label: "MOBILE",
        field: "MOBILE",
        sort: "asc",
        width: 100,
      },
      {
        label: "EXPERIENCE",
        field: "EXP",
        sort: "asc",
        width: 100,
      },
      {
        label: "CURRENT_CTC",
        field: "CURRENT_CTC",
        sort: "asc",
        width: 100,
      },
      {
        label: "EXPECTED_CTC",
        field: "EXPECTED_CTC",
        sort: "asc",
        width: 100,
      },
      {
        label: "ACTION",
        field: "ACTION",
        sort: "asc",
        width: 100,
      },
    ],
    rows: table_data,
  }

  //   const getJobsData = async (e) => {
  //     setLoading(true);
  //     let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?department=${formData.department ? formData.department : ""}&id=${""}&location=${formData.location ? formData.location : ""}`;
  //     try {
  //       const result = await Axios.get(url);
  //       if (result.data.success) {
  //         setJobs(result.data.data);
  //       }
  //     } catch (err) {
  //       setJobs([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const onSubmitHandle = (e) => {
    // getJobsData();
    e.preventDefault()
  }
  return (
    <>
      {" "}
      {/* <form onSubmit={onSubmitHandle}>
          <div className="form-default mt-3">
            <div className="row">
              <div className="form-group col-md-4">
                <select
                  id="department"
                  className="form-control"
                  placeholder="Select Deapartment"
                  required
                  value={formData.department}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      department: e.target.value.replace("&", "%26"),
                    });
                  }}
                >
                  <option value={undefined}>Select Deapartment</option>
                  {dropdownData.department?.map((value, key) => {
                    if(value){
                    return (
                      <option value={value.replace("&", "%26")} key={key}>
                        {value}
                      </option>
                    )
                  } else{
                    return null
                  }
                  })}
                </select>
              </div>

              <div className="form-group col-md-4">
                <select
                  id="location"
                  className="form-control"
                  placeholder="Location"
                  required
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                  }}
                >
                  <option value={undefined}>Select Location</option>
                  {dropdownData.location.map((value, key) => {
                    return (
                      <option value={value} key={key}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group submit-btn-container col-md-4">
                <button type="submit" className="submit-button">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </form> */}
      {JSON.parse(localStorage.getItem("userInfo"))?.user_type == "hr" ? (
        <>
          <h3 className="mt-4" style={{ textAlign: "center" }}>
            Applicant Details
          </h3>
          <div className="career-portal-container">
            <div className="career-card-container">
              <div className="row">
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
        </>
      ) : (
        <>
          <div className="light-grey admin-page padding-top-100 padding-bottom-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="box-table-panel">
                    <div className="top-profile">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <h3 className="tab-title">Not a valid user</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ApplicantDetails
