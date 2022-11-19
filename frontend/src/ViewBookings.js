import axios from 'axios';
import React,{useState} from 'react'
import { Navigate , useNavigate } from 'react-router-dom'
import { useAuth } from './context/LoginContext';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
// import e from 'cors';


function ViewBookings() {

  const navigate = useNavigate();
  const auth = useAuth();
    
  const [myBookings,setMyBookings] = useState([]);
  

  const handleSubmitView = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/fetchmybookings",{
      cst_id : auth.customer_id
    }).then(responce => {
      console.log(responce);
      setMyBookings(responce.data)
    })
  }




  return (
    <div >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"3vh 0"}}>
        <div><button type="button" className="btn btn-primary my-3 mx-3" onClick={()=>{navigate("/",{replace:true})}}>Back</button></div>
        <div><button type='button' className="btn btn-primary my-3 mx-3" onClick={handleSubmitView}>Show Bookings</button></div>
        </div>
        <div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
        {
          myBookings.map((myBooking,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                <table >
                  <thead>
                  <tr style={{border: "1px solid black"}}>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>cst_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delivery_address</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>phone_no</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_status</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>admin_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style={{border: "1px solid black"}}>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.order_id}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.cst_id}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.delivery_address}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.phone_no_optional}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.order_status}</td>
                    {/* <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.admin_id ? <p style = {{color:"green"}}>{myBooking.admin_id }</p>: <p style = {{color:"red"}}>not confirmed</p>}</td> */}
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.admin_id}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}><DeleteIcon color="error" onClick={()=>{
                      axios.post("http://localhost:3001/deleteaorder",{
                        order_id : myBooking.order_id,
                        cst_id : auth.customer_id
                      }).then(responce=>{
                        console.log(responce);
                        alert("deleted");
                      })
                    }}/></td>
                  </tr>
                  </tbody>
                </table>
              </Paper>
            )
          })
        }
        </div>
    </div>
  )
}

export default ViewBookings
