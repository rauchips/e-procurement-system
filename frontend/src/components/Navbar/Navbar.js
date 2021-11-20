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
                        <button className='btn btn-secondary nav-link btn-sm'>Home</button>
                    </li>
                    </Link>
                    <Link to = '/tenders'>
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Tenders</button>
                    </li>
                    </Link>
                    {
                        vendor?
                        <>
                            <Link to ="/supplier/home">
                                <li className="nav-item">
                                    <button className='btn btn-outline-primary nav-link btn-sm'>Suppliers</button>
                                </li>
                            </Link>
                        </>:
                        <>
                            <Link to ='/supplier/login'>
                                <li className="nav-item">
                                    <button className='btn btn-outline-primary nav-link btn-sm'>Suppliers</button>
                                </li>
                            </Link>
                        </>
                    }
                    {
                        entity?
                        <>
                            <Link to ="government/home">
                                <li className="nav-item">
                                    <button className='btn btn-outline-primary nav-link btn-sm'>Government Entities</button>
                                </li>
                            </Link>
                        </>:
                        <>
                            <Link to ='/government/login'>
                                <li className="nav-item">
                                    <button className='btn btn-outline-primary nav-link btn-sm'>Government Entities</button>
                                </li>
                            </Link>
                        </>
                    }
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
                    <Link to = "/government/login">
                    <button className='btn btn-primary btn-md m-2'>Entity</button>
                    </Link>
                    <Link to = "/supplier/login">
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