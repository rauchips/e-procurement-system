import React,{useEffect,useState} from "react";
import SupplierNavbar from "./Navbar";
import { useLocation } from "react-router-dom";


const SupplierHome = () => {
    const location = useLocation ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])
    return (
        <div>
            <SupplierNavbar/>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.company} Company</h5>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.representative.name}</h5>
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
export default SupplierHome;