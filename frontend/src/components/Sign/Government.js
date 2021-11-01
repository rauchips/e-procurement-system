import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Sign.css";

const  GovernmentSign = () => {
    const initialState = {entity:"",telephone:"",address:"",county:"",website:"",name:"",email:"",password:""}
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
        const post = {
            entity:formData.entity,
            telephone:formData.telephone,
            county:formData.county,
            address:formData.address,
            website:formData.website,
            representative:{
                name:formData.name,
                email:formData.email,
                password:formData.password
            }
        }
        if (isSignUp) {
        fetch ("http://localhost:5000/api/government/register", {
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
                localStorage.setItem("entityprofile",JSON.stringify({json}))
                // history.push("/vendor/booking")
            }
        })
    }else {
        fetch ("http://localhost:5000/api/government/login", {
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
                localStorage.setItem("entityprofile",JSON.stringify({json}))
                // history.push("/vendor/booking")
            }
        })
    }
        
    }
    return (
        <div>
            <div className="container sign">
                {isSignUp?
                <h5 className="text-center mb-3">Entity Registration</h5>
                :<h5 className="text-center mb-3">Entity Login</h5>}
                {isSignUp?
                <>
                <form onSubmit={onSubmit}>
                    <div className='row padding'>
                        <div className="col-md-12 col-sm-12 col-lg-6">
                            <div className="card">
                            <h5 className="text-center">Government Entity</h5>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Entity Name</label>
                                    <input onChange={handleChange} type="text" name="entity"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Telephone</label>
                                    <input onChange={handleChange} type="text" name="telephone" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Postal Address</label>
                                    <input onChange={handleChange} type="text" name="address" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">County</label>
                                    <input onChange={handleChange} type="text" name="county" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Website</label>
                                    <input onChange={handleChange} type="text" name="website" className="form-control" id="exampleInputPassword1"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-6">
                            <div className="card">
                            <h5 className="text-center">Government Representative</h5>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1"  className="form-label">Name</label>
                                    <input onChange={handleChange} type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Email</label>
                                    <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1"  className="form-label">Password</label>
                                    <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-outline btn-md" onClick={switchMode} >Already have an account? Click here to Login</button>
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary btn-md">Register</button>
                    </div>
                </form>
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
export default GovernmentSign;