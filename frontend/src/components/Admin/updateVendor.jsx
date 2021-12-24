import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../Sign/Sign.css";
import AdminNavbar from "./Navbar";

const  UpdateVendor = () => {
    const location = useLocation ()
    const initialState = {name:"",entity:"",email:"",telephone:'',address:''}
    const [formData,setFormData] = useState(initialState)
    const history = useHistory();
    const [vendorId,setVendorId] = useState(JSON.parse(localStorage.getItem('adminvendorid')));
    const [vendor,setVendor] = useState(JSON.parse(localStorage.getItem('adminvendor')));
    const [vendorName,setVendorName] = useState(JSON.parse(localStorage.getItem('adminvendorname')));
    const [vendorEmail,setVendorEmail] = useState(JSON.parse(localStorage.getItem('adminvendoremail')));
    const [telephone,setTelephone] = useState(JSON.parse(localStorage.getItem('adminvendortelephone')));
    const [address,setAddress] = useState(JSON.parse(localStorage.getItem('adminvendoraddress')));

    useEffect (() => {
        setVendorId(JSON.parse(localStorage.getItem('adminvendorid')))
        setVendor(JSON.parse(localStorage.getItem('adminvendor')))
        setVendorName(JSON.parse(localStorage.getItem('adminvendorname')))
        setVendorEmail(JSON.parse(localStorage.getItem('adminvendoremail')))
        setTelephone(JSON.parse(localStorage.getItem('adminvendortelephone')))
        setAddress(JSON.parse(localStorage.getItem('adminvendoraddress')))



    },[location])
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const onSubmit = (e) => {
        const post ={
            company:formData.company,
            telephone:formData.telephone,
            address:formData.address,
            representative:{
                name:formData.name,
                email:formData.email
            }
        }
        e.preventDefault()
        axios.patch(`http://localhost:5000/api/admin/vendors/${vendorId.id}`,post)
        history.push('/admin/vendors')
        
    }
    
    return (
        <div>
            <AdminNavbar/>
            <div className="container sign mt-5">
                <>
                    <h5 className="text-center mb-3">Vendor Update</h5>
                  <div className="container login">
                <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Company</label>
                                    <input required onChange={handleChange} type="text" name="company"  className="form-control" id="exampleInputEmail1" placeholder={vendor.company} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Telephone</label>
                                    <input required onChange={handleChange} type="text" name="telephone"  className="form-control" id="exampleInputEmail1" placeholder={telephone.telephone} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Address</label>
                                    <input required onChange={handleChange} type="text" name="address"  className="form-control" id="exampleInputEmail1" placeholder={address.address} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Representative Name</label>
                                    <input required onChange={handleChange} type="text" name="name" className="form-control" id="exampleInputPassword1" placeholder={vendorName.name} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Representative Email</label>
                                    <input required onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={vendorEmail.email} />
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
export default UpdateVendor;