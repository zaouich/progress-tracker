import axios from "axios"
import { useEffect, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import { toast , ToastContainer } from "react-toastify"
import Loading from "./Loading"

const DeleteProject = (props)=>{
    const {projectId} = useParams()
    const [password, setPassword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(! props.userinfo) {
            return  navigate("/login")
    
        }
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}`,{withCredentials: true}).then(()=>{
            setLoaded(true)

        }).catch((err)=>{
            if(err.response.data.message=="no project for you found by that id"){
                window.location.href = "/404"
            }
        })
   },[])
   
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.delete(`http://127.0.0.1:3000/api/v1/projects/${projectId}`,{withCredentials: true, data : {password}}
        ).then(()=>{
            toast.success("project deleted successfully")
            setLoaded(true)
            setTimeout(()=>{
                window.location.href = "/"
            }, 2000)
        }).catch((err)=>{
            toast.error(err.response.data.message)
            setLoaded(true)
        })
    }
   
    return <>
    <ToastContainer/>
    {
        loaded ? <>
            <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Delete Project</h2>
                <p className="w-lg-50">are you sure you want to delete the project ?</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form 
                        onSubmit={(e)=>handleSubmit(e)}
                        className="text-center" method="post">
                            <div className="mb-3"></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Project's Password" 
                            onChange={
                                (e)=>{
                                    setPassword(e.target.value)
                                }
                            }
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Delete</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        </> : <Loading/>
    }
    </>
}
export default DeleteProject    