import React, { useState } from 'react'
import './UpdateOrders.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useAuth } from './context/LoginContext';
import { Navigate ,useNavigate} from 'react-router-dom';


function UpdateUser(props) {

    const [credentials,setCredentials] = useState({name:"",phone_no:"",address:"",password:""})
    const auth = useAuth();
    const navigate=useNavigate();
    const onChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }

      const handleUpdateUser = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/updateuser",{
            customer_id : auth.customer_id,
            name : credentials.name,
            phone_no : credentials.phone_no,
            address : credentials.address,
            password : credentials.password
        }).then(responce => {
            alert(responce.data);
            setCredentials({name:'',phone_no:'',address:'',password:''})
            navigate('/login',{replace:true})
        })
      }

      const closeFunction = ()=>{
        props.setUpdate(false);
    }

  return (
    <div className='mainSignInComponent' style={{"position":"fixed","left":0,"top":0,"zIndex":1}}>
    <div className='subSignInBox'>
        <h1>Update user account</h1>
        <form onSubmit={handleUpdateUser}>

            <TextField fullWidth label="name"  name="name" onChange={onChange}  sx={{"margin":"1vh 0"}} required/>
            <TextField fullWidth label="phone_no"  name="phone_no" onChange={onChange} sx={{"margin":"1vh 0"}} required/>
            <TextField fullWidth label="address"  name="address" onChange={onChange} sx={{"margin":"1vh 0"}} required/>
            <TextField fullWidth label="password"  name="password" onChange={onChange}  sx={{"margin":"1vh 0"}} required/>


            <Button type="submit" variant="outlined" sx={{"margin":"1vh 0"}} >Submit</Button>
            <div>
              <Button variant="text" onClick={closeFunction}>Close</Button>
            </div>
        </form>
    </div>
</div>
  )
}

export default UpdateUser