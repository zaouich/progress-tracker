import axios from "axios"
import { useEffect, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const UpdateProjectPassword = () => {
    const {projectId} = useParams()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loaded, setLoaded] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.patch(`http://127.0.0.1:3000/api/v1/projects/${projectId}/updatePassword`,{oldPassword, newPassword, confirmNewPassword},{withCredentials: true}).then(()=>{
            toast.success("project updated successfully")
            setTimeout(()=>{
                window.location.href = "/"
            }, 2000)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}`,{withCredentials: true}).then(()=>{
            setLoaded(true)

        }).catch((err)=>{
            if(err.response.data.message=="no project for you found by that id"){
                window.location.href = "/404"
            }
        })
   },[])
   return  <>
   <ToastContainer/>
   {
       loaded ? <>
           <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Update Project&#39;s password</h2>
                <p className="w-lg-50">are you sure you want to update the project&#39;s password ?</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form className="text-center" method="post" 
                        onSubmit={(e)=>handleSubmit(e)}

                        >
                            <div className="mb-3"></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Old Password" 
                            onChange={
                                (e)=>{
                                    setOldPassword(e.target.value)
                                }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="New Password" 
                            onChange={
                                (e)=>{
                                    setNewPassword(e.target.value)
                                }
                            }

                            /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Confirm New Password" 
                            onChange={
                                (e)=>{
                                    setConfirmNewPassword(e.target.value)
                                }
                            }
                            /></div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Update</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
       </> : <div 
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         height: "100vh"
         
       }}
      >
      
      <Triangle
 height="200"
 width="200"
 color="#24285B"
 ariaLabel="triangle-loading"
 wrapperStyle={{}}
 wrapperclassNameNameName=""
 visible={true}
/>
       </div>
   }
   </>


}
export default UpdateProjectPassword