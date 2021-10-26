import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Sign from "./components/Sign/Sign";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Route path='/' exact component={Home}/>
        <Route path='/sign' exact component={Sign}/>
      </Router>
    </div>
  )
}
export default App;
