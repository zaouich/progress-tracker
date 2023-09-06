import axios from "axios"
import { useEffect, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"

const ProjectsAdmin = (props) => {
    const navigate = useNavigate()
    
    const [projects, setProjects] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if(! props.userinfo) {
              navigate("/login")
    
        }
        axios.get("http://127.0.0.1:3000/api/v1/projects/",{withCredentials: true}).then((res)=>{
            setProjects(res.data.data.projects)
            setLoaded(true)
        })

    }, [])
    return <>
    {
        loaded ? <>
        <body>
    <div className="container py-4 py-xl-5">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Your Projects</h2>
                <p className="w-lg-50">a list with all all the projects  that you have created</p>
            </div>
        </div>
        <div className="col">
                <div className="card
                bg-primary text-white text-center p-4
                ">
                    <div className="card-body p-4">
                        <h4 className="card-title">Create New Project</h4>
                        <p className="card-text">create project, invite users. start tracking your project.</p><button className="btn btn-light" type="button"><Link to="/createProject">create</Link> </button>
                    </div>
                </div>
            </div>
            <hr
            style={
                {
                    color:"transparent",
                }
            }
            />
        {
            projects.map((project)=>{
                return <>
                <div className="col" >
                <div className="card">
                    <div className="card-body p-4">
                        <h4 className="card-title">{project.name}</h4>
                        <p className="card-text">{project.description}</p><button className="btn btn-primary" type="button">enter</button><button className="btn btn-warning 
                        mx-2" type="button"><Link to={`/updateProject/${project._id}`}>update</Link> </button><button className="btn btn-danger" type="button" ><Link to={`/updateProjectPassword/${project._id}`}>delete</Link></button>
                        
                    </div>
                </div>
            </div><hr
            style={
                {
                    color:"transparent",
                }
            }
            />
                </>
                })
        }
            
            
        </div>
</body>
        </> :<div 
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
  wrapperClassName=""
  visible={true}
/>
        </div>
    }
        
    </>
}
export default ProjectsAdmin    