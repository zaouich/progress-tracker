import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

const JoinProject = (props) => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [projectPassword, setProjectPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:3000/api/v1/memberShips/",
        {
            projectName,
            projectPassword
        },
        {
            withCredentials: true
        }
        ).then(()=>{
            toast.success("project joined successfully")
            setTimeout(()=>{
                window.location.href = "/"
            }, 2000)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    useEffect(()=>{
        if(! props.userinfo) {
            navigate("/login")
      }
    })
    return <>
    <ToastContainer/>
        <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Join Project</h2>
                <p className="w-lg-50">please enter the project infos , if you don&#39;t have , it please contact the project&#39;s admin</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form className="text-center" method="post"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-3"><input className="form-control" type="text" name="name" placeholder="Project's Name" 
                            onChange={(e)=>{
                                setProjectName(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Project's Password" 
                            onChange={(e)=>{
                                setProjectPassword(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit"
                                
                            >Join</button></div>
                            <p className="text-muted"><Link to="/createProject">Create your own one ?</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
};
export default JoinProject;