import { useState } from "react";
import "./Sign.css";

const  Sign = () => {
    const [isSignUp,setIsSignUp] = useState(true);
    const switchMode = () => {
        setIsSignUp(prev => !prev)
    }
    return (
        <div>
            <div className="container sign">
                {isSignUp?
                <h5 className="text-center mb-3">Entity Registration</h5>
                :<h5 className="text-center mb-3">Entity Login</h5>}
                {isSignUp?
                <>
                <form>
                    <div className='row padding'>
                        <div className="col-md-12 col-sm-12 col-lg-6">
                            <div className="card">
                            <h5 className="text-center">Government Entity</h5>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Entity Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Telephone</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Postal Address</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">County</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Website</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-6">
                            <div className="card">
                            <h5 className="text-center">Government Representative</h5>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"/>
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
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Email</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"/>
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
export default Sign;