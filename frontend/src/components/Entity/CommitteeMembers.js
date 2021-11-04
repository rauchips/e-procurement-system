import React, {useState,useEffect} from 'react'
import EntityNavbar from './Navbar'

const CommitteeMembers = () => {
    const [data,setData] = useState([]);
    useEffect (() => {
        getData ()
    })
    const getData = async () => {
        try {
            const response = await fetch ("http://localhost:5000/api/government/committee")
            const result = await response.json ()
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <EntityNavbar/>
            <div className="container login mt-5">
                <h5 className="text-center">Committee Members</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                    data.map (member => (
                        <>
                                <tbody>
                                    <tr>
                                    <td >{member.name}</td>
                                    <td className="text-center">
                                        <button className='btn btn-outline-primary btn-md'>Add</button>
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </>
                            ))
                                 }
                             </table>
            </div>
        </div>
    )
}

export default CommitteeMembers
