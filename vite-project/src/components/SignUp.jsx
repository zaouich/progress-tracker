import { useState } from "react"
import axios from "axios"
const SignUp = ()=>{
    // userName firstName lastName phone email profile password confirmPassword
    const [userName,setUserName] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [profile,setProfile] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
      
    const handleSubmit = (e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append("profile",profile)
        formData.append("userName",userName)
        formData.append("firstName",firstName)
        formData.append("lastName",lastName)
        formData.append("phone",phone)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("confirmPassword",confirmPassword)
        axios.post("http://127.0.0.1:3000/api/v1/users/signUp",formData,{withCredentials:true}).then(()=>{
            alert("welcome")
            // redirect
            window.location.href="/"
        }).catch((err)=>{
            console.log(err)
            alert(err.response.data.message)
        }   )
    }
    return <>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="container">
        <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input type="text" className="form-control" id="userName" placeholder="User Name" value={userName} onChange={(e)=>setUserName(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" id="phone" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="profile">Profile</label>
            <input
  type="file"
  className="form-control"
  id="profile"
  placeholder="Profile"
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    setProfile(selectedFile);
  }}
/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
    </>
}
export default SignUp