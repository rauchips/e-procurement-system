import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../Sign/Sign.css";
import AdminNavbar from "./Navbar";

const  UpdateCommittee = () => {
    const location = useLocation ()
    const initialState = {name:"",email:"",telephone:''}
    const [formData,setFormData] = useState(initialState)
    const history = useHistory();
    const [committeeId,setCommitteeId] = useState(JSON.parse(localStorage.getItem('admincommitteeid')));
    const [committeeName,setCommitteeName] = useState(JSON.parse(localStorage.getItem('admincommitteename')));
    const [committeeEmail,setCommitteeEmail] = useState(JSON.parse(localStorage.getItem('admincommitteeemail')));
    const [committeeTelephone,setCommitteeTelephone] = useState(JSON.parse(localStorage.getItem('admincommittetelephone')));



    useEffect (() => {
        setCommitteeId(JSON.parse(localStorage.getItem('admincommitteeid')))
        setCommitteeName(JSON.parse(localStorage.getItem('admincommitteename')))
        setCommitteeEmail(JSON.parse(localStorage.getItem('admincommitteeemail')))
        setCommitteeTelephone(JSON.parse(localStorage.getItem('admincommittetelephone')))



    },[location])
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:5000/api/admin/committees/${committeeId.id}`,formData)
        history.push('/admin/committee')
        
    }
    
    
    return (
        <div>
            <AdminNavbar/>
            <div className="container sign mt-5">
                <>
                    <h5 className="text-center mb-3">Committee Update</h5>
                  <div className="container login">
                <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Name</label>
                                    <input required  onChange={handleChange} type="text" name="name" className="form-control" id="exampleInputPassword1" placeholder={committeeName.name} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Email</label>
                                    <input required onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={committeeEmail.email} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Telephone</label>
                                    <input required onChange={handleChange} type="text" name="telephone" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={committeeTelephone.telephone} />
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
export default UpdateCommittee;