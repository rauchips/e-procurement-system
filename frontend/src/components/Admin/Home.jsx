import React,{useEffect,useState} from 'react'
import AdminNavbar from './Navbar'
import "./home.css"
import CountUp from 'react-countup';
import {Bar,Pie,Line} from "react-chartjs-2"

const AdminHome = () => {
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
        <div>
           <AdminNavbar/>
           <div className="container charts">
            <div className="row padding">
                <div className="col-sm-12 col-lg-3 col-md-6">
                    <div className="card count">
                        <h5>Entities Registered</h5>
                        <h6>
                        <CountUp
                            start={0}
                            end={entityData}
                            duration={2.75}
                            separator=" "
                            decimal=","
                        />
                        </h6>
                    </div>
                </div>
                <div className="col-lg-3">
                <div className="card count">
                        <h5>Suppliers Registered</h5>
                        <h6>
                        <CountUp
                            start={0}
                            end={vendorData}
                            duration={2.75}
                            separator=" "
                            decimal=","
                        />
                        </h6>
                    </div>
                </div>
                <div className="col-lg-3">
                <div className="card count">
                        <h5>Committee Registered</h5>
                        <h6>
                        <CountUp
                            start={0}
                            end={committeeData}
                            duration={2.75}
                            separator=" "
                            decimal=","
                        />
                        </h6>
                    </div>
                </div>
                <div className="col-lg-3">
                <div className="card count">
                        <h5>Tenders Made</h5>
                        <h6>
                        <CountUp
                            start={0}
                            end={tendersData}
                            duration={2.75}
                            separator=" "
                            decimal=","
                        />
                        </h6>
                    </div>
                </div>
            </div>
            <div className="row padding">
                <div className="col-lg-4 col-sm-12 col-md-12">
                    <div className="card graph">
                    <Bar
                        height={400}
                        width={500}
                        data= {{
                            labels: ['Entities', 'vendors','committee','tenders'],
                            datasets: [{
                                label: 'Registered members and tenders',
                                data: [entityData,vendorData,committeeData,tendersData],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor:[
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                        options= {{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            maintainAspectRatio:false
                        }}

                    />
                    </div>
                </div>
                <div className="col-lg-4">
                <div className="card graph">
                <Pie
                    height={400}
                    width={500}
                    data= {{
                        labels: ['Entities', 'vendors','committee','tenders'],
                        datasets: [{
                            data: [entityData,vendorData,committeeData,tendersData],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor:[
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    options= {{
                    
                        maintainAspectRatio:false
                    }}
                />
                    </div>
                </div>
                <div className="col-lg-4">
                <div className="card graph">
                <Line
                height={400}
                width={500} 
                    data = {
                        {
                            labels: ['Entities', 'vendors','committee','tenders'],
                            datasets: [
                              {
                                label: 'Registered members and tenders',
                                data: [entityData,vendorData,committeeData,tendersData],
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.2)',
                              },
                            ],
                          }
                    }
                    options= {{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        maintainAspectRatio:false
                    }}

                />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AdminHome
