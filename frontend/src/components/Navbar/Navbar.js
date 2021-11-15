import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className='container-fluid navbarpage'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Procurement System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to = "/">
                    <li className="nav-item">
                        <button className='btn btn-secondary nav-link btn-sm'>Home</button>
                    </li>
                    </Link>
                    <Link to = "/government/home">
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Tenders</button>
                    </li>
                    </Link>
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Suppliers</button>
                    </li>
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Government Entities</button>
                    </li>
                
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Registration
                        </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to = "/government/sign">
                    <button className='btn btn-primary btn-md m-2'>Entity</button>
                    </Link>
                    <Link to = "/supplier/sign">
                        <button className='btn btn-primary btn-md m-2'>Supplier</button>
                    </Link>
                    </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to = "/government/sign">
                    <button className='btn btn-primary btn-md m-2'>Entity</button>
                    </Link>
                    <Link to = "/supplier/sign">
                        <button className='btn btn-primary btn-md m-2'>Supplier</button>
                    </Link>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}
export default Navbar;