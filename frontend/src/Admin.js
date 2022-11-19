import React, { useState } from "react";
import axios from 'axios'
import { useAuth } from './context/LoginContext';
import Paper from '@mui/material/Paper';
import { Navigate ,useNavigate} from 'react-router-dom';

function Admin(){

    let [pendingOrders,setPendingorder] = useState([]);
    const auth = useAuth();
    const navigate=useNavigate();

    const handleClickPending = ()=>{
        axios.get('http://localhost:3001/adminpendingorders').then(response=>{
            setPendingorder(response.data)
        })
    }

    const handleAdminLogout = (e)=>{
        // e.preventDefault();
        auth.Loginadmin_id(null)
        navigate('/login',{replace:true})
    }

    return (<>
        {/* <button onClick={handleClickPending}>show Pending orders</button> */}
        
        <button type="button" onClick={handleAdminLogout}  className="btn btn-primary my-3 mx-3">Logout</button>
        
        <div className="my-3 mx-3" style={{textAlign:"center"}}>
            <br/>
        <h2 >Logged Admin ID : {auth.admin_id}</h2><br/>
        <h2 >Logged Admin Name : {auth.aname}</h2><br/>
        <h2 >Pending Orders</h2>
        <button onClick={handleClickPending} className="btn btn-primary">show_Pending_orders</button>
        </div>
        <br/><br/>
        <div>
        {/* <h2 style={{textAlign:"center"}}>Pending Orders</h2> */}
        <div className="my-3 mx-3" style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
            {
                pendingOrders.map((pending_order,i)=>{
                    return(
                        <Paper elevation = {3} sx = {{margin : "2vh 2vw",padding:"2vh 3vw"}} key={i}>
                        <div key={pending_order.order_id}>
                            <table>
                            <thead>    
                            <tr style={{border: "1px solid black"}}>
                                <th style={{border: "1px solid black",padding:"2vh 3vw"}}>order_id</th>
                                <th style={{border: "1px solid black",padding:"2vh 3vw"}}>cst_id</th> 
                                <th style={{border: "1px solid black",padding:"2vh 3vw"}}>order_status</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr style={{border: "1px solid black"}}>
                                    <td style={{border: "1px solid black",padding:"2vh 3vw"}}>{pending_order.order_id}</td>
                                    <td style={{border: "1px solid black",padding:"2vh 3vw"}}>
                                        {pending_order.cst_id}
                                    </td>
                                    <td style={{border: "1px solid black",padding:"2vh 3vw"}}>
                                        <button className="btn btn-outline-primary" id={pending_order.order_id} onClick={()=>{
                                            axios.post("http://localhost:3001/updateorders",{
                                                admin_id : auth.admin_id,
                                                order_id : pending_order.order_id
                                            }).then(response=>{
                                                if(response.data === "executed"){
                                                    console.log('succcess');
                                                }
                                            })
                                        }}>{pending_order.order_status}</button>
                                    </td>
                                </tr>
                                </tbody>
                    
                            </table>
                        </div>
                        </Paper>
                    )
                })
            }
            </div>
        </div>
    </>
    )
}

export default Admin;