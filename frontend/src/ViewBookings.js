import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Navigate , useNavigate } from 'react-router-dom'
import { useAuth } from './context/LoginContext';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
// import e from 'cors';


function ViewBookings() {

  const navigate = useNavigate();
  const auth = useAuth();
  let date = new Date();
    
  const [myBookings,setMyBookings] = useState([]);
  const [nOrder,setnOrder] = useState();

  const handleSubmitView = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/fetchmybookings",{
      cst_id : auth.customer_id
    }).then(responce => {
      console.log(responce);
      setMyBookings(responce.data)
    })
  }


  useEffect(()=>{
    axios.post("http://localhost:3001/norder",{
      cst_id : auth.customer_id
    }).then(response=>{
      setnOrder(response.data[0].n)
    })
  })
  let myDate = (date) =>{
    // let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(date);
    let da = d.getDate();
    let mon = d.getMonth()+1;
    let year = d.getFullYear();
    let res = da + '-' + mon + '-' + year;
    return res;
  }

  return (
    <div >
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"3vh 0"}}>
        <div><button type="button" className="btn btn-primary my-3 mx-3" onClick={()=>{navigate("/",{replace:true})}}>Back</button></div>
        <div><button type='button' className="btn btn-primary my-3 mx-3" onClick={handleSubmitView}>Show Bookings</button></div>
        </div>
        <div style={{textAlign:"center"}}>
          <b>Hi {auth.uname} you have {nOrder} orders</b>
        </div><br/>
        <div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
        {
          myBookings.map((myBooking,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "1vh 1vw",padding:"1vh 1vw"}} key={i}>
                <table >
                  <thead>
                  <tr style={{border: "1px solid black"}}>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>cst_id</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>delivery_address</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>phone_no</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>order_date </th>
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
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myDate(myBooking.order_date)}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.order_status==="Confirm" ? <p style = {{color:"green"}}>{myBooking.order_status }</p> : <p style = {{color:"red"}}>{myBooking.order_status }</p>}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.admin_id ? <p style = {{color:"green"}}>{myBooking.admin_id }</p>: <p style = {{color:"red"}}>NaN</p>}</td>
                    {/* <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{myBooking.admin_id}</td> */}
                    <td style={{border: "1px solid black",padding:"2vh 2vw",cursor:"pointer"}}><DeleteIcon color="error" onClick={()=>{
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

//procedure
// delimiter $$
// create procedure no_orders(in order_status varchar(255))
// begin
// select count(*) from orders where orders.order_status = order_status;
// end $$
// delimiter ;

//trigger
// delimeter //
// create trigger check_date
//     -> before insert
//     -> on orders
//     -> for each row
//     -> begin
//     -> if new.order_date < curdate() or new.order_date() > curdate() then set new.order_date = curdate();
//     -> end if ;
//     -> end //
// delimeter  ;


//function
// create function get_complaints(cst_id int)
// returns int
// deterministic
// begin
// declare s int;
// set s = (select count(*) from complaints where complaints.cst_id = cst_id);
// return s;
// end $$


// join 
// select a.admin_id,a.admin_name,o.order_id,o.order_date,o.order_status from orders as o join administrator as a where a.admin_id = o.admin_id order by o.order_date desc;
// select o.order_id,o.order_date,o.order_status,c.name,c.customer_id from orders as o join customer as c where c.customer_id = o.cst_id order by o.order_date desc;
// select c.complaint_no,o.order_id,o.order_status,o.cst_id,c.complain_description from orders as o join complaints as c where c.ord_id = o.order_id order by o.order_date desc;
// 

//curser
// delimiter $$
// create function cnt_orders_crs (cstid int)
// returns int
// deterministic
// begin
// declare done int default false;
// declare cnt1 int default 0;
// declare a int;
// declare cur1 cursor for select order_id from orders where cst_id = cstid;
// declare continue handler for not found set done = true;
// open cur1;
// read_loop:loop
// fetch cur1 into a;
// if done then
// leave read_loop;
// end if;
// set cnt1 = cnt1 + 1;
// end loop;
// close cur1;
// return cnt1;
// end $$
// delimiter ;


//set operations
// select cst_id, ord_id from complaints union select cst_id,order_id from orders where admin_id='NULL';
// select customer_id from customer intersect select cst_id from orders where order_status = 'Pending';
// select customer_id from customer except select cst_id from orders;
// select order_id from orders where orders_status ='Pending' intersect select ord_id from complaints;