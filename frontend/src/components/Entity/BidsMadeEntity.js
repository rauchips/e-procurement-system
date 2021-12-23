import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useHistory, useLocation,Link } from 'react-router-dom';
import CommitteeNavbar from './Navbar';

const BidsMadeEntity = () => {
    const history = useHistory()
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation ();
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)

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
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('tenderId')));
    useEffect (() => {
        // const token =user?.token;
        setTenderId(JSON.parse(localStorage.getItem('tenderId')))
    },[location])
    const onAccept = (id) => {
        axios.patch(`http://localhost:5000/api/government/bid/${id}`)
        history.go(0)
    }
    const onDecline = (id) => {
        axios.patch(`http://localhost:5000/api/government/bid/decline/${id}`)
        history.go(0)
    }
    return (
        <div>
        <CommitteeNavbar/>
        <div className="container mt-5 committee">
            {
                data.length===0?"":<h5 className="text-center mb-3"> These are the bids you have made.</h5>
            }
            {
                isLoading?<div className='loader'></div>:
                <>
                {
                    data.length === 0?<h6 className="mt-5 text-center mb-3 display-4 text-primary">No bids have been made for this tender.</h6>:
                    <>
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
                    bid.tenders === null? <h5 className='text-center mb-4'>No bids made for this tender</h5>:
                    <>
                    {
                    tenderId === bid.tenders._id?

                    <>
                    {
                        bid.status === true ?
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
                    <Link to={`/uploadBid/${bid.filename}`} target="_blank" download><i className='fa fa-download'></i></Link>
                </td>
                {
                    bid.accepted === true?
                    <td>
                    <button className="btn btn-success btn-md" disabled={true} >Accepted</button>
                    </td>:
                    <>
                    {
                        bid.declined ===true?
                        <td>
                        <button className="btn btn-danger btn-md" disabled={true}>Declined</button>
                        </td>:
                        <>
                         <td>
                            <button className="btn btn-success btn-md" onClick={(() => onAccept(bid._id))} >Accept</button>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-md" onClick={(() => onDecline(bid._id))} >Decline</button>
                        </td>
                        </>
                    }
                    </>
                    

                }
                 
                </tr>
                        </>
                        
                        :<h5>This bid is not verified yet</h5>
                    }
                          
                    </>:
                    <h5>No bids made for this tender</h5>
                }
                    </>
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

export default BidsMadeEntity

