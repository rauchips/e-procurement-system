import React,{useEffect,useState} from 'react'
import { useHistory, useLocation,Link } from 'react-router-dom';
import CommitteeNavbar from './Navbar'
import "./committee.css"

const CommitteeHome = () => {
    const history = useHistory()
    const options = { year: "numeric", month: "long", day: "numeric",hour: '2-digit', minute: '2-digit' }
    const location = useLocation ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('committeeprofile')));
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)

    useEffect (() => {
        setUser(JSON.parse(localStorage.getItem('committeeprofile')))
    },[location])
    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        setIsLoading(true)
        const response = await fetch (`http://localhost:5000/api/committee/tender/${user.json.result._id}`)
        const result = await response.json ()
        console.log(result)
        setData(result.tender)
        setIsLoading(false)
    }
    const onClick = (id) => {
        localStorage.setItem('tenderId',JSON.stringify({id}))
        history.push('/committee/view-bids')
    }
    return (
        <div>
            <CommitteeNavbar/>
            <div className="container mt-5 committee">
                {
                    data.length === 0?"":<h5 className="text-center mb-3"> These are the tenders you have been vetted in.</h5>
                }
                {
                    isLoading?<div className='loader'></div>:
                    <>
                        {
                            data.length === 0 ? <h6 className="mt-5 text-center mb-3 display-4 text-primary">You are not vetted to any tender.</h6>:
                            <>
                                <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Tender Id</th>
                <th scope="col">Tender Title</th>
                <th scope="col">Date of Publication</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            
            {data.map(tender => (
                    
                    <tr>
                    <td>{tender._id}</td>
                    <td>{tender.title}</td>
                    <td>{new Date(tender.createdAt).toLocaleDateString(undefined, options)}</td>
                    <td>{new Date(tender.closingAt).toLocaleDateString(undefined, options)}</td>
                    <td>
                    {tender.status === true?"true":"false" }
                    </td>
                    <td>
                        {tender.filename}
                        <Link to={`/uploadTender/${tender.filename}`} target="_blank" download><i className='fa fa-download'></i></Link>
                </td>
                    <td>
                        <button className='btn btn-outline-success btn-md' onClick={(()=> onClick (tender._id))} >View Bids</button>
                    </td>
                    </tr>
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

export default CommitteeHome
