import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './Navbar'

const AdminBids = () => {
    const history = useHistory()
    const [bidsData,setBidsData] = useState ([])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/bids")
        const result = await response.json ()
        console.log(result)
        setBidsData(result.body)
    }
    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/bids/${id}`)
        history.go(0)
    }
    const onUpdate = async (id,filename) => {
        localStorage.setItem("adminbidsid",JSON.stringify({id}))
        localStorage.setItem("adminbidsfilename",JSON.stringify({filename}))
        history.push('/admin/update-bid')

    } 
    return (
        <div>
            <AdminNavbar/>
            <div className="container mt-5">
            <h5 className="text-center mb-4">Bids Made</h5>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Bid Id</th>
                <th scope="col">Supplier Compaany</th>
                <th scope="col">Tender</th>
                <th scope="col">Document</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            {
                bidsData.map(bid => (
                    <tbody>
                <tr>
                <td>{bid._id}</td>
                <td>{bid.vendor.company}</td>
                <td>{bid.tenders.title}</td>
                <td>{bid.filename}</td>
                {
                    bid.status === false?<td>Not Verified</td>:<td>Verified</td>
                }
                

                <td>
                
                    <div style={{display:"flex"}}>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-info" onClick={(() => onUpdate (bid._id,bid.filename))} >Update</div>
                    </div>
                    <div className="m-2">
                        <div className="btn btn-md btn-outline-danger" onClick={(() => onDelete(bid._id))}>Delete</div>
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

export default AdminBids
