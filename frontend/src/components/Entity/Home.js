import React,{useState,useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import EntityNavbar from "./Navbar";


const EntityHome = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation();
    const history = useHistory ()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])

    const [data,setData] = useState ([]);
    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            const response = await fetch (`http://localhost:5000/api/government/tender/${user.json.result._id}`)
            const result = await response.json ()
            console.log(result)
            setData(result)
        } catch (error) {
            console.log(error)
        }
       
    }
    
    const onClick = () => {
        history.push("/government/add-tender")
        localStorage.removeItem('committeemembers')
        localStorage.removeItem('member')
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
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Tender Title</th>
                <th scope="col">Date of Publication</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                <th scope="col">Committee</th>
                </tr>
            </thead>
            {
                data.map (tender => (
                    <>
                    <td>{tender.title} </td>
                    <td>{new Date(tender.createdAt).toLocaleDateString(undefined, options)}</td>
                    <td>{new Date(tender.closingAt).toLocaleDateString(undefined, options)} </td>
                    {tender.status === true? <td>True</td>:<td>False</td> }
                    <td>
                        {tender.filename}
                        <a href= {`../../../public/uploads/${tender.filename}`} download><i className='fa fa-download'></i></a>
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
                        <button className='btn btn-info btn-md' onClick={(() => localStorage.setItem("tenderId", JSON.stringify(tender._id)) )}>Add</button>
                        </Link>
                    </td>
                    :  
                    <td>
                        <button className='btn btn-info btn-md' disabled ={true}>already exists</button>
                    </td>
                    }

                    </>
                ) )
            }
            <tbody>
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default EntityHome;