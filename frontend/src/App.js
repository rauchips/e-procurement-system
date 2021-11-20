import React from 'react';
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
import CommitteeMembers from "./components/Entity/CommitteeMembers";
import GovernmentLogin from "./components/login/Government"
import SupplierLogin from "./components/login/Supplier"
import AdminSign from "./components/Admin/Sign"
import AdminHome from "./components/Admin/Home"
import AdminEntities from "./components/Admin/Entities"
import AdminVendors from './components/Admin/vendors';
import AdminCommittee from './components/Admin/committee';
import AdminTenders from './components/Admin/Tenders';
import MakeBid from './components/Supplier/makeBid';


const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Home}/>
        <Route path='/government/sign'  component={GovernmentSign}/>
        <Route path='/government/login'  component={GovernmentLogin}/>
        <Route path='/government/home' component={EntityHome}/>
        <Route path='/supplier/sign'  component={SupplierSign}/>
        <Route path='/supplier/login'  component={SupplierLogin}/>
        <Route path='/supplier/home'  component={SupplierHome}/>
        <Route path='/supplier/bid'  component={MakeBid}/>
        <Route path='/government/add-tender'  component={AddTender}/>
        <Route path='/government/committee-members'  component={CommitteeMembers}/>
        <Route path='/committee' exact  component={CommitteeSign}/>
        <Route path='/committee/home'  component={CommitteeHome}/>
        <Route path='/admin' exact component={AdminSign}/>
        <Route path='/admin/home'  component={AdminHome}/>
        <Route path='/admin/entities'  component={AdminEntities}/>
        <Route path='/admin/vendors'  component={AdminVendors}/>
        <Route path='/admin/committee'  component={AdminCommittee}/>
        <Route path='/admin/tenders'  component={AdminTenders}/>
      </Router>
    </div>
  )
}
export default App;
