import React,{useEffect,useState} from 'react'
import "./Navbar.css"
import { useLocation,useHistory,Link } from 'react-router-dom';

const AdminNavbar = () => {
    const location = useLocation();
    const history = useHistory ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('adminprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('adminprofile')))
    },[location])

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
                    <Link to = "/admin/home">
                    <li className="nav-item">
                        <button className='btn btn-outline-primary nav-link btn-sm'>Home</button>
                    </li>
                    </Link>
                    <Link to = "/admin/entities">
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Entities</button>
                    </li>
                    </Link>
                    <Link to = "/government/home">
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Vendors</button>
                    </li>
                    </Link>
                    <Link to = "/government/home">
                    <li className="nav-item">
                    <button className='btn btn-outline-primary nav-link btn-sm'>Committee</button>
                    </li>
                    </Link>
                
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
