import "./Home.css"
const Home = () => {
    return (
        <div className="container-fluid home-fluid">
            <div className="container about">
                <h5 className="text-center mb-3">Who we are</h5>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
    consequuntur! Commodi minima excepturi repudiandae velit hic maxime</p>
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
                <td>500</td>
                <td>30</td>
                <td>900</td>
                </tr>
                <tr>
                <th scope="row">2020/2021</th>
                <td>789</td>
                <td>34</td>
                <td>1200</td>
                </tr>
                <tr>
                <th scope="row">2019/2020</th>
                <td >600</td>
                <td>30</td>
                <td>800</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
    )
}
export default Home;