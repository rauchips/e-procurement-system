import React,{useEffect,useState} from "react";
import Navbar from "../Navbar/Navbar"


const Tenders = () => {
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
    return (
        <div>
            <Navbar/>
            <h5 className="mt-5 text-center mb-3">All tenders made.</h5>
            <div className="container mt-5">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Representative Name</th>
                <th scope="col">Representative Email</th>
                <th scope="col">Status</th>
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
                </tr>
            </tbody>
                ))
            }
            </table>
            </div>
        </div>
    )
}
export default Tenders;