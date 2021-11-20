import React,{useEffect,useState} from "react";
import SupplierNavbar from "./Navbar";
import { useLocation,useHistory } from "react-router-dom";


const SupplierHome = () => {
    const history = useHistory()
    const location = useLocation ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])


    const [tendersData,setTendersData] = useState ([])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/tenders")
        const result = await response.json ()
        console.log(result)
        setTendersData(result.body)
    }
    const onClick = (id,name) => {
        localStorage.setItem("tenderId",JSON.stringify({id}))
        localStorage.setItem("tendername",JSON.stringify({name}))
        history.push('/supplier/bid')
    } 
    return (
        <div>
            <SupplierNavbar/>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.company} Company</h5>
            <div className="container mt-5">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Representative Name</th>
                <th scope="col">Representative Email</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                <th scope="col">Document</th>
                </tr>
            </thead>
            {
                tendersData.map(tender => (
                    <tbody>
                <tr>
                <td>{tender.title}</td>
                <td>{tender.rep.representative.name}</td>
                <td>{tender.rep.representative.email}</td>
                {
                    tender.status === false?<td>Active</td>:<td>Inactive</td>
                }
                <td>
                    <div style={{display:"flex"}}>
                    <div className="m-2">
                        <button onClick = {(() => onClick(tender._id,tender.title))} className="btn btn-md btn-success">Bid</button>
                    </div>
                    </div>
                    
                </td>
                </tr>
            </tbody>
                ))
            }
            </table>
            </div>
        </div>
    )
}
export default SupplierHome;