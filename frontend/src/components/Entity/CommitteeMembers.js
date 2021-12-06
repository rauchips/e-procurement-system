import React, {useState,useEffect} from 'react'
import EntityNavbar from './Navbar'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

const CommitteeMembers = () => {
    const location = useLocation()
    const history = useHistory()
    const [tenderId,setTenderId] = useState(JSON.parse(localStorage.getItem('tenderId')));
    useEffect (() => {
        // const token =user?.token;
        setTenderId(JSON.parse(localStorage.getItem('tenderId')))
    },[location])
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    useEffect (() => {
        getData ()
        onClick ()
    },[])
    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch ("http://localhost:5000/api/committee/register")
            const result = await response.json ()
            setData(result)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const onClick = async (id) => {
        var members = JSON.parse(localStorage.getItem("committeemembers"));
        if(members == null) members = [];
        localStorage.setItem("member", JSON.stringify(id));
        // Save allEntries back to local storage
       members.push(id);
        localStorage.setItem("committeemembers", JSON.stringify(members));
        history.push('/government/committee-members')
    }
    const [member,setMember] = useState(JSON.parse(localStorage.getItem('committeemembers')));
    useEffect (() => {
        // const token =user?.token;
        setMember(JSON.parse(localStorage.getItem('committeemembers')))
    },[location])
    console.log(member)
    const onSubmit = (e) => {
        e.preventDefault ()
        const post = {
            committee:member
        }
        axios.patch (`http://localhost:5000/api/government/committee/${tenderId}`,post)
        history.push("/government/home")
    }

    return (
        <div>
            <EntityNavbar/>
            <div className="container login mt-5">
            {
                data.length===0?"":<h5 className="text-center">Committee Members</h5>
            }
                {
                    isLoading?<div className='loader'></div>:
                    <>
                        {
                            data.length === 0?<h6 className="mt-5 text-center mb-3 display-4 text-primary">No members are registered for this tender.</h6>:
                            <>
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
                                        <button className='btn btn-outline-primary btn-md' onClick={(() =>onClick(member._id))} >Add</button>
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </>
                            ))
                                 }
                             </table>
            <form onSubmit={onSubmit}>
            <div className='text-center mt-4'>
                <button className='btn btn-primary btn-md' >Add</button>
            </div>
            </form> 
                            </>
                        }
                    </>
                }
                            
            </div>
            
           
        </div>
    )
}

export default CommitteeMembers
