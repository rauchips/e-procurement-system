import React,{useState,useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "../Navbar/Navbar.css"

const SupplierNavbar = () => {
    const history = useHistory ();

    const onClick = () => {
        localStorage.clear()
        history.push("/")
    }
    const location = useLocation ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])
    return (
        <div className='container-fluid navbarpage'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Procurement System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className='btn btn-secondary nav-link btn-sm' href='/supplier/home' >Home</a>
                    </li>
                    <li className="nav-item">
                    <a className='btn btn-secondary nav-link btn-sm' href='/supplier/bids-made' >Bids made</a>
                    </li>
                
                </ul>
                <div  style={{marginRight:"80px",display:"flex"}}>
                <h5 className="text-center text-white">Welcome, {user.json.result.representative.name}</h5>
                
                </div>
                <button onClick={onClick} className='btn btn-danger btn-md'>
                    Logout
                </button>
               
                </div>
            </div>
            </nav>
        </div>
    )
}
export default SupplierNavbar;