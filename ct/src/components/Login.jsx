import axios from "axios"
import {  useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = (e)=>{
        axios.post("http://127.0.0.1:3000/api/v1/users/login", {email, password} ,{withCredentials: true}).then((res)=>{
            toast.success("Login Successfull")
            setTimeout(() => {

            window.location.href = "/"
            }, 2000);
        }).catch((err)=>{
            toast.error(err.response.data.message)
        }
        )
    }
    return <section className="py-4 py-xl-5">
    <ToastContainer/>
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Log in</h2>
                <p>lets login to your account !</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                            </svg></div>
                        <form className="text-center" method="post" 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            handleLogin(e)
                        }}
                        >
                            <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" 
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div>
                            <p className="text-muted"><Link to="/forgetPassword">Forgot your password?</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
}
export default Login