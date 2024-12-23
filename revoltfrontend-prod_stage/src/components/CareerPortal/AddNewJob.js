import { useCallback, useState, useEffect, useRef } from "react";
import { axios } from "../../utilities/axios";
import { MAP_STATUS } from "../../utils";
import Editor from "./Editor";
import moment from "moment";

const TYPE = {
  "Full Time": "Full Time",
  "Part Time": "Part Time",
};

const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

const AddNewJob = ({ jobId, setStepper }) => {
  let [loading, setLoading] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [errors, setErrors] = useState({})
  let [dropdownData, setDropdownData] = useState({
    location: [],
    department: [],
  });
  const ref = useRef();
  let [formData, setFormData] = useState({
    id: jobId,
    short_text: "",
    location: "",
    qualification: "",
    exp: "",
    rnr: "",
    other: "",
    status: 1,
    type:"Full Time",
    priority:"MEDIUM"

  });

  const remainingCharacters = 40 - formData.short_text.length;

  //   const schema = Joi.object({
  //     short_text:Joi.string().required().messages({
  //         'string.empty':'Job description is a required field'
  //     }),
  //     location:Joi.string().required().messages({
  //         'string.empty':'Job location is a required field'
  //     })
  //   })

  const getDropdownData = useCallback(async () => {
    // debugger;
    setLoading(true);
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?department=&id=&location=&dropdown=true`;
    try {
      const result = await axios.get(url);
      if (result.data.success) {
        //////////////get jobs data//////////
        //getJobsData();
        /////////////////////////////
        setDropdownData({
          location: result.data.data.locations,
          department: result.data.data.departments,
        });
      }
    } catch (err) {
      setDropdownData({
        location: [],
        department: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target
    if(form.checkValidity()&&ref.current.value){
    console.log("Summmmmmmmmmmmittttttttttt", ref.current.value);
    //  const {error} = schema.validate(formData,{abortEarly:false})
    // if(error){
    //     console.log(error)
    // }
    await axios.post(
      `${process.env.REACT_APP_URL_API}/api/v1/requisition/add-selection`,
      {
        ...formData,
        short_txt: formData.short_text,
        rnr: ref.current.value,
        requisition_date: moment(new Date()).format("YYYY-MM-DD"),
      },
    );
    setShowSubmitted(true);
    setTimeout(() => {
      setStepper(0);
    }, 2000);
  }else{
    console.log("Error")
    let errorsList = {}
    let message = "is a required field"
    Array.from(form.elements).forEach((input) => {
      if (input.validity && !input.validity.valid) {
        // If the input is invalid, add its name to the error list
        errorsList[input.id] = `${input.id} ${message}`;
      }
    });
    if(!ref.current.value){
      errorsList["JD"] = `JD ${message}`
    }
    // console.log(arr)
    setErrors({...errorsList})

  }
  };

  const getJobsData = useCallback(async (e) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?id=${jobId}`;
    try {
      const result = await axios.get(url);
      if (result.data.success) {
        const {
          priority,
          short_text,
          location,
          qualifications,
          exp,
          rnr,
          status,
          department,
          designation,
          type,
        } = result.data.data[0];
        // console.log("dataaaaaaaaaaaaa ",result.data.data, location)
        setFormData({
          ...formData,
          id: jobId,
          short_txt: short_text,
          short_text: short_text,
          location: location,
          qualifications: qualifications,
          exp: exp,
          other: "",
          department: department,
          designation: designation,
          status: status,
          rnr: rnr,
          type: type,
          priority: priority,
        });
        //  ref.current.value = rnr
      }
    } catch (err) {
      // setFormData({})
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      getJobsData();
    }
  }, []);

  return (
    <>
      <div id="job" className="login-space-no">
        <section className="test-ride-page light-grey padding-top-100 padding-bottom-100">
          <div className="container">
            {/*  */}

            <form
              id="msforms"
              style={{ position: "relative" }}
              className="form newTest"
              onSubmit={handleSubmit}
              noValidate
            >
              <form onSubmit={() => setStepper(0)}>
                <div
                  className="testride_submit_wrapper form-default d-flex justify-content-end mt-4"
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: "999999",
                  }}
                >
                  <input
                    style={{ cursor: "pointer" }}
                    className="next action-button"
                    type="submit"
                    value="Cancel"
                  />
                </div>
              </form>
              <div className="form-bg">
                <div className="row" style={{ paddingBottom: "20px" }}>
                  <div className="col-12 text-center">
                    <h3 className="mt-1 mb-4">Add Job Post</h3>
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="Designation">Designation</label>
                      <span className="star">*</span>
                    </div>
                    <input
                      id="Designation"
                      type="text"
                      placeholder="Designation"
                      required
                      maxLength={40}
                      value={formData.designation}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          designation: e.target.value,
                        });
                      }}
                      className="form-control inputfield"
                    />
                    {errors["Designation"]?<span  className="error">{errors["Designation"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="Department">Department</label>
                      <span className="star">*</span>
                    </div>
                    <input
                      id="Department"
                      type="text"
                      placeholder="Department"
                      value={formData.department}
                      required
                      maxLength={40}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          department: e.target.value,
                        });
                      }}
                      className="form-control inputfield"
                    />
                  {errors["Department"]?<span  className="error">{errors["Department"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="Qualification">Qualification</label>
                      <span className="star">*</span>
                    </div>
                    <input
                      id="Qualification"
                      type="text"
                      placeholder="Qualification"
                      required
                      title="This is a required Field"
                      maxLength={40}
                      className="form-control inputfield"
                      value={formData.qualifications}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          qualifications: e.target.value,
                        });
                      }}
                    />
                  {errors["Qualification"]?<span className="error">{errors["Qualification"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="experience">Experience</label>
                      <span className="star">*</span>
                    </div>
                    <input
                      id="Experience"
                      type="text"
                      placeholder="Experience"
                      maxLength={40}
                      className="form-control inputfield"
                      required
                      value={formData.exp}
                      onChange={(e) => {
                        setFormData({ ...formData, exp: e.target.value });
                      }}
                    />
                     {errors["Experience"]?<span className="error">{errors["Experience"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="Location">Location</label>
                      <span className="star">*</span>
                    </div>
                    {/* <select
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
                    </select> */}
                    <input
                      id="Location"
                      type="text"
                      placeholder="Location"
                      maxLength={40}
                      className="form-control inputfield"
                      required
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                      }}
                    />
                     {errors["Location"]?<span className="error">{errors["Location"]}</span>:null}
                  </div>
                  {/* <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="status">Other</label>
                      <span className="star">*</span>
                    </div>
                    <input
                      id="Other"
                      type="text"
                      placeholder="Other"
                      maxLength={40}
                      className="form-control inputfield"
                      required
                      onChange={(e) => {
                        setFormData({ ...formData, other: e.target.value })
                      }}
                    />
                  </div> */}
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="Type">Type</label>
                      <span className="star">*</span>
                    </div>
                    <select
                      id="Type"
                      className="form-control"
                      placeholder="Type"
                      required
                      value={formData.type}
                      onChange={(e) => {
                        setFormData({ ...formData, type: e.target.value });
                      }}
                    >
                      {Object.values(TYPE).map((value, key) => {
                        return (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                    {errors["Type"]?<span className="error">{errors["Type"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="status">Status</label>
                      <span className="star">*</span>
                    </div>
                    <select
                      id="Status"
                      placeholder="STATUS"
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => {
                        setFormData({ ...formData, status: e.target.value });
                      }}
                    >
                      {/* <option value={0}>Select Status</option> */}
                      <option value={1} key="1">
                        {MAP_STATUS[1]}
                      </option>
                      <option value={0} key="2">
                        {MAP_STATUS[0]}
                      </option>
                    </select>
                    {errors["Status"]?<span className="error">{errors["Status"]}</span>:null}
                  </div>
                  <div className="form-group col-md-4 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="status">Priority</label>
                      <span className="star">*</span>
                    </div>
                    <select
                      id="Priority"
                      placeholder="Priority"
                      className="form-control"
                      value={formData.priority}
                      onChange={(e) => {
                        setFormData({ ...formData, priority: e.target.value });
                      }}
                    >
                      {Object.values(PRIORITY).map((value, key) => {
                        return (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                    {errors["Priority"]?<span className="error">{errors["Priority"]}</span>:null}
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{ position: "relative" }}
                    className="form-group col-md-12 name-group"
                  >
                    <div className="palceholder-text">
                      <label htmlFor="status">Short Description</label>
                      <span className="star">*</span>
                    </div>
                    <textarea
                      id="Short_Description"
                      type="text"
                      rows={2}
                      placeholder="Short Description"
                      minLength={40}
                      className="form-control inputfield"
                      required
                      style={{ outline: "none" }}
                      value={formData.short_txt}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          short_text: e.target.value,
                          short_txt: e.target.value,
                        });
                      }}
                    />
                    {remainingCharacters > 0 && remainingCharacters < 40 ? (
                      <p
                        style={{
                          color: "red",
                          fontSize: "11px",
                          textAlign: "right",
                          position: "absolute",
                          right: "10px",
                        }}
                      >
                        {remainingCharacters} characters remaining{" "}
                      </p>
                    ) : errors["Short_Description"]?<span className="error">{errors["Short_Description"]}</span>:null}
                  </div>
                  <div className="form-group col-md-12 name-group">
                    <div className="palceholder-text">
                      <label htmlFor="status">Job Description</label>
                      <span className="star">*</span>
                    </div>
                    <Editor value={formData.rnr} ref={ref} />
                    {errors["JD"]?<span className="error">{errors["JD"]}</span>:null}
                  </div>
                  <div
                    className="testride_submit_wrapper form-default d-flex justify-content-center mt-4"
                    style={{ justifyContent: "center", width: "100%" }}
                  >
                    <input className="next action-button" type="submit" />
                  </div>
                </div>
              </div>
            </form>
            {showSubmitted ? (
              <div className="thank-you-modal">
                <div id="myModal" class="modal" style={{ display: "block" }}>
                  <div class="modal-content">
                    <span
                      class="close"
                      onClick={(e) => {
                        setShowSubmitted(false);
                      }}
                    >
                      &times;
                    </span>
                    <p className="title">
                      Job Update has been Successfully Submitted.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default AddNewJob;
