import axios from "axios"
import { useState } from "react"

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:3000/api/v1/users/forgetPassword",{email},{withCredentials:true}).then((response)=>{
            alert("check your email")
        }).catch((err)=>{
            console.log(err)
            alert(err.response.data.message)
        })


    }
    return <>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>

        </>
}
export default ForgetPassword;