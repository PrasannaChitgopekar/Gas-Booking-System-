import React,{useEffect, useState} from 'react'
import { useAuth } from './context/LoginContext';
import Navbar from './Navbar';
import './Booking.css'
import { Navigate ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import UpdateOrders from './UpdateOrders';




function Booking() {
  const auth = useAuth();
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({date:"",phone_no_optional:"",address:""});
  const [update , setUpdate] = useState(false);
  useEffect(()=>{
      
  },[update])

  const onChange = (e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmitBooking = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/orders",{
      order_date : credentials.date,
      phone_no_optional : credentials.phone_no_optional,
      delivery_address : credentials.address,
      cst_id : auth.customer_id,
      admin_id : auth.admin_id
    }).then(response => {
      alert('success');
      setCredentials({date:'',phone_no_optional:'',address:''})

   })
  }


  const handleUpdateOrder = (e) =>{
    e.preventDefault();
    setUpdate(true);
 }


  return (
    
   
    <>
    <Navbar/>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"6vh 0"}}>
        <div  style={{fontFamily:"sans-serif",textAlign:"left",textAlign:"center",margin:" 0 5vw"}}>
              <div className="my-3 mx-3 " style={{fontSize:"25px"}}>
              <h1>Gas Booking System</h1><br/>
              <p>Logged in Customer Id is : {auth.customer_id}</p>
                  <p>Customer Name is : {auth.uname}</p>
                  <p>Customer Name is : {auth.number}</p>
                  <p>Customer Name is : {auth.address}</p>
              </div>
          </div>

          <div className="booking ,my-3" style={{alignItems: "center"}}>   
            <br/>
            <form onSubmit={handleSubmitBooking}> 
            <h1>Make Order</h1>
            <input type="date" name="date" value={credentials.date} onChange={onChange} placeholder="Enter date" required ></input>
            <br/><input type="phone_no_optional" name="phone_no_optional" value={credentials.phone_no_optional} onChange={onChange}   placeholder="Enter phone_no" ></input><br/>
            <input type="text" name="address" value={credentials.address} onChange={onChange} placeholder="Enter address" required ></input>
            <button className="button" type="submit" style={{padding: "7px 100px",opacity:"0.9"}}  >submit</button>
            
            </form>
            <button className="button" type="button" style={{padding: "7px 100px",opacity:"0.9"}} onClick={handleUpdateOrder}>Update Order</button>
            {update === true ? <UpdateOrders setUpdate = {setUpdate}/> : <></>}
        </div>
        
  </div>
    </>
  )
}

export default Booking 