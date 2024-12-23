import { useCallback, useState, useEffect, useMemo } from "react";
import { axios } from "../../utilities/axios";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import moment from "moment/moment";
import { MAP_STATUS } from "../../utils";

const SelectJobRole = ({ setStepper, setJobId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setJobId(null);
  }, []);
  let [formData, setFormData] = useState({
    location: undefined,
    department: undefined,
  });
  let [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  let table_data = useMemo(() => {
    let data = jobs.map((job) => {
      return {
        ID: job.id,
        REQUISITION_DATE: moment(new Date(job.requisition_date)).format(
          "DD-MM-YYYY",
        ),
        DEPARTMENT: job.department,
        DESIGNATION: job.designation,
        POSITION: job.position,
        LOCATION: job.location,
        STATUS: MAP_STATUS[job.status],
        TYPE: job.type,
        PRIORITY: job.priority,
        EXP_REQ: job.exp,
        ACTION: (
          <button
            type="button"
            className="sl-btn sb-btn"
            onClick={() => {
              console.log("Job is", job.id);
              setStepper(1);
              setJobId(job.id);
            }}
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            EDIT
          </button>
        ),
      };
    });
    return data;
  }, [jobs]);

  const getJobsData = useCallback(async (e) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_URL_API}/api/v1/requisition/selection-data?department=${formData.department ? formData.department : ""}&id=${""}&location=${formData.location ? formData.location : ""}`;
    try {
      const result = await axios.get(url);
      if (result.data.success) {
        setJobs(result.data.data);
      }
    } catch (err) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getJobsData();
  }, []);

  const table_meta = {
    columns: [
      {
        label: "ID",
        field: "ID",
        sort: "asc",
        width: 5,
      },
      {
        label: "REQUISITION DATE",
        field: "REQUISITION_DATE",
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
      {
        label: "DEPARTMENT",
        field: "DEPARTMENT",
        sort: "asc",
        width: 100,
      },
      {
        label: "LOCATION",
        field: "LOCATION",
        sort: "asc",
        width: 100,
      },
      {
        label: "STATUS",
        field: "STATUS",
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
  };

  return (
    <>
      {" "}
      <div className="career-portal-container">
        <div className="career-card-container">
          <div style={{ textAlign: "right" }}>
            <button
              style={{
                padding: "5px 10px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "5px",
              }}
              onClick={() => setStepper(1)}
            >
              + New Job
            </button>
          </div>
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
  );
};

export default SelectJobRole;
