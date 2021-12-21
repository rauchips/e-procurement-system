import React,{useEffect,useState} from "react";
import SupplierNavbar from "./Navbar";
import { useLocation,useHistory,Link } from "react-router-dom";


const SupplierHome = () => {
    const history = useHistory()
    const location = useLocation ();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('vendorprofile')));
    useEffect (() => {
        // const token =user?.token;
        setUser(JSON.parse(localStorage.getItem('vendorprofile')))
    },[location])


    const [tendersData,setTendersData] = useState ([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        try {
            setIsLoading(true)
        const response = await fetch ("http://localhost:5000/api/admin/tenders")
        const result = await response.json ()
        console.log(result)
        setTendersData(result.body)
        setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
        
    }
    const onClick = (id,name) => {
        localStorage.setItem("tenderId",JSON.stringify({id}))
        localStorage.setItem("tendername",JSON.stringify({name}))
        history.push('/supplier/bid')
    } 

   
    return (
        <div>
            <SupplierNavbar/>
            <h5 className="mt-5 text-center mb-3">Welcome, {user.json.result.company} Company</h5>
            <h5 className=" mb-3" style={{marginLeft:"130px"}} >You can place bids to the following tenders</h5>

            <div className="container mt-5">
                {
                    isLoading?<div className="loader"></div>:
                    <>
                        {
                            tendersData.length===0?<h6 className="mt-5 text-center mb-3 display-6 text-primary">No tenders have been made.</h6>:
                            <>
                                <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Representative Name</th>
                <th scope="col">Representative Email</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            {
                tendersData.map(tender => (
                    <tbody>
                <tr>
                <td>{tender.title}</td>
                <td>{tender.rep.representative.name}</td>
                <td>{tender.rep.representative.email}</td>
                {
                    tender.status === false?<td>Active</td>:<td>Inactive</td>
                }
                 <td>
                        {tender.filename}
                        <Link to={`/uploadTender/${tender.filename}`} target="_blank" download><i className='fa fa-download'></i></Link>
                </td>
                <td>
                {
                    tender.status === false?<div style={{display:"flex"}}>
                    <div className="m-2">
                        <button  onClick = {(() => onClick(tender._id,tender.title))} className="btn btn-md btn-success">Bid</button>
                    </div>
                    </div>:<div style={{display:"flex"}}>
                    <div className="m-2">
                        <button disabled={true} className="btn btn-md btn-danger">Closed</button>
                    </div>
                    </div>
                }
                    
                    
                </td>
                </tr>
            </tbody>
                ))
            }
            </table>
                            </>
                        }
                    </>
                }
            
            </div>
        </div>
    )
}
export default SupplierHome;