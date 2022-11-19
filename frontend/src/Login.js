import axios from 'axios';
import './Login.css'
import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom';
import { useAuth } from './context/LoginContext';

function Login() {

  //eslint-disable-next-line
    const [userCredentials, setUserCredentials] = useState({phone_no:"",password:""});
    const [adminCredentials, setAdminCredentials] = useState({email:"",apassword:""});

    const auth = useAuth();
    const navigate = useNavigate()


    const handleSubmitAdmin = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:3001/adminlogin',{
        email : adminCredentials.email,
        apassword : adminCredentials.apassword
      }).then(response =>{
        if(response.data.loginStatus === "passwordMatched"){
        auth.Loginadmin_id(response.data.admin_id);
        auth.LoginAname(response.data.name);
        navigate('/admin',{replace:true})
        }
      })
    }

    const handleSubmitUser =  (e) => {
      e.preventDefault();
      axios.post('http://localhost:3001/userlogin',{
        phone_no: userCredentials.phone_no,
        password : userCredentials.password
      }).then(response =>{
        if(response.data.loginStatus === "passwordMatched"){
          auth.Logincustomer_id(response.data.customer_id);
          auth.LoginUname(response.data.name);
          navigate('/',{replace:true})
        }
        // console.log(response)
      })
    }
    const onChange = (e)=>{
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const onChange1 = (e)=>{
      setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value });
  }

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"3vh 0"}}>
{/* <div className="background"> */}
    <div className="login ,my-3" style={{alignItems: "center"}}>
   
         <h1>Admin Login</h1>
            <br/>
            <form onSubmit={handleSubmitAdmin}>
            <input type="email" name="email" value={adminCredentials.email} onChange={onChange1} placeholder="Enter email-id" required ></input>
            <br/><input type="password" name="apassword" value={adminCredentials.apassword} onChange={onChange1}   placeholder="Enter Password" required></input><br/>
            <br/>
            <button className="button"  style={{padding: "7px 100px",opacity:"0.9"}} type="submit"  >Login</button>
            <div>or</div>  
            </form>
            <button className="button" style={{padding: "8px 100px",opacity:"0.9"}} onClick={()=>{navigate("/signup",{replace:true})}}>Register</button>
        </div>
        {/* </div> */}
         {/* <div className="background"> */}
        <div className="login ,my-3" style={{alignItems: "center"}}>
       
             <h1>Customer Login</h1>
                <br/>
                <form onSubmit={handleSubmitUser}>
                <input type="phone_no" name="phone_no" value={userCredentials.phone_no} onChange={onChange} placeholder="Enter phone number" required ></input>
                <br/><input type="password" name="password" value={userCredentials.password} onChange={onChange}   placeholder="Enter Password" required></input><br/>
                <br/>
                <button className="button"  style={{padding: "7px 100px",opacity:"0.9"}}  >Login</button>
                <div>or</div>
                </form>
                <button className="button" style={{padding: "8px 100px",opacity:"0.9"}} onClick={()=>{navigate("/signup",{replace:true})}}>Register</button>
            </div>
            {/* </div> */}
            </div>
  )
}

export default Login