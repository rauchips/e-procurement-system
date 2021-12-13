import React,{useState,useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import "./Home.css"
const Home = () => {
    const [tendersData,setTendersData] = useState ([])
    const [committeeData,setCommitteeData] = useState ([])
    const [vendorData,setVendorData] = useState ([])
    const [entityData,setEntityData] = useState ([])




    useEffect (() => {
        getTenderData ()
        getCommitteeData ()
        getVendorData ()
        getEntityData ()



    },[])

    const getTenderData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/tenders")
        const result = await response.json ()
        console.log(result)
        setTendersData(result.count)
    }

    const getCommitteeData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/committees")
        const result = await response.json ()
        console.log(result)
        setCommitteeData(result.count)
    }

    const getVendorData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/vendors")
        const result = await response.json ()
        console.log(result)
        setVendorData(result.count)
    }

    const getEntityData = async () => {
        const response = await fetch ("http://localhost:5000/api/admin/governments")
        const result = await response.json ()
        console.log(result)
        setEntityData(result.count)
    }
    return (
        <>
       <Navbar/>
        <div className="container-fluid home-fluid">
            <div className="container about">
                <h3 className='text-center mb-4'>Welcome to GOK procurement system</h3>
                <div className='row padding'>
                    <div className='col-md-12 col-lg-6 col-sm-12'>
                        <h6>Welcome to our e-procurement portal</h6>
                        <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto</p>
                    <div className='home-buttons'>
                        <button className = "btn btn-primary btn-md">Donor</button>
                        <button className = "btn btn-primary btn-md">Donee</button>
                    </div>
                    </div>
                    <div className='col-lg-6'>
                    <img class="img-fluid" src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                    </div>
                </div>
            </div>
        <div className="container">
        <h5 className="text-center mt-4 mb-4">Summary Statistics</h5>
        <table class="table">
            <thead className="table-dark">
                <tr>
                <th scope="col">Financial Year</th>
                <th scope="col">Number of Tenders</th>
                <th scope="col">PE Registered</th>
                <th scope="col">Suppliers Registered</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">2021/2022</th>
                <td>{tendersData}</td>
                <td>{entityData}</td>
                <td>{vendorData}</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </>
    )
}
export default Home;