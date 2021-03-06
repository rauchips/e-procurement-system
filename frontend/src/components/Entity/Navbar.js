import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "../Navbar/Navbar.css"

const EntityNavbar = () => {
    const history = useHistory ();
    const onClick = () => {
        localStorage.removeItem("entityprofile")
        history.push("/")
    }
    return (
        <div className=' navbarpage'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Procurement System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a href="/government/home" className='btn btn-secondary nav-link btn-sm'>Home</a>
                    </li>
                    <li className="nav-item">
                    <a href="/government/add-tender" className='btn btn-secondary nav-link btn-sm'>Add Tenders</a>
                    </li>                
                </ul>
                <div style={{marginRight:"80px"}}>
                <button onClick={onClick} className='btn btn-danger btn-md'>
                    Logout
                </button>
                </div>
                
                </div>
            </div>
            </nav>
        </div>
    )
}
export default EntityNavbar;