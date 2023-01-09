
import React,{useState} from 'react'
import axios from 'axios';
import './Complaints.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/LoginContext';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';


function Complaints() {

    const auth = useAuth();


    const [credentials, setCredentials] = useState({complaint_description:"",order_id:""});
    const [showComplain,setShowComplain] = useState([]);
    const navigate = useNavigate(); 
    const handleSubmitComplaint =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/complaint",{
          complain_description : credentials.complaint_description,
          ord_id : credentials.order_id,
          cst_id : auth.customer_id
        }).then(responce => {
          alert(responce.data);
          setCredentials({complaint_description:'',order_id:''})
        })
    }

    const handleShowComplains = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:3001/showcomplaints",{
        cst_id : auth.customer_id
      }).then(responce =>{
        setShowComplain(responce.data)
      })

    }


    const onChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

  return (
    <>
    <button type="button" className="btn btn-primary my-3 mx-3" onClick={()=>{navigate("/",{replace:true})}}>Back</button>
    {/* <h2 style={{textAlign:"center"}}><span style={{color:"red",size:"20px"}}>** Enter only if order id exists **</span></h2> */}
    
    

    <div className='complaints'>
    <form onSubmit={handleSubmitComplaint}>
        <h1>Enter Complain </h1>
        <input type="order_id" name="order_id" value={credentials.order_id} onChange={onChange} placeholder="Enter order_id" required ></input>
        <textarea rows={5} cols = {5} type="text" name="complaint_description" value={credentials.complaint_description}  onChange={onChange} placeholder="Description" required ></textarea>
        <button type="submit" className="button" style={{padding: "8px 100px",opacity:"0.9"}}>submit</button>
    </form>
    </div>
    <br/>
    <div style={{fontFamily:"sans-serif",textAlign:"center",margin:" 0vh 15vw"}}>
    <div className="my-3 mx-3 " style={{fontSize:"25px"}}>
      <h3>Your Complains</h3>
      <button className="button"  type="button" onClick={handleShowComplains} style={{opacity:"0.9"}}>Show Complains</button>
    </div>
    </div>
    <div style={{display:"flex",justifyContent:"center",margin :"2vh 2vw",flexWrap:"wrap"}}>
        {
          showComplain.map((complains,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                  <table >
                    <thead>
                  <tr style={{border: "1px solid black"}}>
                  <th style={{border: "1px solid black",padding:"2vh 2vw"}}>complain_no</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>cst_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>complain_description</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style={{border: "1px solid black"}}>
                  <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{complains.complaint_no}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{complains.ord_id}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{complains.cst_id}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{complains.complain_description}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw",cursor:"pointer"}}><DeleteIcon color="error" onClick={ (e)=>{
                              e.preventDefault();
                              axios.post("http://localhost:3001/deletecomplaint",{
                                cst_id : auth.customer_id,
                                complaint_no : complains.complaint_no
                              }).then(responce=>{
                                  alert(responce.data);
                              })
                          }
                        }/></td>
                    </tr>
                    </tbody>
                  </table>
              </Paper>
            )
          })
        }
      </div>
    </>
  )
}

export default Complaints
