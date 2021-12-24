import React,{useState,useEffect} from 'react'
import AdminNavbar from './Navbar'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation,useHistory } from 'react-router-dom';
import axios from 'axios';
import "../Sign/Sign.css";


const UpdateTenders = () => {
    const history = useHistory()
    const location = useLocation ();
    const [selectedFile,setSelectedFile] = useState("");
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('admintenderid')));
    const [tenderTitle,setTenderTitle] = useState(JSON.parse(localStorage.getItem('admintendertitle')));
    const [tenderFileName,setTenderFileName] = useState(JSON.parse(localStorage.getItem('admintenderfilename')));
    const [startDate, setStartDate] = useState(new Date());
    const initialState = {title:''}
    const [inputData, setInputData] = useState(initialState)
    const handleChange =(e) => {
        setInputData({...inputData,[e.target.name]:e.target.value})
    }
    const handleFileChange =(e) => {
        setSelectedFile(e.target.files[0])
    }    
    useEffect (() => {
        setTenderId(JSON.parse(localStorage.getItem('admintenderid')))
        setTenderFileName(JSON.parse(localStorage.getItem('admintenderfilename')))
        setTenderTitle(JSON.parse(localStorage.getItem('admintendertitle')))

    },[location])
    
    const onSubmit = (e) => {
        e.preventDefault ()
        const date = startDate
        const formData = new FormData ()
        formData.append('tender', selectedFile)
        formData.set("closingAt",date)
        formData.set("title",inputData.title)
        axios.patch(`http://localhost:5000/api/admin/tenders/${tenderId.id}`,formData)
        .then((data) => console.log(data))
        alert ("the tender has been updated successfully")
        history.push('/admin/tenders')

    }
    return (
        <div>
        <AdminNavbar/>
        <div className="container sign mt-5">
            <>
                <h5 className="text-center mb-3">Tender Update</h5>
              <div className="container login">
            <form onSubmit={onSubmit}>
                        <div className="card">
                            <div className="mb-3">
                                <label for="exampleInputEmail1"  className="form-label">Title</label>
                                <input required onChange={handleChange} type="text" name="title"  className="form-control" id="exampleInputEmail1" placeholder={tenderTitle.title} aria-describedby="emailHelp"/>
                            </div>
                            <div class="form-group mb-3">
                            <label for="exampleFormControlFile1">Add a Document to update this document ({tenderFileName.filename})</label><br/>
                            <input required type="file" onChange={handleFileChange} className="form-control-file" id="exampleFormControlFile1"/>
                            </div>
                            <div className="mb-3">
                        <label for="exampleInputPassword1"  className="form-label">Closing At</label>
                        <DatePicker
                            required
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control date"
                        />
                    </div>
                        </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary btn-md">Update</button>
                </div>
            </form>
            </div>
            </>
        </div>
    </div>
    )
}

export default UpdateTenders
