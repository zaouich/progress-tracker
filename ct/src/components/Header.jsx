import axios from "axios"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const Header =  (props)=>{
    const handleLogout = ()=>{
        axios.post("http://127.0.0.1:3000/api/v1/users/logout",{},{withCredentials: true}).then((res)=>{
           toast.success("logout successfull")
           setTimeout(() => {
               window.location.href = "/login"
           }, 2000);
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    return <>
        
        <ToastContainer/>
 
    <nav className="navbar navbar-light navbar-expand-md py-3">
    <div className="container"><a className="navbar-brand d-flex align-items-center" href="#"><span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg className="bi bi-bezier" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                    <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                </svg></span><span>ZAOUICH</span></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-2"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div id="navcol-2" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                {
                    props.userinfo ? <>
                                    <li className="nav-item"><a className="nav-link"><Link to="/joinedProjects">Joined Projects</Link> </a></li>
                                    <li className="nav-item"><a className="nav-link" ><Link to="/projectsAdmin">My Projects</Link> </a></li>
                    <li className="nav-item dropdown show"><a className="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown" href="#">{props.userinfo.userName}</a>
    <div className="dropdown-menu show" data-bs-popper="none"><a className="dropdown-item" ><Link to="/profile">profile</Link> </a><a class="dropdown-item" href="#"
    onClick={()=>handleLogout()}
    >logout</a></div>
</li>
                    </> :<>
                        <li className="nav-item"><a className="nav-link" ><Link to ="/login">login</Link></a></li>
                    <a className="btn btn-primary ms-md-2" role="button" href="#"><Link to ="/signUp"
                    style={{
                        color:"white"
                    }}
                    >get Started</Link></a>
                    </> 
                }
               
            </ul>
        </div>
    </div>
</nav>
    </>
}
export default Header