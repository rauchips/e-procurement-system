import React,{useState,useEffect} from 'react'
import EntityNavbar from './Navbar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useHistory,useLocation} from "react-router-dom"
import axios from "axios"
import "../Sign/Sign.css"

const AddTender = () => {
    const history = useHistory ();
    const location = useLocation ();
    const initialState = {title:'',category:''}
    const [startDate, setStartDate] = useState(new Date());
    const [inputData, setInputData] = useState(initialState)
    const [selectedFile,setSelectedFile] = useState("");
    const [member,setMember] = useState(JSON.parse(localStorage.getItem('committeemembers')));
    useEffect (() => {
        // const token =user?.token;
        setMember(JSON.parse(localStorage.getItem('committeemembers')))
    },[location])
    const handleChange =(e) => {
        setInputData({...inputData,[e.target.name]:e.target.value})
    }
    const handleFileChange =(e) => {
        setSelectedFile(e.target.files[0])
    }        
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    console.log(selectedFile)
    useEffect (() => {
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])

    const onSubmit = (e) => {
        e.preventDefault()
        const date = startDate
        const formData = new FormData ()
        formData.append('tender', selectedFile)
        formData.set("closingAt",date)
        formData.set("rep",user.json.result._id)
        formData.set("title",inputData.title)

        console.log(user.json.result._id)
        console.log(member)

        axios.post(`http://localhost:5000/api/government/tender/${user.json.result._id}`,formData)
        .then((res) => console.log(res))
        alert ("Confirm uploading of this tender")
        history.push("/government/home")
       

    }

   
    return (
        <>
        <EntityNavbar/>
        <div className='container add-tender'>
                    
                    <form onSubmit={onSubmit}>
                    <div className="card">
                    <h5 className='text-center mb-3'>Add Tender</h5>
                    <div className="mb-3">
                        <label for="exampleInputEmail1"  className="form-label">Title</label>
                        <input required onChange={handleChange} type="text" name="title"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1"  className="form-label">Category</label>
                        <input required onChange={handleChange} type="text" name="category" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1"  className="form-label">Closing At</label>
                        <DatePicker
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
                    <div class="form-group">
                    <label for="exampleFormControlFile1">Add a Document</label>
                    <input required type="file" onChange={handleFileChange} className="form-control-file" id="exampleFormControlFile1"/>
                </div>
                   
               
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-success btn-lg">Add</button>
                </div>
               
                </form>

                
               

           
        </div>
        </>
    )
}

export default AddTender
