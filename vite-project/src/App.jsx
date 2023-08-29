import { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import SignUp from './components/SignUp'
import ForgetPassword from './components/ForgetPassword'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './components/ResetPassword'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    axios.get("http://127.0.0.1:3000/api/v1/users/checkLogin",{withCredentials:true}).then((response)=>{
      dispatch({type:"user",userData:response.data.user})
      
        }).catch(err=>{
            if(err.response.status=="401") dispatch({type:"user",userData:null,errMessage : err.response.data.message})
        })
},[])
const user = useSelector(state=>state.user)
  const [count, setCount] = useState(0)
  
  return (
    
    <>
    <Header/>
    <Routes>
    <Route path="/login" element={ <Login/> }/>
    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/forgetPassword" element={<ForgetPassword/>}/>
    <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
    </Routes>

    </>
  )
}

export default App
