import React,{useState,useEffect} from 'react'
import EntityNavbar from './Navbar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {useHistory,useLocation} from "react-router-dom"

const AddTender = () => {
    const history = useHistory ();
    const location = useLocation ();
    const initialState = {title:'',category:'',document:""}
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState(initialState)
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])
    console.log(formData)

    const onSubmit = (e) => {
        e.preventDefault()
        const date = startDate

        const post = {
            date,
            formData
        }
        console.log(post)
        axios.post(`http://localhost:5000/api/government/tender/${user.json._id}`,post)
        .then(() => console.log("successful"))
        history.push("/government/home")
    }
    return (
        <>
        <EntityNavbar/>
        <div className='container sign'>
            <div className='container login'>
            <form onSubmit={onSubmit}>
                <div className="card">
                    <h5 className='text-center mb-3'>Add Tender</h5>
                    <div className="mb-3">
                        <label for="exampleInputEmail1"  className="form-label">Title</label>
                        <input onChange={handleChange} type="text" name="title"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1"  className="form-label">Category</label>
                        <input onChange={handleChange} type="text" name="category" className="form-control" id="exampleInputPassword1"/>
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
                        <input type="file" name='document' className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-outline-success btn-md">Add</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}

export default AddTender
