import React,{useState} from 'react'
import axios from "axios"
import "./Signup.css"
import {useNavigate} from "react-router-dom"
function Signup() {
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        aadhar_no: "",
        phone_no: "",
        password: "",
        address:"",
      });


      const [adminCredentials, setAdminCredentials] = useState({
        admin_name: "",
        admin_email:"",
        admin_password: "",
      });

    const navigate = useNavigate()
    const handleSubmitUser = (e) => {
            e.preventDefault()
            axios.post('http://localhost:3001/customer',{
               name : userCredentials.name,
               aadhar : userCredentials.aadhar_no,
               phoneNumber : userCredentials.phone_no,
               address : userCredentials.address,
               password : userCredentials.password 
            }).then(response=>{
                console.log(response.data);
                navigate("/login",{replace:true})
            })
        }

        const handleSubmitAdmin = (e) => {
          e.preventDefault()
          axios.post('http://localhost:3001/adminsignup',{
             admin_name : adminCredentials.admin_name,
             admin_email : adminCredentials.admin_email, 
             admin_password : adminCredentials.admin_password 
          }).then(response=>{
              console.log(response.data);
              navigate("/login",{replace:true})
          })
      }
    

    const onChange = (e) =>{
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note

    }

    const onChange1 = (e) =>{
      setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note

  }

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"3vh 0"}}>
    <div className="register" >
    
      <h1>Admin Signup</h1>
      <form  onSubmit={handleSubmitAdmin}>
      <input type="text" name="admin_name"  value={adminCredentials.admin_name} placeholder="Enter your name" onChange={onChange1} required></input>
      <input type="email" name="admin_email"  value={adminCredentials.admin_email} placeholder="Enter your email-id" onChange={onChange1}  required></input>
  
      <input type="password" name="admin_password"  value={adminCredentials.admin_password }  placeholder="enter Password" onChange={onChange1} minLength={5}  required></input>
      <button className="button" style={{padding: "8px 150px",opacity:"0.9"}}  type = "submit" >Register</button>
      {/* <div>or</div> */}
      {/* <button className="button" style={{padding: "8px 150px",opacity:"0.9"}} onClick={()=>{navigate("/login",{replace:true})}}>Login</button> */}
      </form>
</div>
<div className="register" >
    
<h1>Customer Signup </h1>
<form  onSubmit={handleSubmitUser}>
<input type="text" name="name" required value={userCredentials.name} placeholder="Enter your name" onChange={onChange} minLength={2} ></input>
<input type="aadhar_no" name="aadhar_no" required value={userCredentials.aadhar_no} placeholder=" your aadhar number" onChange={onChange}  ></input>
<input type="phone_no" name="phone_no" required value={userCredentials.phone_no}  placeholder=" your phone number" onChange={onChange}  ></input>
<input type="password" name="password" required value={userCredentials.password }  placeholder="enter Password" onChange={onChange} minLength={5}  ></input>
<input type="address" name="address" required value={userCredentials.address } placeholder="enter your address" onChange={onChange} minLength={5}  ></input>
<button className="button" style={{padding: "8px 150px",opacity:"0.9"}}  type = "submit">Register</button>
{/* <div>or</div> */}
{/* <butto
n className="button" style={{padding: "8px 150px",opacity:"0.9"}} onClick={()=>{navigate("/login",{replace:true})}}>Login</button> */}
</form>
</div>
</div>

  )
  }

export default Signup