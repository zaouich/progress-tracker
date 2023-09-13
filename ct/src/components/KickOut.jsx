import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const KickOut = ()=>{
    const [password,setPassword] = useState("");
    const {projectId,memeberShipId} = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        axios.delete(`http://127.0.0.1:3000/api/v1/projects/${projectId}/memeberShips/${memeberShipId}`,{
            withCredentials: true,
            data: {
                password
            }
        }).then(res=>{
            toast.success("memeber kicked out successfully");
            navigate(`/projects/${projectId}/`);
        }).catch(err=>{
            toast.error(err.response.data.message);
        })
    }
    return <>
    <ToastContainer/>
        <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Kick Out Memeber</h2>
                <p className="w-lg-50">please provide your password to kick out the memeber</p>
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
                                e.preventDefault();
                                handleSubmit();
                            }}  
                        >
                            <div className="mb-3"></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" 
                                onChange={(e)=>setPassword(e.target.value)}
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Kick Out</button></div>
                            <p className="text-muted"><Link to="/forgetPassword">Forgot your password?</Link> </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
}
export default KickOut;