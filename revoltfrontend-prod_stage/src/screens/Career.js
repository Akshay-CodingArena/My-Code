import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import Loader from "../components/Loader"

const Career = () => {
  const navigate = useNavigate()

  let [loading, setLoading] = useState(false)
  let [dropdownData, setDropdownData] = useState({
    location: [],
    department: [],
  })

  let [formData, setFormData] = useState({
    location: undefined,
    department: undefined,
  })

  let [jobs, setJobs] = useState([])

  const getJobsData = async (e) => {
    setLoading(true)
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?department=${formData.department ? formData.department : ""}&id=${""}&location=${formData.location ? formData.location : ""}`
    try {
      const result = await Axios.get(url)
      if (result.data.success) {
        const allJobs = result.data.data
        let activeJobs = allJobs.filter((job)=>job.status==1)
        setJobs(activeJobs)
      }
    } catch (err) {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandle = (e) => {
    getJobsData()
    e.preventDefault()
  }

  const getDropdownData = async () => {
    debugger
    setLoading(true)
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?department=&id=&location=&dropdown=true`
    try {
      const result = await Axios.get(url)
      if (result.data.success) {
        //////////////get jobs data//////////
        getJobsData()
        /////////////////////////////
        setDropdownData({
          location: result.data.data.locations,
          department: result.data.data.departments,
        })
      }
    } catch (err) {
      setDropdownData({
        location: [],
        department: [],
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDropdownData()
  }, [])

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/images/newhomepage/BannersMobile/Careers_Banner_Phone.png"
        />
        <img
          // style={{
          //   postion: "absolute",
          //   top: "0px",
          //   left: "0px",
          // }}
          src="/images/newhomepage/BannersDesktop/Revolt_Career_Banner.png"
          loading="lazy"
          alt=""
        />
      </picture>
      {/* <img src="/images/newhomepage/BannersDesktop/Revolt_Career_Banner.png" /> */}
      <div className="career-portal-container" style={{ minHeight: "100vh" }}>
        {/* <div className="main-banner">
          <p className="banner-title">Looking for the new opportunities?</p>
          <p className="banner-sub-title">Browse our latest job options</p>
        </div> */}

        <form onSubmit={onSubmitHandle}>
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
                    })
                  }}>
                  <option value={undefined}>Select Deapartment</option>
                  {dropdownData.department?.map((value, key) => {
                    if (value) {
                      return (
                        <option value={value.replace("&", "%26")} key={key}>
                          {value}
                        </option>
                      )
                    } else {
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
                    setFormData({ ...formData, location: e.target.value })
                  }}>
                  <option value={undefined}>Select Location</option>
                  {dropdownData.location.map((value, key) => {
                    return (
                      <option value={value} key={key}>
                        {value}
                      </option>
                    )
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
        </form>

        <div className="career-card-container">
          <div className="row">
            {jobs.length ? (
              jobs.map((value, index) => {
                return (
                  <div className="col-md-4 mt-3">
                    <div
                      className="card"
                      onClick={() => {
                        navigate(`/career-with-us/job/${value.id}`)
                        navigate(`/career-with-us/job/${value.id}`, {
                          state: {
                            data: {
                              id: value.id,
                              position: value.designation,
                              department: value.department,
                              description: value.short_text,
                              responsibilities: value.rnr,
                            },
                          },
                        })
                      }}>
                      <p className="designation">{value.designation}</p>
                      <p className="department">{value.department}</p>
                      <p className="description">{value.short_text}</p>
                      <div className="location-section">
                        <span>{value.location}</span>
                        <span>{value.type}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-center">No Data Found</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Career
