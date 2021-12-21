import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CommitteeNavbar from './Navbar';
import "./Supplier.css"


const Notifications = () => {
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation ();
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState (false)
   
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
    return (
        <div>
        <CommitteeNavbar/>
        <div className="container mt-5 committee">
            {
                isLoading? <div className='loader'></div>:
                <>
                    {
                        data.length === 0? <h6 className="mt-5 text-center mb-3 display-6 text-primary">No notifications.</h6>:
                        <>
        
        {data.map(bid => (
                <>
                {
                    bid.vendor._id === user.json.result._id?
                    <div className='container notifications' >
                        {
                            bid.accepted === true? 
                            <div className='card'>
                                <p className='text-success lead'>{new Date(bid.createdAt).toLocaleDateString(undefined, options)}</p>
                                <p className='text-success lead'>Your bid request on the tender {bid.tenders.title}, bid id {bid._id}, has been accepted, further details will be communicated as soon as possible</p>
                            </div>
                        :""}
                        {
                            bid.declined === true?
                            <div className='card'>
                                <p className='text-danger lead'>{new Date(bid.createdAt).toLocaleDateString(undefined, options)}</p>
                                <p className='text-danger lead'>Unfortunately your bid request on the tender {bid.tenders.title},  bid id {bid._id}, has been declined, we did not find your bid appealing for this tender.</p>
                            </div>
                        :""}
                    </div>
                    :""
                }
                </>
              
            ))
        }
        
                        </>
                    }
                </>
            }
           
        </div>
    </div>
    )
}

export default Notifications
