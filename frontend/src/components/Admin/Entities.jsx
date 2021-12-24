import React,{ useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './Navbar'
import axios from 'axios'
const AdminEntities = () => {
    const history = useHistory ()
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
    const onDelete = (id) => {
        axios.delete( `http://localhost:5000/api/admin/governments/${id}`)
        alert("Confirm deletion of this account")
        history.go(0)
    }
    const onUpdate = (id,entity,name,email,telephone,county,address,website) => {
        localStorage.setItem("adminentityid",JSON.stringify({id}))
        localStorage.setItem("adminentity",JSON.stringify({entity}))
        localStorage.setItem("admintelephone",JSON.stringify({telephone}))
        localStorage.setItem("admincounty",JSON.stringify({county}))
        localStorage.setItem("adminaddress",JSON.stringify({address}))
        localStorage.setItem("adminwebsite",JSON.stringify({website}))
        localStorage.setItem("adminentityname",JSON.stringify({name}))
        localStorage.setItem("adminentityemail",JSON.stringify({email}))
        history.push('/admin/update-entity')
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
                        <div className="btn btn-md btn-outline-info" onClick = {(() => onUpdate (entity._id,entity.entity,entity.representative.name,entity.representative.email,entity.telephone,entity.county,entity.address,entity.website))}>Update</div>
                    </div>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-danger"  onClick ={(() => onDelete (entity._id))}  >Delete</div>
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
