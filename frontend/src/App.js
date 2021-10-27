import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import GovernmentSign from "./components/Sign/Government";
import SupplierSign from "./components/Sign/Supplier";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Route path='/' exact component={Home}/>
        <Route path='/government/sign' exact component={GovernmentSign}/>
        <Route path='/supplier/sign' exact component={SupplierSign}/>
      </Router>
    </div>
  )
}
export default App;
