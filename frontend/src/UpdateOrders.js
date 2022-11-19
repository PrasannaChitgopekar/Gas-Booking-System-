import React, { useState } from 'react'
import './UpdateOrders.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function UpdateOrders(props) {
    const closeFunction = ()=>{
        props.setUpdate(false);
    }


    const [credentials,setCredentials] = useState({order_id:"",phone_no:"",address:""})

    const handleUpdateOrders = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:3001/editorders",{
        order_id : credentials.order_id,
        phone_no : credentials.phone_no,
        address : credentials.address
      }).then(responce=>{
        alert(responce.data);
        setCredentials({order_id:'',phone_no:'',address:''})
      })

    }

    const onChange = (e)=>{
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


  return (
    <div className='mainSignInComponent' style={{"position":"fixed","left":0,"top":0,"zIndex":1}}>
        <div className='subSignInBox'>
            <h1>Update Orders</h1>
            <form onSubmit={handleUpdateOrders}>

                <TextField fullWidth label="order_id"  name="order_id" onChange={onChange}  sx={{"margin":"1vh 0"}} required/>

                <TextField fullWidth label="phone_no"  name="phone_no" onChange={onChange} sx={{"margin":"1vh 0"}} required/>
                <TextField fullWidth label="address"  name="address" onChange={onChange} sx={{"margin":"1vh 0"}} required/>

                <Button type="submit" variant="outlined" sx={{"margin":"1vh 0"}} >Submit</Button>
                <div>
                  <Button variant="text" onClick={closeFunction}>Close</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateOrders