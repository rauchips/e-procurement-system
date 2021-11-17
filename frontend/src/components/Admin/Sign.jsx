import React,{useState,useEffect} from "react"
import { useHistory } from "react-router-dom"

const AdminSign = () => {
    const initialState = {email:"",password:""}
    const [formData,setFormData] = useState(initialState)
    const [errors,setErrors] = useState([])
    const history = useHistory();
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        fetch ("http://localhost:5000/api/admin/login", {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify (formData)
        })
        .then(res => res.json())
        .then(json => {
            console.log("json",json)
            if (json.message) {
                setErrors(json.message)
            } else {
                localStorage.setItem("adminprofile",JSON.stringify({json}))
                history.push("/admin/home")
            }
        })
        
    }
    return (
        <div>
        <div className="container sign mt-5">
        {errors?
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
     {errors}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
        :""}
            <h5 className="text-center mb-3">Admin Login</h5>
            <>
            <div className="container login">
                <div className="card">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputPassword1"  className="form-label">Email</label>
                            <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1"  className="form-label">Password</label>
                            <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-primary btn-md">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            </>
        </div>
    </div>
    )
}
export default AdminSign;