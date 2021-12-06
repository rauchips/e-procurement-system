import React,{useEffect,useState} from 'react'
import SupplierNavbar from './Navbar'
import { useLocation,useHistory } from 'react-router-dom'
import axios from 'axios'
import "../Sign/Sign.css"

const MakeBid = () => {
    const history = useHistory()
    const location = useLocation ();
    const [selectedFile,setSelectedFile] = useState("");
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('tenderId')));
    useEffect (() => {
        setTenderId(JSON.parse(localStorage.getItem('tenderId')))
    },[location])
    const [tenderName,setTenderName] = useState(JSON.parse(localStorage.getItem('tendername')));
    useEffect (() => {
        setTenderName(JSON.parse(localStorage.getItem('tendername')))
    },[location])
    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    console.log(tenderId.id)
    const onSubmit = (e) => {
        e.preventDefault ()
        const formData = new FormData ()
        formData.append('bid', selectedFile)
        formData.set("tenders",tenderId.id)
        axios.post(`http://localhost:5000/api/vendor/bid/${user.json.result._id}`,formData)
        .then((data) => console.log(data))
        history.push('/supplier/home')
        localStorage.removeItem ("tenderId")
        localStorage.removeItem ("tendername")

    }
    return (
        <div>
            <SupplierNavbar/>
        <div className="container sign mt-5">
            <h5 className="text-center mb-3">Make a bid for this tender ({tenderName.name})</h5>
            <>
            <div className="container login">
                <div className="card">
                    <h6 className="text-center mb-4">Upload your proposal for this tender</h6>
                    <form onSubmit={onSubmit}>
                    <div class="form-group">
                    <label for="exampleFormControlFile1">Add a Document</label>
                    <input type="file" onChange={handleChange} className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-md btn-primary">Upload</button>
                    </div>
                    </form>
                </div>
            </div>
            </>
        </div>
    </div>  
    )
}

export default MakeBid
