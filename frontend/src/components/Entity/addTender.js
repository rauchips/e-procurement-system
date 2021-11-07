import React,{useState,useEffect} from 'react'
import EntityNavbar from './Navbar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useHistory,useLocation} from "react-router-dom"
import axios from "axios"

const AddTender = () => {
    const history = useHistory ();
    const location = useLocation ();
    const initialState = {title:'',category:'',document:""}
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState(initialState)
    const [data,setData] = useState([]);
    const [selectedFile,setSelectedFile] = useState("");
    const [member,setMember] = useState(JSON.parse(localStorage.getItem('committeemembers')));
    useEffect (() => {
        // const token =user?.token;
        setMember(JSON.parse(localStorage.getItem('committeemembers')))
    },[location])
    useEffect (() => {
        getData ()
    },[])
    const getData = async () => {
        try {
            const response = await fetch ("http://localhost:5000/api/committee/register")
            const result = await response.json ()
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleFileChange =(e) => {
        setSelectedFile({selectedFile:e.target.value})
    }        
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])
    console.log(selectedFile)

    const onSubmit = (e) => {
        e.preventDefault()
        const date = startDate

        const post = {
            closingAt:date,
            committee:member,
            rep:user.json.result._id,
            title:formData.title
        }
        console.log(member)
        console.log(post)
        axios.post(`http://localhost:5000/api/government/tender/${user.json.result._id}`,post)
        .then((data) => console.log(data))
        // localStorage.removeItem("committeemembers")
        // history.push("/government/home")
    }
    const onClick = async (id) => {
        var members = JSON.parse(localStorage.getItem("committeemembers"));
        if(members == null) members = [];
        localStorage.setItem("member", JSON.stringify(id));
        // Save allEntries back to local storage
       members.push(id);
        localStorage.setItem("committeemembers", JSON.stringify(members));
    }
    return (
        <>
        <EntityNavbar/>
        <div className='container sign'>
            <div className='card'>
            <form onSubmit={onSubmit}>
                <div className="row padding">
                    
                    <div className="col-md-12 col-sm-12 col-lg-6">
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
                        <input type="file" onChange={handleFileChange} className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
               
                </div>
                </div>
                <div className="col-lg-6">
                <div className="card">
                <h5 className="text-center">Add 3 Committee Members</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                    data.map (member => (
                        <>
                                <tbody>
                                    <tr>
                                    <td >{member.name}</td>
                                    <td className="text-center">
                                        <button className='btn btn-outline-primary btn-md' onClick={(() =>onClick(member._id))} >Add</button>
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </>
                            ))
                                 }
                             </table>
            </div>
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
