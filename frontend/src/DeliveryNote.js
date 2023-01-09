import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './Complaints.css';
import { useAuth } from './context/LoginContext';
import DeleteIcon from '@mui/icons-material/Delete';




function DeliveryNote() {

  const auth = useAuth();


  const [credentials, setCredentials] = useState({ord_id:""});

  const navigate = useNavigate(); 
  const [DeliveryNote,setDeliveryNote] = useState([]);

  const handleSubmitNote =(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/adddeliverynote",{
        cst_id : auth.customer_id,
        ord_id : credentials.ord_id
    }).then(response=>{
      alert(response.data);
      setCredentials({ord_id:""})
    })
  }


  const handleShowNote =(e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/showdeliverynote",{
      cst_id : auth.customer_id
    }).then(response=>{
      setDeliveryNote(response.data);
    })
  }

  

  const onChange = (e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
}

  return (
    <>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"3vh 0"}}>
        <div><button type="button" className="btn btn-primary my-3 mx-3" onClick={()=>{navigate("/",{replace:true})}}>Back</button></div>
        <div><button type='button' className="btn btn-primary my-3 mx-3" onClick={handleShowNote}>Show Delivery Note</button></div>
        </div>
    <div>
      <h1 style={{textAlign:"center"}}> Delivery Note</h1>
      <div className='complaints' onSubmit={handleSubmitNote}>
      <form>
        <input type="ord_id"  name="ord_id" value={credentials.ord_id} onChange={onChange} placeholder="enter order_id"></input>
        <button type="submit" className='button' >submit</button>
      </form>
      </div>
      {/* <h1> DeliveryNotes are </h1> */}
      <div style={{display:"flex",justifyContent:"center",margin :"2vh 2vw",flexWrap:"wrap"}}>
        {
          DeliveryNote.map((delivery,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                  <table >
                    <thead>
                      <tr style={{border: "1px solid black"}}>
                        <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_id</th>
                        <th style={{border: "1px solid black",padding:"2vh 2vw"}}>cst_id</th>
                        <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delivery_id</th>
                        <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{border: "1px solid black"}}>
                        <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{delivery.ord_id}</td>
                        <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{delivery.cst_id}</td>
                        <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{delivery.delivary_id}</td>
                        <td style={{border: "1px solid black",padding:"2vh 2vw",cursor :"pointer"}}><DeleteIcon color="error" onClick={ (e)=>{
                              e.preventDefault();
                              axios.post("http://localhost:3001/deletenote",{
                                cst_id : auth.customer_id,
                                delivery_id : delivery.delivary_id
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
    </div>
    </>
  )
}

export default DeliveryNote
