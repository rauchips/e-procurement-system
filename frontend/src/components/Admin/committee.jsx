import React,{ useState,useEffect } from 'react'
import AdminNavbar from './Navbar'

const AdminCommittee = () => {
    const [committeeData,setCommitteeData] = useState ([])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/committees")
        const result = await response.json ()
        console.log(result)
        setCommitteeData(result.body)
    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Registered Committee Members</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Telephone</th>
                <th scope="col">Tenders</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            {
                committeeData.map(committee => (
                    <tbody>
                <tr>
                <td>{committee.name}</td>
                <td>{committee.telephone}</td>
                <td>{committee.tender}</td>
                <td>{committee.email}</td>
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

export default AdminCommittee
