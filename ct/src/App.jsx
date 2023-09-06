import { Audio, Triangle } from 'react-loader-spinner'

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from "react-router-dom"
import Login from './components/Login'
import "./components/assets/bootstrap/css/bootstrap.min.css"
import "./components/assets/css/Login-Form-Basic-icons.css"
import "./components/assets/js/startup-modern"
import SignUp from './components/SignUp'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Header from './components/Header'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'
import ProjectsAdmin from './components/ProjectsAdmin'
import CreateProject from './components/CreateProject'
import UpdateProject from './components/UpdateProject'
import NotFound from './components/NotFound'
import DeleteProject from './components/DeleteProject'
import UpdateProjectPassword from './components/UpdateProjectPassword'
function App() {
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/users/checkLogin", {withCredentials: true}).then((res)=>{
    console.log("res(((((((((", res.data.user)
    dispatch({type : "user",  user :res.data.user})
    setUser(res.data.user)
    setLoaded(true)
  }
  ).catch((err)=>{
    console.log(err,"eeeeeeeeeeeeeeeeeerrrrrrrrrrrrr")
    setUser(null)
    setLoaded(true)
  })
  }, [])
  
  return (
    <>
    {
      loaded ? 
      <>
      <Header 
      userinfo={user}
      />
      <Routes>
      <Route path='/'  element={<ProjectsAdmin userinfo={user}/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/signUp'  element={<SignUp/>}/>
      <Route path='/profile'  element={<Profile userinfo={user}/>}/>
      <Route path='/forgetPassword'  element={<ForgetPassword/>}/>
      <Route path='/resetPassword/:token'  element={<ResetPassword/>}/>
      <Route path="/updatePassword" element={<ChangePassword userinfo={user}/>} />
      <Route path='/createProject'  element={<CreateProject userinfo={user}/>}/>
      <Route path='/updateProject/:projectId'  element={<UpdateProject userinfo={user}/>}/>
      <Route path='/deleteProject/:projectId'  element={<DeleteProject userinfo={user}/>}/>
      <Route path='/updateProjectPassword/:projectId'  element={<UpdateProjectPassword userinfo={user}/>}/>
  <Route path='*' element={<NotFound/>}/>
    </Routes>
      </>
      
       : <div 
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
  wrapperClassName=""
  visible={true}
/>
        </div>
    }
      
    </>
  )
}

export default App
