import React,{useState,useEffect} from 'react'
import { useLocation , useHistory} from 'react-router-dom';
import "../Navbar/Navbar.css"

const CommitteeNavbar = () => {
    const location = useLocation();
    const history = useHistory ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('committeeprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('committeeprofile')))
    },[location])

    const onClick = () => {
        localStorage.removeItem("committeeprofile")
        history.push("/committee")
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
                        <a href='/committee/home' className='nav-link'>Home</a>
                    </li>
                
                </ul>
                <h6 style={{marginRight:"40px"}}>Welcome, {user.json.result.name}</h6>
                <button onClick={onClick} className='btn btn-danger btn-md'>
                    Logout
                </button>
                </div>
            </div>
            </nav>
        </div>
    )
}
export default CommitteeNavbar;