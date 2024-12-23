import { useState } from "react";
import AddNewJob from "../components/CareerPortal/AddNewJob";
import SelectJobRole from "../components/CareerPortal/SelectJobRole";

const AddJob = () => {
  const [stepper, setStepper] = useState(0);
  const [jobId, setJobId] = useState(null);
  const fillForm = () => {
    if (stepper == 0) {
      return <SelectJobRole setStepper={setStepper} setJobId={setJobId} />;
    }
    if (stepper == 1) {
      return <AddNewJob jobId={jobId} setStepper={setStepper} />;
    }
  };
  return <>
  {JSON.parse(localStorage.getItem("userInfo"))?.user_type == "hr" ? 
fillForm():<>
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
  }</>;
};

export default AddJob;
