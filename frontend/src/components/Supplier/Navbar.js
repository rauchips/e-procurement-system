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
                    <Link to = "/">
                    <li className="nav-item">
                        <button className='btn btn-secondary nav-link btn-sm'>Tenders</button>
                    </li>
                    </Link>
                    <Link to = "/government/home">
                    <li className="nav-item">
                    <button className='btn btn-secondary nav-link btn-sm'>Accepted Tenders</button>
                    </li>
                    </Link>
                
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
export default SupplierNavbar;