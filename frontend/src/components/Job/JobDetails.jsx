import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [singleJob, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.singleJob);
        console.log(res.data.singleJob);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {singleJob.title}</span>
          </p>
          <p>
            Category: <span>{singleJob.category}</span>
          </p>
          <p>
            Country: <span>{singleJob.country}</span>
          </p>
          <p>
            City: <span>{singleJob.city}</span>
          </p>
          <p>
            Location: <span>{singleJob.location}</span>
          </p>
          <p>
            Description: <span>{singleJob.description}</span>
          </p>
          <p>
            Job Posted On: <span>{singleJob.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {singleJob.fixedSalary ? (
              <span>{singleJob.fixedSalary}</span>
            ) : (
              <span>
                {singleJob.salaryFrom} - {singleJob.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${singleJob._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
