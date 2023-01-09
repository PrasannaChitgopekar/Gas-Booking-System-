//npm install @mui/icons-material - 4
//npm install @mui/material @emotion/react @emotion/styled  -5  // ---->after installing these two we can use any react style in "mui"
//npm init -1
//npm i react-router-dom - 2
//npm i cors -3
//npm install -- in frontend


import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React ,{useState , useEffect} from "react";
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './context/LoginContext';
import Booking from './Booking';
import { UserRestrict } from './context/UserRestrict';


import Complaints from './Complaints';
import ViewBookings from './ViewBookings'
import Admin from './Admin';
// import { AdminRestrict } from './context/AdminRestrict';
import { ComplaintRestrict } from './context/ComplaintRestict';
import { ViewRestrict } from './context/ViewRestrict';
import DeliveryNote from './DeliveryNote';




function App() {

  

  return (
    <div >
      
      <AuthProvider>
      <BrowserRouter>  
        <Routes>
          <Route path='/deliverynote' element={<UserRestrict><DeliveryNote/></UserRestrict>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/viewbooking' element={<ViewRestrict><ViewBookings/></ViewRestrict>}></Route>
          <Route path='/Complaints' element={<ComplaintRestrict><Complaints/></ComplaintRestrict>}></Route>
          <Route path="/" element={<UserRestrict><Booking/></UserRestrict>} ></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
       </BrowserRouter>
       </AuthProvider>
    </div>
  );
}

export default App;
