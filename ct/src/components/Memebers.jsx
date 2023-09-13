
import { Link, useParams } from "react-router-dom";

const Memebers =(props)=>{
    const {projectId} = useParams();
    
    return <>
            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col-md-7">
                <div className="p-4">
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src={`http://127.0.0.1:3000/imgs/users/profile/${props.project.admin.profile}`} />
                        <div>
                            <p className="fw-bold mb-0">{props.project.admin.userName}</p>
                            <p className="text-muted mb-0">{props.project.admin.id===props.userinfo._id ? "admin | you" : "admin"}</p>

                        </div>
                    </div>
                </div>
            </div>
    
          <>
            {
              props.members.map((member,index)=>{

                return <div className="col-md-7" key={index}>
                <div className="p-4">
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" 
                src={`http://127.0.0.1:3000/imgs/users/profile/${member.user.profile}`}
                    />
                        <div>
                            <p className="fw-bold mb-0">{member.user.userName}</p>
                            <p className="text-muted mb-0">{member.user._id===props.userinfo._id ? "memeber | you" : "memeber"}</p>
                            </div>
                            {
                                props.project.admin._id === props.userinfo._id ? <>
                                    <button className="btn btn-primary bg-transparent text-danger border-primary" type="button" style={{border:"none"}} ><Link to={`/projects/${projectId}/memeberShips/${member._id}`}>kick out</Link> </button>
                                </> : null
                            }
        </div>
                          </div>
                    </div>
                
              })
            }
          </>
</div>
            </>
}   
export default Memebers;