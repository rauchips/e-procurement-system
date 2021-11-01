import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import EntityNavbar from "./Navbar";


const EntityHome = () => {
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])

    return (
        <div>
            <EntityNavbar/>
            <h5 className="mt-5 text-center mb-3">Ministry of {user.json.entity}</h5>
            <div className="container mt-4">
            <Link to="/government/add-tender">
            <button className="btn-outline-primary btn-lg">Create new Tender + </button>
            </Link>
            </div>
            <div className="container mt-5">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Tender Id</th>
                <th scope="col">Tender Description</th>
                <th scope="col">Date of Publication</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default EntityHome;