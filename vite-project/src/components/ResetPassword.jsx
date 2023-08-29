
import axios from "axios"
import { useState } from "react"


import { useParams } from "react-router-dom"

const ResetPassword = () => {
    const {token} = useParams()
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,{newPassword,confirmNewPassword},{withCredentials:true}).then((response)=>{
        alert("thanks for reseting your password !")
        window.location.href="/login"
    }).catch((err)=>{
        console.log(err)
        alert(err.response.data.message)
    })
}
    return <>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <div className="container">
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" className="form-control" id="password" placeholder="Password" onChange={(e)=>setNewPassword(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e)=>setConfirmNewPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </div>
</form>
    </>
}
export default ResetPassword;