import axios from "axios";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Memebers from "./Memebers";
import Todos from "./Todos";

const Project =(props)=>{
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [project,setProject] = useState("");
    const [members,setMembers] = useState([]);
    const [mode,setMode]= useState("memebers");
    const [todos,setTodos] = useState([]);
    const [loaded ,setLoaded] = useState(false);
    useEffect(()=>{
        if(!props.userinfo)return navigate("/login");
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}/projectForMemebers/`,{withCredentials: true})
        .then(res=>{
            setMembers(res.data.project.memebers)
            setTodos(res.data.project.todos)
            setProject(res.data.project);
            console.log(res.data.project.memebers)
            setLoaded(true);
        }).catch(err=>{
            if(err.response.status === 404) return navigate("/not-found");
            toast.error(err.response.data.message);
        });
    },[])
    return <>
            {loaded  ? <>
              <div className="d-flex ">
  <button
    className={`${mode === "memebers" ? "btn btn-primary border-bottom" : "btn btn-primary"}`}
    onClick={()=>setMode("memebers")}
    type="button"
    style={{
      background: "var(--bs-btn-disabled-color)",
      color: "var(--bs-btn-active-border-color)",
      borderColor: "var(--bs-btn-disabled-color)"
    }}

  >
    memebers
  </button>
  <button
        className={`${mode === "progress" ? "btn btn-primary border-bottom" : "btn btn-primary"}`}
        onClick={()=>setMode("progress")}
    type="button"
    style={{
      background: "var(--bs-btn-disabled-color)",
      color: "var(--bs-btn-active-border-color)",
      borderColor: "var(--bs-btn-disabled-color)"
    }}
  >
    progress
  </button>
  <button
        className={`${mode === "todos" ? "btn btn-primary border-bottom" : "btn btn-primary"}`}
        onClick={()=>setMode("todos")}
    type="button"
    style={{
      background: "var(--bs-btn-disabled-color)",
      color: "var(--bs-btn-active-border-color)",
      borderColor: "var(--bs-btn-disabled-color)"
    }}
  >
    todos
  </button>
</div>

              {
                mode ==="memebers" ? <Memebers members={members} project={project} userinfo={props.userinfo}/> : <>
                  {
                    mode==="todos" ? <Todos project={project} userinfo={props.userinfo} todos={todos}/> : <></>
                  }
                </>
                }
              </>

            : <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
          
        }}
       >
       
       <Triangle
  height="200"
  width="200"
  color="#24285B"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperclassNameNameName=""
  visible={true}
/>
        </div>}
    
    </>
}   
export default Project;