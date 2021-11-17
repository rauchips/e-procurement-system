import React,{ useState,useEffect } from 'react'
import AdminNavbar from './Navbar'

const AdminEntities = () => {
    const [entityData,setEntityData] = useState ([])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/governments")
        const result = await response.json ()
        console.log(result)
        setEntityData(result.body)
    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Registered Entities</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Entity</th>
                <th scope="col">Telephone</th>
                <th scope="col">Website</th>
                <th scope="col">Address</th>
                <th scope="col">County</th>
                <th scope="col">Rep Name</th>
                <th scope="col">Rep Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            {
                entityData.map(entity => (
                    <tbody>
                <tr>
                <td>{entity.entity}</td>
                <td>{entity.telephone}</td>
                <td>{entity.website}</td>
                <td>{entity.address}</td>
                <td>{entity.county}</td>
                <td>{entity.representative.name}</td>
                <td>{entity.representative.email}</td>
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

export default AdminEntities