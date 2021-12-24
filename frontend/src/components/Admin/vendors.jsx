import React,{ useState,useEffect } from 'react'
import AdminNavbar from './Navbar'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const AdminVendors = () => {
    const history = useHistory()
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
    const onDelete = (id) => {
        axios.delete( `http://localhost:5000/api/admin/vendors/${id}`)
        alert("Confirm deletion of this account")
        history.go(0)
    }
    const onUpdate = (id,company,name,email,telephone,address) => {
        localStorage.setItem("adminvendorid",JSON.stringify({id}))
        localStorage.setItem("adminvendor",JSON.stringify({company}))
        localStorage.setItem("adminvendortelephone",JSON.stringify({telephone}))
        localStorage.setItem("adminvendoraddress",JSON.stringify({address}))
        localStorage.setItem("adminvendorname",JSON.stringify({name}))
        localStorage.setItem("adminvendoremail",JSON.stringify({email}))
        history.push('/admin/update-vendor')
    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Registered Suppliers</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Company</th>
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
                        <div className="btn btn-md btn-outline-info" onClick={(() => onUpdate(vendor._id,vendor.company,vendor.representative.name,vendor.representative.email,vendor.telephone,vendor.address))}>Update</div>
                    </div>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-danger" onClick={(() => onDelete(vendor._id))}>Delete</div>
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
