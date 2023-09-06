import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const LeaveProject = (props)=>{
    const {projectId} = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    useEffect(()=>{
        if(! props.userinfo) {
            return  navigate("/login")
        }
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.delete(`http://127.0.0.1:3000/api/v1/projects/${projectId}/memeberShips/`,{withCredentials: true, data : {password}}).then(()=>{
            toast.success("project left successfully")
            setTimeout(()=>{
                navigate("/joinedProjects")
            }, 2000)
        }).catch(err=>{
            toast.error(err.response.data.message)
        })
    }
    return <>
        <div className="container">
    <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Leave a project</h2>
            <p className="w-lg-50">please provide your account&#39;s password</p>
        </div>
    </div>
    <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-xl-4">
            <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg className="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                        </svg></div>
                    <form className="text-center" method="post"
                        onSubmit={(e)=>{
                            handleSubmit(e)
                        }}
                    >
                        <div className="mb-3"></div>
                        <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                        /></div>
                        <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Delete</button></div>
                        <p className="text-muted">Forgot your password?</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
}
export default LeaveProject