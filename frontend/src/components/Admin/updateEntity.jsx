import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../Sign/Sign.css";
import AdminNavbar from "./Navbar";

const  UpdateEntity = () => {
    const location = useLocation ()
    const initialState = {name:"",entity:"",email:""}
    const [formData,setFormData] = useState(initialState)
    const history = useHistory();
    const [entityId,setEntityId] = useState(JSON.parse(localStorage.getItem('adminentityid')));
    const [entity,setEntity] = useState(JSON.parse(localStorage.getItem('adminentity')));
    const [entityName,setEntityName] = useState(JSON.parse(localStorage.getItem('adminentityname')));
    const [entityEmail,setEntityEmail] = useState(JSON.parse(localStorage.getItem('adminentityemail')));



    useEffect (() => {
        setEntityId(JSON.parse(localStorage.getItem('adminentityid')))
        setEntity(JSON.parse(localStorage.getItem('adminentity')))
        setEntityName(JSON.parse(localStorage.getItem('adminentityname')))
        setEntityEmail(JSON.parse(localStorage.getItem('adminentityemail')))


    },[location])
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const onSubmit = (e) => {
        const post ={
            entity:formData.entity,
            representative:{
                name:formData.name,
                email:formData.email
            }
        }
        e.preventDefault()
        axios.patch(`http://localhost:5000/api/admin/governments/${entityId.id}`,post)
        history.push('/admin/entities')
        
    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container sign mt-5">
                <>
                    <h5 className="text-center mb-3">Entity Update</h5>
                  <div className="container login">
                <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Entity</label>
                                    <input onChange={handleChange} type="text" name="entity"  className="form-control" id="exampleInputEmail1" placeholder={entity.entity} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Representative Name</label>
                                    <input onChange={handleChange} type="text" name="name" className="form-control" id="exampleInputPassword1" placeholder={entityName.name} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Representative Email</label>
                                    <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={entityEmail.email} />
                                </div>
                            </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary btn-md">Update</button>
                    </div>
                </form>
                </div>
                </>
            </div>
        </div>
    )
}
export default UpdateEntity;