import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Navigate ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';

import { useAuth } from './context/LoginContext'
import UpdateUser from './UpdateUser';

function Navbar() {

    const auth = useAuth();

    const [update,setUpdate] = useState(false);
  const navigate=useNavigate();
    const handleLogout = (e) => {
            auth.Logincustomer_id(null);
    }

    const handleDeleteAccount = (e) =>{
      e.preventDefault();
      // navigate("/login",{replace:true});
      axios.post("http://localhost:3001/deleteaccount",{
        cst_id : auth.customer_id,
      }).then(responce => {
        navigate("/login",{replace:true});
      })
    }

    const handleUpdateUserAccount = (e) =>{
      e.preventDefault();
      setUpdate(true);
      }

    

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
  <a className="navbar-brand , mx-3" href="#"><span style={{fontFamily:"revert-layer"}}><HomeIcon/></span></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse , container d-flex justify-content-end" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
        <Link className="nav-link , mx-3" to="/ViewBooking"><span style={{fontFamily:"revert-layer"}}>View_Bookings </span> </Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link , mx-3" to="/deliverynote"><span style={{fontFamily:"revert-layer"}}> Delevery_Note</span> </Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link , mx-3"  to="/Complaints"><span style={{fontFamily:"revert-layer"}}>Complaint</span></Link>
      </li>
      <div className='container d-flex justify-content-between'>
      <button type="button" className="btn btn-primary , mx-3 ,container d-flex justify-content-between  " style={{opacity:"0.9 "}}  onClick={handleUpdateUserAccount} >Update_Account</button>
      {update === true ? <UpdateUser  setUpdate = {setUpdate}/> : <></>}
      <button type="button" className="btn btn-primary , mx-3 ,container d-flex justify-content-between  " style={{opacity:"0.9 "}}  onClick={handleDeleteAccount} >Delete_Account</button>
        <button type="button" className="btn btn-primary , mx-3 ,container d-flex justify-content-between  " style={{opacity:"0.9 "}} onClick={handleLogout}>Logout</button>
        </div>
    </ul>
    
  </div>
</nav>
  )
}

export default Navbar

