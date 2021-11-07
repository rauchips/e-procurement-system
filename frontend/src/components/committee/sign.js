import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Sign/Sign.css";

const  CommitteeSign = () => {
    const initialState = {name:"",telephone:"",email:"",password:""}
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
    
    const onSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
        fetch ("http://localhost:5000/api/committee/register", {
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
            body:JSON.stringify (formData)
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
                                    <input onChange={handleChange} type="text" name="name"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Telephone</label>
                                    <input onChange={handleChange} type="text" name="telephone" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Email</label>
                                    <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Password</label>
                                    <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                                </div>
                            </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-outline btn-md" onClick={switchMode} >Already have an account? Click here to Login</button>
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary btn-md">Register</button>
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
                                <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1"  className="form-label">Password</label>
                                <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-outline btn-md " onClick={switchMode}>Don't have an account? Click here to register</button>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary btn-md">Login</button>
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