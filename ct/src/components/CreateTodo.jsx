import axios from "axios";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";

const CreateTodo=(props)=>{
    const [loaded,setLoaded] = useState(false);
    const [members,setMembers] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [member,setMember] = useState("");
    const navigate = useNavigate();
    const {projectId} = useParams();
   
    const handleCreateTodo = (e)=>{
        console.log(member)
        axios.post(`http://127.0.0.1:3000/api/v1/projects/${projectId}/todos/`,{name,description,start,end,user:member},{withCredentials: true}).then((res)=>{
            toast.success("todo created successfully");
            navigate(`/projects/${projectId}`);
        }).catch((err)=>{
            const msgs = err.response.data.message.split(",");
            msgs.map((msg)=>{
                toast.error(msg);
            })
        })
    }

    useEffect( ()=>{
        if(!props.userinfo)return navigate("/login");
        axios.get(`http://127.0.0.1:3000/api/v1/projects/${projectId}`, {withCredentials: true}).then((res)=>{
        console.log(res.data.project.memebers);    
        setMembers(res.data.project.memebers);
        setLoaded(true);
    }).catch((err)=>{
        if(err.response.status === 404) return navigate("/not-found");
        toast.error(err.response.data.message);
    })
    },[])
    return <>
    <ToastContainer/>
    {
        loaded ? <>
            <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Create Todo</h2>
                <p className="w-lg-50">lets create a todo for the project</p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <form className="text-center" method="post"
                        onSubmit={(e)=>{
                            e.preventDefault();
                            handleCreateTodo();
                        }   }
                        >
                            <div className="mb-3"><input className="form-control" type="text"  placeholder="Name" 
                            onChange={(e)=>{
                                setName(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control" type="text"  placeholder="Description"
                            onChange={(e)=>{
                                setDescription(e.target.value)
                            }
                            }
                            /></div>
                            <div className="mb-3"><input className="form-control"  placeholder="Start" type="date"
                                onChange={(e)=>{
                                setStart(e.target.value)}
                                }
                            /></div>
                            <div className="mb-3"><input className="form-control" name="password" placeholder="End" type="date" 
                                onChange={(e)=>{
                                setEnd(e.target.value)}
                                }   
                            /></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                            <div className="mb-3">
                                <select className="form-select" onChange={(e)=>{
                                setMember(e.target.value)
                                console.log(e.target.value)
                                }}>
                                
                                
            <option value="" selected>Select Member</option>
            {
                members.map((member,index)=>{
                    return <option key={index}  name={member.user._id} id={member.user._id} value={member.user._id}>{member.user.userName}</option>
                })
            }
           {/*  <option value="12" selected>This is item 1</option>
            <option value="13">This is item 2</option>
            <option value="14">This is item 3</option> */}
    </select></div>
                            </div>
                            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Create Todo</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        </> : <Loading/>
    }
        
    </>
}
export default CreateTodo;