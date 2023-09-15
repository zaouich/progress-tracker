import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";

const UpdateTodoStatus = (props) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [todo, setTodo] = useState({ status: "" });
  const [status, setStatus] = useState("");
  const { projectId, todoId } = useParams();
  useEffect(() => {
    if (!props.userinfo) return navigate("/login");
    axios
      .get(
        `http://127.0.0.1:3000/api/v1/projects/${projectId}/todos/${todoId}/owner`,{withCredentials: true}
      )
      .then((res) => {
        setTodo({
          status: res.data.todo.status,
        });
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.response)
        if (err.response.status === 404) return navigate("/not-found");
        toast.error(err.response.data.message);
      });
  }, []);
  useEffect(() => {
    setStatus(todo.status);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://127.0.0.1:3000/api/v1/projects/${projectId}/todos/${todoId}/`,{status},{withCredentials: true}).then(()=>{
            toast.success("todo status updated successfully")}).catch((err)=>toast.error(err.response.data.message))
            setTimeout(()=>navigate(`/projects/${projectId}`),2000)    
  };
  return (
    <>
    <ToastContainer/>
      {loaded ? (
        <>
          <section className="position-relative py-4 py-xl-5">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Update Status</h2>
                  <p className="w-lg-50">Lets update the todo status</p>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                  <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                      <form className="text-center" method="post" onSubmit={
                        (e)=>{
                          e.preventDefault();
                          handleSubmit(e);
                        }

                      }>
                        <div className="mb-3">
                          <select className="form-select"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                              <option
                                value="not started"
                                selected={
                                  status == "not started" ? true : false
                                }
                              >
                                not started
                              </option>
                              <option
                                value="started"
                                selected={status == "started" ? true : false}
                              >
                                started
                              </option>
                              <option
                                value="finished"
                                selected={status == "finished" ? true : false}
                              >
                                finished
                              </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary d-block w-100"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UpdateTodoStatus;