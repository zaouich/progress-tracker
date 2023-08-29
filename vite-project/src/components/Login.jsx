import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const Login = ()=>{
    console.log("**********",useSelector(state=>state.user))
    //useState
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    // useEffect
    
    // handlers
    const handleLogin =(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post("http://127.0.0.1:3000/api/v1/users/login",{
            email,password
        },{withCredentials:true}).then((response)=>{
            alert("welcome")
            window.location.href="/"
        }).catch((err)=>{
            console.log(err)
            alert(err.response.data.message)
        })
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="container">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleLogin(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePassword(e)}
                required
              />
            </div>
            <div className="mb-3">
              <p className="mb-0">Don't have an account? <Link to="/signUp">Sign up</Link></p>
              <p className="mb-0">Forgot password? <Link to="/forgetPassword">Forgot Password</Link></p>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      );
      
      
}
export default Login