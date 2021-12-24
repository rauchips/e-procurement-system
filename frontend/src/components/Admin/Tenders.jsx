import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './Navbar'

const AdminTenders = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const history = useHistory ();
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
    const onDelete = async (id) => {
        await axios.delete (`http://localhost:5000/api/admin/tenders/${id}`)
        history.go(0)
    }
    const onUpdate = async (id,title,filename) => {
        localStorage.setItem("admintenderid",JSON.stringify({id}))
        localStorage.setItem("admintendertitle",JSON.stringify({title}))
        localStorage.setItem("admintenderfilename",JSON.stringify({filename}))
        history.push ('/admin/update-tender')

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
                <th scope="col">Document</th>
                <th scope="col">Closing Date</th>
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
                <td>{tender.filename}</td>
                <td>{new Date(tender.closingAt).toLocaleDateString(undefined, options)}</td>
                {
                    tender.status === false?<td>Active</td>:<td>Closed</td>
                }
                <td>
                    <div style={{display:"flex"}}>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-info" onClick={(() => onUpdate(tender._id,tender.title,tender.filename))} >Update</div>
                    </div>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-danger" onClick={(() => onDelete (tender._id))}>Delete</div>
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
