import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import EntityNavbar from "./Navbar";


const EntityHome = () => {
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('entityprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('entityprofile')))
    },[location])

    const [data,setData] = useState ([]);
    const [documentData,setDocumentData] = useState ([]);
    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            const response = await fetch (`http://localhost:5000/api/government/tender/${user.json.result._id}`)
            const result = await response.json ()
            setData(result)
            console.log (result)
        } catch (error) {
            console.log(error)
        }
        try {
            const response = await fetch (`http://localhost:5000/api/government/upload/${user.json.result._id}`)
            const result = await response.json ()
            setDocumentData(result)
            console.log (result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <EntityNavbar/>
            <h5 className="mt-5 text-center mb-3">Ministry of {user.json.result.entity}</h5>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.representative.name}</h5>
            <div className="container mt-4">
            <Link to="/government/add-tender">
            <button className="btn-outline-primary btn-lg">Create new Tender + </button>
            </Link>
            </div>
            <div className="container mt-5">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Tender Id</th>
                <th scope="col">Tender Title</th>
                <th scope="col">Date of Publication</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                </tr>
            </thead>
            {
                data.map (tender => (
                    <>
                    <td>{tender._id} </td>
                    <td>{tender.title} </td>
                    <td>{tender.createdAt}</td>
                    <td>{tender.closingAt} </td>
                    {tender.status === true? <td>True</td>:<td>False</td> }

                    </>
                ) )
            }
            {
                documentData.map(document => (
                    <td>
                        {document.filename}
                        <a href= {`../../../public/uploads/${document.filename}`} download><i className='fa fa-download'></i></a>
                    </td>
                ))
            }

            <tbody>
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default EntityHome;