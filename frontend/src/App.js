import React,{Suspense,lazy} from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"




const App = () => {
  const Home = lazy(() => import ("./components/Home/Home"))
  const Tenders = lazy(() => import ("./components/Home/Tenders"))
  const GovernmentSign = lazy(() => import ("./components/Sign/Government"))
  const GovernmentLogin = lazy(() => import ("./components/login/Government"))
  const EntityHome = lazy(() => import ("./components/Entity/Home"))
  const SupplierSign = lazy(() => import ("./components/Sign/Supplier"))
  const SupplierLogin = lazy(() => import ("./components/login/Supplier"))
  const SupplierHome = lazy(() => import ("./components/Supplier/Home"))
  const MakeBid = lazy(() => import ("./components/Supplier/makeBid"))
  const BidsMade = lazy(() => import ("./components/Supplier/BidsMade"))
  const AddTender = lazy(() => import ("./components/Entity/addTender"))
  const CommitteeMembers = lazy(() => import ("./components/Entity/CommitteeMembers"))
  const BidsMadeEntity = lazy(() => import ("./components/Entity/BidsMadeEntity"))
  const CommitteeSign = lazy(() => import ("./components/committee/sign"))
  const CommitteeHome = lazy(() => import ("./components/committee/home"))
  const ViewBids = lazy(() => import ("./components/committee/ViewBids"))
  const AdminSign = lazy(() => import ("./components/Admin/Sign"))
  const AdminHome = lazy(() => import ("./components/Admin/Home"))
  const AdminEntities = lazy(() => import ("./components/Admin/Entities"))
  const AdminVendors = lazy(() => import ("./components/Admin/vendors"))
  const AdminCommittee = lazy(() => import ("./components/Admin/committee"))
  const AdminTenders = lazy(() => import ("./components/Admin/Tenders"))
  const UpdateEntity = lazy(() => import ("./components/Admin/updateEntity"))
  const UpdateVendor = lazy(() => import ("./components/Admin/updateVendor"))
  const UpdateCommittee = lazy(() => import ("./components/Admin/updateCommittee"))
  const Notifications = lazy (() => import ('./components/Supplier/Notifications'))

  return (
    <div>
      <Router>
      <Suspense fallback = {<div className="loader"></div>}>
      <Route path='/' exact component={Home}/>
        <Route path='/tenders' exact component={Tenders}/>
        <Route path='/government/sign'  component={GovernmentSign}/>
        <Route path='/government/login'  component={GovernmentLogin}/>
        <Route path='/government/home' component={EntityHome}/>
        <Route path='/supplier/sign'  component={SupplierSign}/>
        <Route path='/supplier/login'  component={SupplierLogin}/>
        <Route path='/supplier/home'  component={SupplierHome}/>
        <Route path='/supplier/bid'  component={MakeBid}/>
        <Route path='/supplier/bids-made'  component={BidsMade}/>
        <Route path='/supplier/notifications'  component={Notifications}/>
        <Route path='/government/add-tender'  component={AddTender}/>
        <Route path='/government/committee-members'  component={CommitteeMembers}/>
        <Route path='/government/bids-made'  component={BidsMadeEntity}/>
        <Route path='/committee' exact  component={CommitteeSign}/>
        <Route path='/committee/home'  component={CommitteeHome}/>
        <Route path='/committee/view-bids'  component={ViewBids}/>
        <Route path='/admin' exact component={AdminSign}/>
        <Route path='/admin/home'  component={AdminHome}/>
        <Route path='/admin/entities'  component={AdminEntities}/>
        <Route path='/admin/vendors'  component={AdminVendors}/>
        <Route path='/admin/committee'  component={AdminCommittee}/>
        <Route path='/admin/tenders'  component={AdminTenders}/>
        <Route path='/admin/update-entity'  component={UpdateEntity}/>
        <Route path='/admin/update-vendor'  component={UpdateVendor}/>
        <Route path='/admin/update-committee'  component={UpdateCommittee}/>
      </Suspense>
      </Router>
    </div>
  )
}
export default App;
