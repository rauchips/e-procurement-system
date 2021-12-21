import React,{useState} from "react"
import { useHistory } from "react-router-dom"
import "../Sign/Sign.css"

const AdminSign = () => {
    const initialState = {email:"",password:""}
    const [formData,setFormData] = useState(initialState)
    const [errors,setErrors] = useState([])
    const history = useHistory();
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const [password, setPassword] = useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
      };
    
      
      const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
      };
    
    const onSubmit = (e) => {
        e.preventDefault()
        const post = {
            password:password.password,
            email:formData.email
        }
        fetch ("http://localhost:5000/api/admin/login", {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify (post)
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
            <p className=" text-center text-danger">{errors}</p>
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
                                <input type={password.showPassword ? "text" : "password"}
                                        onChange={handlePasswordChange("password")}
                                        value={password.password}
                                        name="password" className="form-control" 
                                        id="exampleInputPassword1"
                                    />
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={handleClickShowPassword}/>
                            <label className="form-check-label" for="flexCheckDefault">
                                Show password
                            </label>
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