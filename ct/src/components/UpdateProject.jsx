import axios from "axios"
import { useEffect, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast , ToastContainer } from "react-toastify"
import Loading from "./Loading"

const UpdateProject = (props)=>{
    const {projectId} = useParams()
    const [project, setProject] = useState({})
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(! props.userinfo) {
            navigate("/login")
      }
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}`,{withCredentials: true}).then((res)=>{
            setProject(res.data.project)
            setLoaded(true)

        }).catch((err)=>{
            if(err.response.data.message=="no project for you found by that id"){
                window.location.href = "/404"
            }
        })
   },[])
    useEffect(()=>{
        setName(project.name)
        setDescription(project.description)
    },[project])
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.patch(`http://127.0.0.1:3000/api/v1/projects/${projectId}`,{name, description},{withCredentials: true}).then((res)=>{
            toast.success("project updated successfully")
            setTimeout(()=>{
                window.location.href = "/"
            }, 2000)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
   
    return <>
    <ToastContainer/>
    {
        loaded ? <>
            <div className="container">
    <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>update Project</h2>
            <p className="w-lg-50">lets update the name and the description </p>
        </div>
    </div>
    <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-xl-4">
            <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                    <form className="text-center" method="post" 
                    onSubmit={(e)=>handleSubmit(e)}
                    >
                        <div className="mb-3"><input className="form-control" type="text" name="name" placeholder="Name" value={name} 
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                        /></div>
                        <div className="mb-3"><input className="form-control" type="description" name="description" placeholder="Description" value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value)
                        }}
                        /></div>
                        <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Update</button></div>
                        <p className="text-muted"><Link to={`/updateProjectPassword/${projectId}`}>you wanna update the password ?</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
        </> : <Loading/>
    }
    </>
}
export default UpdateProject    