import React,{useEffect,useState} from 'react'
import { useLocation,useHistory } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './Navbar';
import "../Sign/Sign.css";


const UpdateBids = () => {
    const history = useHistory()
    const location = useLocation ();
    const [selectedFile,setSelectedFile] = useState("");
    const [BidId,setBidId] = useState(JSON.parse(localStorage.getItem('adminbidsid')));
    useEffect (() => {
        setBidId(JSON.parse(localStorage.getItem('adminbidsid')))
    },[location])
    const [bidFileName,setBidFileName] = useState(JSON.parse(localStorage.getItem('adminbidsfilename')));
    useEffect (() => {
        setBidFileName(JSON.parse(localStorage.getItem('adminbidsfilename')))
    },[location])
    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault ()
        const formData = new FormData ()
        formData.append('bid', selectedFile)
        axios.patch(`http://localhost:5000/api/admin/bids/${BidId.id}`,formData)
        .then((data) => console.log(data))
        alert ("the bid has been updated successfully")
        history.push('/admin/bids')

    }
    return (
        <div>
            <AdminNavbar/>
            <div className="container sign mt-5">
                <>
                    <h5 className="text-center mb-3">Bids Update</h5>
                  <div className="container login">
                <form onSubmit={onSubmit}>
                            <div className="card">
                            <div class="form-group">
                            <label for="exampleFormControlFile1">Add a Document to update this document ({bidFileName.filename})</label><br/>
                            <input type="file" onChange={handleChange} className="form-control-file" id="exampleFormControlFile1"/>
                            </div>
                            <div className="text-center mt-4">
                                <button className="btn btn-md btn-primary">Update</button>
                            </div>
                            </div>
                </form>
                </div>
                </>
            </div>
        </div>
    )
}

export default UpdateBids
