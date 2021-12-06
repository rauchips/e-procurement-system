import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    const location = useLocation
    const [entity,setEntity] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setEntity(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])
    const [vendor,setVendor] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setVendor(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])
    return (
        <div className='navbarpage'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Procurement System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className='nav-link' href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className='nav-link' href="/tenders">Tenders</a>
                    </li>
                    {
                        vendor?
                        <>
                                <li className="nav-item">
                                    <a className=' nav-link ' href='/supplier/home'>Suppliers</a>
                                </li>
                        </>:
                        <>
                                <li className="nav-item">
                                    <a className='nav-link' href="/supplier/login">Suppliers</a>
                                </li>
                        </>
                    }
                    {
                        entity?
                        <>
                                <li className="nav-item">
                                    <a className='nav-link' href="government/home">Government Entities</a>
                                </li>
                        </>:
                        <>
                                <li className="nav-item">
                                    <a className='nav-link' href="/government/login">Government Entities</a>
                                </li>
                        </>
                    }

                    {
                        !vendor && !entity?
                        <>
                             <li class="nav-item dropdown">
                        <button class="btn btn-primary btn-md nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Registration
                        </button>
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
                        <button class="btn btn-primary btn-md nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </button>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to = "/government/login">
                    <button className='btn btn-primary btn-md m-2'>Entity</button>
                    </Link>
                    <Link to = "/supplier/login">
                        <button className='btn btn-primary btn-md m-2'>Supplier</button>
                    </Link>
                    </ul>
                    </li>
                        </>:""
                    }
                   
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}
export default Navbar;