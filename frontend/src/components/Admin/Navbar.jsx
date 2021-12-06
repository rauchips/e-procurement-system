import React from 'react'
import "../Navbar/Navbar.css"
import {useHistory,Link } from 'react-router-dom';

const AdminNavbar = () => {
    const history = useHistory ();
    const onClick = () => {
        localStorage.removeItem("adminprofile")
        history.push("/admin")
    }
    return (
        <div className='container-fluid navbarpage'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Admin Panel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className='btn btn-outline-primary nav-link btn-sm' href="/admin/home" >Home</a>
                    </li>
                    <li className="nav-item">
                    <a className='btn btn-outline-primary nav-link btn-sm' href="/admin/entities" >Entities</a>
                    </li>
                    <li className="nav-item">
                    <a className='btn btn-outline-primary nav-link btn-sm' href='/admin/vendors' >Vendors</a>
                    </li>
                    <li className="nav-item">
                    <a className='btn btn-outline-primary nav-link btn-sm' href='/admin/committee' >Committee</a>
                    </li>
                    <li className="nav-item">
                    <a className='btn btn-outline-primary nav-link btn-sm' href='/admin/tenders' >Tenders</a>
                    </li>
                
                </ul>
                {/* <h6 style={{marginRight:"40px"}}>Welcome, {user.json.result.name}</h6> */}
                <button onClick={onClick} className='btn btn-danger btn-md'>
                    Logout
                </button>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
