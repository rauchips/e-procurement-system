import React,{useState,useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import EntityNavbar from "./Navbar";
import axios from "axios"


const EntityHome = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation();
    const history = useHistory ()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])

    const [data,setData] = useState ([]);
    const [isLoading,setIsLoading] = useState(false)
    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch (`http://localhost:5000/api/government/tender/${user.json.result._id}`)
            const result = await response.json ()
            console.log(result)
            setData(result)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
       
    }
    
    const onClick = () => {
        history.push("/government/add-tender")
        localStorage.removeItem('committeemembers')
        localStorage.removeItem('member')
    }

    const onClose = (id) => {
        axios.patch (`http://localhost:5000/api/government/tender/${id}`)
        history.go(0)
    }

    return (
        <div>
            <EntityNavbar/>
            <h5 className="mt-5 text-center mb-3">Ministry of {user.json.result.entity}</h5>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.representative.name}</h5>
            <div className="container mt-4">
            <button className="btn-outline-primary btn-lg" onClick={onClick} >Create new Tender + </button>
            </div>
            <div className="container mt-5">
                {
                    isLoading?<div className='loader'></div>:
                    <div>
                        {
                            data.length === 0? <h6 className="mt-5 text-center mb-3 display-6 text-primary">You have not made any tender.</h6>:
                            <>
                                 <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Tender Title</th>
                <th scope="col">Date of Publication</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                <th scope="col">Bids</th>
                <th scope="col">Committee</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>

            {
                data.map (tender => (
                    <>
                    <tr>
                    <td>{tender.title} </td>
                    <td>{new Date(tender.createdAt).toLocaleDateString(undefined, options)}</td>
                    <td>{new Date(tender.closingAt).toLocaleDateString(undefined, options)} </td>
                    {tender.status === false? <td>Active</td>:<td>Closed</td> }
                    <td>
                        {tender.filename}
                        <Link to={`/uploadTender/${tender.filename}`} target="_blank" download><i className='fa fa-download'></i></Link>
                        {/* <a href= {`uploadTender/${tender.filename}`} download={tender.filename}><i className='fa fa-download'></i></a> */}
                    </td>
                    {
                        tender.committee.length === 0?  
                    <td>
                        <button className='btn btn-primary btn-md' disabled={true} >View Bids</button>
                    </td>
                    :  
                    <td>
                        <Link to = '/government/bids-made'>
                        <button className='btn btn-primary btn-md'  onClick={(() => localStorage.setItem("tenderId", JSON.stringify(tender._id)) )}>View Bids</button>
                        </Link>
                    </td>
                    }
                    {
                        tender.committee.length === 0?  
                    <td>
                        <Link to = '/government/committee-members'>
                        <button className='btn btn-primary btn-md' onClick={(() => localStorage.setItem("tenderId", JSON.stringify(tender._id)) )}>Add member</button>
                        </Link>
                    </td>
                    :  
                    <td>
                        <button className='btn btn-primary btn-md' disabled ={true}>already exists</button>
                    </td>
                    }
                    {
                        tender.committee.length > 0 && tender.status === false ?  
                    <td>
                        <button className='btn btn-danger btn-md' onClick={(()=>onClose (tender.rep._id))} >Close</button>
                    </td>
                    :  
                    <td>
                        <button className='btn btn-danger btn-md' disabled ={true}>closed</button>
                    </td>
                    
                    }
                    </tr>
                    </>
                ) )
            }
            </tbody>
            </table>
                            </>
                        }
                    </div>
                }

            </div>
        </div>
    )
}
export default EntityHome;