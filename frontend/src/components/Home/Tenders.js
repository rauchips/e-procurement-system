import React,{useEffect,useState} from "react";
import Navbar from "../Navbar/Navbar"


const Tenders = () => {
    const [tendersData,setTendersData] = useState ([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect (() => {
        getData ()
    },[])

    const getData = async () => {
        setIsLoading(true)
        const response = await fetch ("http://localhost:5000/api/admin/tenders")
        const result = await response.json ()
        console.log(result)
        setTendersData(result.body)
        setIsLoading(false)
    }
    return (
        <div>
            <Navbar/>
            {
                    tendersData.length===0?"":
            <h5 className="mt-5 text-center mb-3">All tenders made.</h5>}
            {
                isLoading?<div className="loader"></div>:
                <>
                     {
                    tendersData.length===0?<h6 className="mt-5 text-center mb-3 display-4 text-primary">No tenders have been made.</h6>
                    :
                    <div className="container mt-5">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Entity</th>
                        <th scope="col">Representative Name</th>
                        <th scope="col">Representative Email</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    {
                        tendersData.map(tender => (
                            <tbody>
                        <tr>
                        <td>{tender.title}</td>
                        <td>{tender.rep.entity}</td>
                        <td>{tender.rep.representative.name}</td>
                        <td>{tender.rep.representative.email}</td>
                        {
                            tender.status === false?<td>Active</td>:<td>Inactive</td>
                        }
                        </tr>
                    </tbody>
                        ))
                    }
                    </table>
                    </div>
                    }
                </>
               
               
            }
           
        </div>
    )
}
export default Tenders;