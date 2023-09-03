import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleSignUp = (e)=>{
        
        e.preventDefault()

        const formData = new FormData()
        formData.append("userName", username)
        formData.append("firstName", firstname)
        formData.append("lastName", lastname)
        formData.append("email", email)
        formData.append("phone", phone)
        if(profilePic){
            formData.append("profile", profilePic)
        }
        formData.append("password", password)
        formData.append("confirmPassword", confirmPassword)
        axios.post("http://127.0.0.1:3000/api/v1/users/signUp", formData ,{withCredentials: true}).then((res)=>{
            toast.success("SignUp Successfull")

        }).catch((err)=>{
            err.response.data.message.split(",").forEach((e)=>{
                toast.error(e)
            })
        }
        )
    }
    return (
        <section className="py-4 py-xl-5">
    <ToastContainer/>
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>SignUp</h2>
                <p>lets create an account !</p>
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
                            handleSignUp(e)
                        }}
                        >
                            <div className="mb-3"><input className="form-control" type="text" name="username" placeholder="Username" 
                            onChange={(e)=>{
                                setUsername(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="firstname" placeholder="First Name" 
                            onChange={(e)=>{
                                setFirstname(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="lastname" placeholder="Last Name" 
                            onChange={(e)=>{
                                setLastname(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email"
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="phone" placeholder="Phone"
                            onChange={(e)=>{
                                setPhone(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="file"
                            onChange={(e)=>{
                                setProfilePic(e.target.files[0])
                            }   }
                             /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password"
                            onChange={(e)=>{
                                setConfirmPassword(e.target.value)
                            }
                            }
                            /></div>

                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Sign Up</button></div>
                            <p className="text-muted">
                                Already have an account?
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    );
}
export default SignUp