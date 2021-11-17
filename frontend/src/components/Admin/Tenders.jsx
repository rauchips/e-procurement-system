import React,{ useState,useEffect } from 'react'
import AdminNavbar from './Navbar'

const AdminTenders = () => {
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
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Tenders Registered</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Representative Name</th>
                <th scope="col">Representative Email</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
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
                    tender.status === false?<td>False</td>:<td>True</td>
                }
                <td>
                    <div style={{display:"flex"}}>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-info">Update</div>
                    </div>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-danger">Delete</div>
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

export default AdminTenders
