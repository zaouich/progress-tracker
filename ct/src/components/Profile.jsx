import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const Profile = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(props)
        if(! props.userinfo) {
            navigate("/login")
      } 
    },)
    // in the first the props.userinfo is null so we need to use useEffect to wait for the props.userinfo to be not null but that not gonna solve the problem becose i have used the null values in the componnent <>{userName}</>
    const [username, setUsername] = useState(props.userinfo ? props.userinfo.userName :"")
    const [firstname, setFirstname] = useState(props.userinfo ?   props.userinfo.firstName :""  )
    const [lastname, setLastname] = useState(props.userinfo ?  props.userinfo.lastName :"" )
    const [email, setEmail] = useState(props.userinfo ?  props.userinfo.email :"" )
    const [phone, setPhone] = useState(props.userinfo ?  props.userinfo.phone :"" )
    const [profilePic, setProfilePic] = useState(null)
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
        
        axios.post("http://127.0.0.1:3000/api/v1/users/updateMe", formData ,{withCredentials: true}).then((res)=>{
            toast.success("Updated Successfull")
            setTimeout(() => {
                window.location.href = "/"
                }
                , 2000);
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
                <h2>Update Your infos</h2>
                <p>lets update your infos !</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                    <img className="rounded-circle w-50 mb-3"
                     src={`http://127.0.0.1:3000/imgs/users/profile/${props.userinfo ?  props.userinfo.profile  :""}`} />
                        <form className="text-center" method="post" 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            handleSignUp(e)
                        }}
                        >
                            <div className="mb-3"><input className="form-control" type="text" name="username" placeholder="Username" value={
                                username 
                            }
                            onChange={(e)=>{
                                setUsername(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="firstname" placeholder="First Name" value={
                                firstname  
                            }
                            onChange={(e)=>{
                                setFirstname(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="lastname" placeholder="Last Name" 
                            value={
                                lastname 
                            }
                            onChange={(e)=>{
                                setLastname(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email"
                            value={
                                email 
                            }
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text" name="phone" placeholder="Phone"
                            
                            value={
                                phone 
                            }
                            onChange={(e)=>{
                                setPhone(e.target.value)
                            }   }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="file"
                            
                            
                            onChange={(e)=>{
                                setProfilePic(e.target.files[0])
                            }   }
                             /></div>
                            

                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Update !</button></div>
                            <p className="text-muted">
                              <Link to="/updatePassword">you wanna change your password ?</Link> 
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
export default Profile