import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import "../Sign/Sign.css";

const  CommitteeSign = () => {
    const initialState = {name:"",telephone:"",email:""}
    const [formData,setFormData] = useState(initialState)
    const [errors,setErrors] = useState([])
    const [isSignUp,setIsSignUp] = useState(true);
    const history = useHistory();
    const switchMode = () => {
        setIsSignUp(prev => !prev)
    }
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
            telephone:formData.telephone,
            email:formData.email,
            name:formData.name
        }
        if (isSignUp) {
        fetch ("http://localhost:5000/api/committee/register", {
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
                localStorage.setItem("committeeprofile",JSON.stringify({json}))
                history.push("/committee/home")
            }
        })
    }else {
        fetch ("http://localhost:5000/api/committee/login", {
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
                localStorage.setItem("committeeprofile",JSON.stringify({json}))
                history.push("/committee/home")
            }
        })
    }
        
    }
    return (
        <div>
            <div className="container sign mt-5">
            {errors?
            <p className=" text-center text-danger">{errors}</p>
            :""}
                {isSignUp?
                <h5 className="text-center mb-3">Committee Registration</h5>
                :<h5 className="text-center mb-3">Committee Login</h5>}
                {isSignUp?
                <>
                  <div className="container login">
                <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Name</label>
                                    <input required onChange={handleChange} type="text" name="name"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Telephone</label>
                                    <input required onChange={handleChange} type="text" name="telephone" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Email</label>
                                    <input required onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary btn-md">Register</button>
                            </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-dark btn-md" onClick={switchMode} >Already have an account? Click here to Login</button>
                    </div>
                </form>
                </div>
                </>
                :<>
                <div className="container login">
                    <div className="card">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputPassword1"  className="form-label">Email</label>
                                <input required onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputPassword1"/>
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
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-dark btn-md " onClick={switchMode}>Don't have an account? Click here to register</button>
                            </div>
                        </form>
                    </div>
                </div>
                </>}
            </div>
        </div>
    )
}
export default CommitteeSign;