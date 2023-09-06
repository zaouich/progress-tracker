import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {  ToastContainer } from "react-toastify"

const CreateProject = (props) => {
    const [name, setName] = useState("")

    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        if(! props.userinfo) {
            navigate("/login")
      }
    },[])
    const handleCreateProject = (e)=>{
        
        e.preventDefault()
        axios.post("http://127.0.0.1:3000/api/v1/projects/",{name, description, password, confirmPassword},{withCredentials: true}).then((res)=>{
        toast.success("project created successfully")
        setTimeout(() => {
            window.location.href = "/"
        }, 2000);
        
        }).catch((err)=>{
            err.response.data.message.split(",").map((errel)=>{
            toast.error(errel)
            })
        })
    }

    return <>
    <ToastContainer/>
    <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Create New Project</h2>
                <p className="w-lg-50">create project, invite users. start tracking your project.</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form className="text-center" method="post"
                        onSubmit={(e)=>{
                            handleCreateProject(e)
                        }
                        }
                        >
                            <div className="mb-3"><input className="form-control" type="text" name="name" placeholder="Name" 
                            onChange={(e)=>{
                                setName(e.target.value)
                            }
                            }
                            autoComplete="off"
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="description" placeholder="Description" 
                            onChange={(e)=>{
                                setDescription(e.target.value)
                            }
                            }
                            autoComplete="off"

                            /></div>
                            
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" 
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }
                            }
                            autoComplete="off"

                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="Confirmpassword" placeholder="ConfirmPassword" 
                            onChange={(e)=>{
                                setConfirmPassword(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Create</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
}
export default CreateProject