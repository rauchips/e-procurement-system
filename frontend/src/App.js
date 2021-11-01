import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import GovernmentSign from "./components/Sign/Government";
import SupplierSign from "./components/Sign/Supplier";
import EntityHome from "./components/Entity/Home";
import SupplierHome from "./components/Supplier/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Route path='/' exact component={Home}/>
        <Route path='/government/sign' exact component={GovernmentSign}/>
        <Route path='/government/home' exact component={EntityHome}/>
        <Route path='/supplier/sign' exact component={SupplierSign}/>
        <Route path='/supplier/home' exact component={SupplierHome}/>
      </Router>
    </div>
  )
}
export default App;
