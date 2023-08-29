import axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Header = ()=>{
  const handleLogout = ()=>{
    axios.post("http://127.0.0.1:3000/api/v1/users/logout").then((response)=>window.location.href="/"
    ).catch((err)=>{
      console.log(err)
      alert(err.response.data.message)
  })
  }
    const user = useSelector(state=>state.user)
    return <>
        <nav className="navbar  navbar-expand-md py-3 bg-success bg-gradient">
    <div className="container"><a className="navbar-brand d-flex align-items-center" href="#"><span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"></span><span>getWork</span></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-4"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
           
        <div id="navcol-4" className="collapse navbar-collapse flex-grow-0 order-md-first">
            <ul className="navbar-nav me-auto">
                <li className="nav-item"><a className="nav-link active" href="#">First Item</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Second Item</a></li>
            </ul>
            
            <div className="d-md-none my-2">
                {
                    user ? <><p>username</p><p>image</p></>:<><button className="btn btn-light me-2" type="button"><Link to="/login" style={{textDecoration:"none"}}
                    >Login</Link></button><button className="btn btn-primary" type="button"><Link to="/signUp"
                    style={{color:"white" , textDecoration:"none"}}
                    >SignUp</Link></button></>
                }
                
            </div>
        </div>
        <div className="d-none d-md-block">
        {
  user ? (
    <>
      <a className="nav-link active" href="#">
        {user.userName} | <button  onClick={()=>handleLogout()}
        style={{backgroundColor:"transparent",border:"none",}}
        >Logout</button>
        <img className="user-avatar" src={`http://127.0.0.1:3000/imgs/users/profile/${user.profile}`} alt="User Avatar" style={{ width: "50px", height: "50px" ,borderRadius:50,marginLeft:"20px" }} />
      </a>
    </>
  ) : (
    <>
      <button className="btn btn-light me-2" type="button">
        <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
      </button>
      <button className="btn btn-primary" type="button">
        <Link to="/signUp" style={{color:"white" , textDecoration:"none"}}
        >SignUp</Link>
      </button>
    </>
  )
}
        </div>
    </div>
</nav>
    </>

}
export default Header