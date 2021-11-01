import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./components/Home/Home";
import GovernmentSign from "./components/Sign/Government";
import SupplierSign from "./components/Sign/Supplier";
import EntityHome from "./components/Entity/Home";
import SupplierHome from "./components/Supplier/Home";
import AddTender from "./components/Entity/addTender";
import CommitteeSign from "./components/committee/sign";
import CommitteeHome from "./components/committee/home";

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Home}/>
        <Route path='/government/sign'  component={GovernmentSign}/>
        <Route path='/government/home' component={EntityHome}/>
        <Route path='/supplier/sign'  component={SupplierSign}/>
        <Route path='/supplier/home'  component={SupplierHome}/>
        <Route path='/government/add-tender'  component={AddTender}/>
        <Route path='/committee' exact  component={CommitteeSign}/>
        <Route path='/committee/home'  component={CommitteeHome}/>
      </Router>
    </div>
  )
}
export default App;
