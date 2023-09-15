import axios from "axios";

import { Link,  useParams } from "react-router-dom";
const Todos = (props) => {
  // Define a function to format the date string
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
  return `${year}-${month}-${day}`;
}

    const {projectId}= useParams();
  return (
    <>
      {
        <>
          <body>
            <div className="container py-4 py-xl-5">
              <div className="row mb-5">
                
                     <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <h2>Project todos</h2>
                    <p className="w-lg-50">
                      a list with all  the todos that the admin created
                    </p>
                  </div> 
                
                
              </div>
              <div className="col">
                {
                    props.project.admin._id === props.userinfo._id ? <>
                        <div className="card bg-primary text-white text-center p-4">
                  <div className="card-body p-4">
                    <h4 className="card-title">Create Todo</h4>
                    <p className="card-text">
                      create todo, invite user. start tracking it.
                    </p>
                    <button className="btn btn-light" type="button">
                      <Link to={`/projects/${projectId}/createTodo`}>create</Link>{" "}
                    </button>
                  </div>
                </div>
                    </> : <></>
                }
                
              </div>
              <hr
                style={{
                  color: "transparent",
                }}
              />
              {props.todos.map((todo) => {
                console.log(todo.user)
                return (
                  <>
                    <div className="col">
                      <div className="card">
                        <div className="card-body p-4">
                          <h4 className="card-title">{todo.name} <p style={{
                                display:"inline",
                                color : todo.status === "finished" ? "green" : "red"
                          }}>({todo.status})</p></h4>
                          <p className="card-text">{todo.description}</p>
                          <p className="card-text 
                            text-primary
                          ">{`${formatDate(todo.start)} - ${formatDate(todo.end)}`}</p>
                          <div className="col-md-7" key={''}>
                <div className="p-4">
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" 
                src={`http://127.0.0.1:3000/imgs/users/profile/${todo.user.profile}`}
                    />
                        <div>
                            <p className="fw-bold mb-0">{todo.user.userName}</p>
                            <p className="text-muted mb-0">{todo.user._id===props.userinfo._id ? "memeber | you" : "memeber"}</p>
                            </div>
                            
        </div>
                          </div>
                    </div>
                    {todo.user._id===props.userinfo._id  ? <button
                            className="btn btn-warning 
                        mx-2"
                            type="button"
                          >
                            <Link to={`/projects/${projectId}/updateTodoOwner/${todo._id}`}>
                              update Status
                            </Link>{" "}
                          </button> : <>
                          {
                            props.project.admin._id === props.userinfo._id ? <button
                            className="btn btn-warning 
                        mx-2"
                            type="button"
                          >
                            <Link to={`/projects/${projectId}/updateTodo/${todo._id}`}>
                              update 
                            </Link>{" "}
                          </button> :null 
                          }
                          </>}
                          
                          {
                            props.project.admin._id === props.userinfo._id ?<button className="btn btn-danger" type="button">
                            <Link to={`/projects/${projectId}/deleteTodo/${todo._id}`}>
                              delete
                            </Link>
                          </button> :null 
                          }
                          
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
      }
    </>
  );
};
export default Todos;
