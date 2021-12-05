import React,{useState,useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CommitteeNavbar from './Navbar';

const BidsMadeEntity = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation ();
    const history = useHistory ();
    const [data,setData] = useState([]);
   
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            const response = await fetch ("http://localhost:5000/api/admin/bids")
            const result = await response.json()
            console.log(result)
            setData(result.body)
        } catch (error) {
            console.log(error)
        }
    }
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('tenderId')));
    useEffect (() => {
        // const token =user?.token;
        setTenderId(JSON.parse(localStorage.getItem('tenderId')))
    },[location])
    return (
        <div>
        <CommitteeNavbar/>
        <div className="container mt-5 committee">
            <h5 className="text-center mb-3"> These are the bids you have made.</h5>
            <table className="table table-bordered">
        <thead>
            <tr>
            <th scope="col">Bid Id</th>
            <th scope="col">Company Name</th>
            <th scope="col">Date Made</th>
            <th scope="col">Tender Name</th>
            <th scope="col">Status</th>
            <th scope="col">Bid Document</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        
        {data.map(bid => (
                <>
                {
                    tenderId === bid.tenders._id?
                    <>
                          <tr>
                <td>{bid._id}</td>
                <td>{bid.vendor.company}</td>
                <td>{new Date(bid.createdAt).toLocaleDateString(undefined, options)}</td>
                <td>{bid.tenders.title}</td>
                <td>
                {bid.status === true?"Verified":"Not verified" }
                </td>
                <td>
                    {bid.filename}
                    <a href= {`../../../public/uploads/${bid.filename}`} download><i className='fa fa-download'></i></a>
                </td>
                <td>
                    <button className="btn btn-success btn-md">Accept</button>
                </td>
                 
                </tr>
                    </>:
                    <h5>No bids made for this tender</h5>
                }
                </>
              
            ))
        }
         </tbody>
       
        </table>
        </div>
    </div>
    )
}

export default BidsMadeEntity

