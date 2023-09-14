import axios from "axios";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const JoinProjects = (props) => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!props.userinfo) {
      navigate("/login");
    }
    axios
      .get("http://127.0.0.1:3000/api/v1/memberShips/", {
        withCredentials: true,
      })
      .then((res) => {
        setProjects(res.data.memberShips);
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded ? (
        <>
          <body>
            <div className="container py-4 py-xl-5">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Your Joined Projects</h2>
                  <p className="w-lg-50">
                    a list with all all the joined projects  that you have
                    created
                  </p>
                </div>
              </div>
              <div className="col">
                <div
                  className="card
                bg-primary text-white text-center p-4"
                >
                  <div className="card-body p-4">
                    <h4 className="card-title">Join New Project</h4>
                    <p className="card-text">
                      Join project. start tracking your project.
                    </p>
                    <button className="btn btn-light" type="button">
                      <Link to="/joinProject">Join</Link>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  color: "transparent",
                }}
              />
              {projects.map((project) => {
                return (
                  <>
                    <div className="col">
                      <div className="card">
                        <div className="card-body p-4">
                          <h4 className="card-title">{project.project.name}</h4>
                          <p className="card-text">
                            {project.project.description}
                          </p>
                          <button className="btn btn-primary" type="button">
                            <Link to={`/projects/${project.project._id}`}>
                            enter
                              </Link>
                            
                          </button>
                          <button className="btn btn-danger mx-2" type="button">
                            <Link to={`/leaveProject/${project.project._id}`}>
                              leave
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr
                      style={{
                        color: "transparent",
                      }}
                    />
                  </>
                );
              })}
            </div>
          </body>
        </>
      ) : (
        <Loading/>
      )}
    </>
  );
};
export default JoinProjects;
