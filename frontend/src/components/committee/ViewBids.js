import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useHistory, useLocation,Link } from 'react-router-dom';
import CommitteeNavbar from './Navbar';

const ViewBids = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation ();
    const history = useHistory ();
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState (false)
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('tenderId')));
    useEffect (() => {
        // const token =user?.token;
        setTenderId(JSON.parse(localStorage.getItem('tenderId')))
    },[location])

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch ("http://localhost:5000/api/admin/bids")
            const result = await response.json()
            console.log(result)
            setData(result.body)
            setIsLoading (false)
        } catch (error) {
            console.log(error)
        }
    }
    const onClick = (id) => {
        axios.patch(`http://localhost:5000/api/committee/bid/${id}`)
        history.go(0)
    }
    return (
        <div>
            <CommitteeNavbar/>
            <div className="container mt-5 committee">
                {
                    isLoading? <div className="loader"></div>:
                    <>
                        {
                            data.length === 0 ? <h6 className="mt-5 text-center mb-3 display-4 text-primary">Currently there are no bids for this tender.</h6>:
                            <>
                                <h5 className="text-center mb-3"> These are the bids made for this tender.</h5>
                <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Bid Id</th>
                <th scope="col">Company Name</th>
                <th scope="col">Date Made</th>
                <th scope="col">Tender Name</th>
                <th scope="col">Status</th>
                <th scope="col">Bid Document</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            
            {data.map(bid => (
                    <>
                    {
                        tenderId.id === bid.tenders._id?
                        <>
                              <tr>
                    <td>{bid._id}</td>
                    <td>{bid.vendor.company}</td>
                    <td>{new Date(bid.createdAt).toLocaleDateString(undefined, options)}</td>
                    <td>{bid.tenders.title}</td>
                    <td>
                    {bid.status === true?"true":"false" }
                    </td>
                    <td>
                        {bid.filename}
                        <Link to={`/uploadBid/${bid.filename}`} target="_blank" download><i className='fa fa-download'></i></Link>
                    </td>
                    {bid.status === true?
                        <td>
                            <button className='btn btn-success btn-md' disabled={true} >Verified</button>
                        </td>
                    :
                    <td>
                        <button className='btn btn-dark btn-md' onClick={(() => onClick(bid._id))} >Verify</button>
                    </td>
                     }
                     
                    </tr>
                        </>:
                        <h5>There are no bids yet for this tender</h5>
                    }
                    </>
                  
                ))
            }
             </tbody>
           
            </table>
                            </>
                        }
                    </>
                }
                
            </div>
        </div>
    )
}

export default ViewBids
