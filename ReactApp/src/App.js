import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Popper from 'popper.js';
import Navbar from './StaticPage/Navbar';
import './assets/css/Common.css';
import HomePage from './StaticPage/HomePage';
import Login from './StaticPage/Login';
import ForgotPassword from './StaticPage/ForgotPassword';
import Register from './StaticPage/Register';
import UsersDashboard from './User/UsersDashboard';
import AddUserLeave from './User/AddUserLeave';
import ViewUserLeave from './User/ViewUserLeave';
import ViewSpecific from './User/ViewSpecific';
import ViewApproovedLeave from './User/ViewApproovedLeave';
import ViewRejectedLeave from './User/ViewRejectedLeave';
import EditLeave from './Admin/EditLeave';
import Cookies from 'universal-cookie';
import RedirectPage from './User/RedirectPage';
import RedirectPageSideFooter from './User/RedirectPageSideFooter';
import PageNotFound from './StaticPage/PageNotFound';
import Logout from './Admin/Logout';
import LoaderDesign from './Admin/LoaderDesign';

function App() {

  const cookies = new Cookies();
  const [login, setLogin] = useState(false);
  const [cookie, setCookie] = useState("");

  const cookieornot = () => {

    const res = cookies.get('tokens');
    if (res !== undefined) {
      setLogin(true);
    } else { setLogin(false); }
    setCookie(res);
  }

  useEffect(() => {
    cookieornot();
  }, [])

  const setUserLogin = (val) => {
    setLogin(val);
  }

  return (
    <>
      <Router>
        <Suspense fallback={<LoaderDesign />}></Suspense>
        <RedirectPage val={login} cookieval={cookie} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login loginnot={setUserLogin} />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<UsersDashboard />} />
          <Route exact path="/addleaverequest" element={<AddUserLeave />} />
          <Route exact path="/viewleaverequest" element={<ViewUserLeave tableid="viewleave" />} />
          <Route exact path="/approovedleaverequest" element={<ViewApproovedLeave tableid="viewapproovedtable" />} />
          <Route exact path="/rejectedleaverequest" element={<ViewRejectedLeave tableid="viewrejectedtable" />} />
          <Route exact path="/leave/show/:id" element={<ViewSpecific />} />
          <Route exact path='/leave/edit/:id' element={<EditLeave />} />
          <Route exact path='/myprofile' element={<EditLeave loginnot={setUserLogin} />} />
          <Route exact path='/admin/allrequest' element={<EditLeave />} />
          <Route exact path='/admin/approovedleave' element={<EditLeave />} />
          <Route exact path='/admin/rejectedleave' element={<EditLeave />} />
          <Route exact path='/changepassword' element={<EditLeave />} />
          <Route exact path='/logout' element={<Logout val={login} loginnot={setUserLogin} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <RedirectPageSideFooter val={login} />
      </Router>


    </>
  );
}

export default App;
