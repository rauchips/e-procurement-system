import React,{ useState,useEffect } from 'react'
import AdminNavbar from './Navbar'

const AdminVendors = () => {
    const [vendorData,setVendorData] = useState ([])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/vendors")
        const result = await response.json ()
        console.log(result)
        setVendorData(result.body)
    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Registered Vendors</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Entity</th>
                <th scope="col">Telephone</th>
                <th scope="col">Address</th>
                <th scope="col">Rep Name</th>
                <th scope="col">Rep Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            {
                vendorData.map(vendor => (
                    <tbody>
                <tr>
                <td>{vendor.company}</td>
                <td>{vendor.telephone}</td>
                <td>{vendor.address}</td>
                <td>{vendor.representative.name}</td>
                <td>{vendor.representative.email}</td>
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

export default AdminVendors
