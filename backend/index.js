const express = require('express')
const app = express()
const cors = require("cors")
app.use(express.json())
const mysql = require('mysql')

app.use(cors({
    origin :"*"
}))

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"PrasannaPC2002",
    database:"gas_booking_system"
})



//customer signup

app.post('/customer',(req,res)=>{  //this for signup
    // let name = String(req.body.name)
    let myQuery = `INSERT INTO customer(name, aadhar_no , phone_no , password , address) VALUES("${String(req.body.name)}","${String(req.body.aadhar)}","${String(req.body.phoneNumber)}","${String(req.body.password)}","${String(req.body.address)}")`
    console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) { console.log(err) }
        res.send(result)
    })
})

//admin signup
app.post('/adminsignup',(req,res)=>{  //this for signup
    // console.log(req.body);
    // let name = String(req.body.name)
    console.log(req.body);
    let myQuery = `INSERT INTO administrator(admin_name, admin_password , admin_email) VALUES("${String(req.body.admin_name)}","${String(req.body.admin_password)}","${String(req.body.admin_email)}");`
    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) { console.log(err) }
        console.log(result);
        res.send(result)
    })
})


app.post("/userlogin",(req,res)=>{
    const { phone_no,password} = req.body
    searchPassword = `select * from customer where phone_no="${phone_no}";`
    // console.log(searchPassword);
    db.query(searchPassword,(err,result)=>{
      console.log(result);
      if(err) {console.log(err)}
      else if(result.length===0){res.send('please enter valid password')}
      else{
          console.log(result[0].password);
          if(password===result[0].password){
            // res.send('match')
              res.json(
                  {
                      loginStatus : 'passwordMatched',
                      customer_id : result[0].customer_id,
                      name : result[0].name,
                      phone_no : result[0].phone_no,
                      address : result[0].address,
                  }
              )
          }else{
              res.send('passwordDoesntMatch')
          }
      }
  })
})


app.post("/adminlogin",(req,res)=>{
    const { email,apassword} = req.body
    // console.log(req.body);
    searchPassword = `select * from administrator where admin_email="${email}"`
    db.query(searchPassword,(err,result)=>{
      console.log(result);
      if(err) {console.log(err)}
      else if(result.length===0){res.send('please enter valid password')}
      else{
          console.log(result[0].admin_password);
          if(apassword===result[0].admin_password){
              res.json(
                  {
                      loginStatus : 'passwordMatched',
                      admin_id : result[0].admin_id, 
                      name : result[0].admin_name
                  }
              )
          }else{
              res.send('passwordDoesntMatch')
          }
      }
  })
})


// inserting order or place order

app.post('/orders',(req,res)=>{
    let myQuery = `insert into orders(cst_id ,order_date ,delivery_address ,phone_no_optional) values("${req.body.cst_id}","${req.body.order_date}","${req.body.delivery_address}","${req.body.phone_no_optional}")`
    console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) console.log(err);
        else{
            res.send('succes')
        }
    })
})

//view the bookings
app.post('/fetchmybookings',(req,res)=>{
    let cst_id = req.body.cst_id;
    let myQuery = `select * from orders where cst_id = "${cst_id}"`
    // console.log(cst_id);
    db.query(myQuery,(err,response)=>{
        if(err) throw err;
        else{
            res.send(response);
        }
    })
})


//delete order

app.post('/deleteaorder',(req,res)=>{
    let order_id = req.body.order_id;
    let cst_id = req.body.cst_id;
    let myQuerydeliverynote = `DELETE FROM delivary_note WHERE ord_id="${order_id}";`//check
    let myQueryComp = `DELETE FROM complaints WHERE ord_id="${order_id}"`//check
    let myQuery = `delete from orders where order_id="${order_id}"`;
    
    db.query(myQuerydeliverynote,(err,result)=>{
        if(err) throw err;
    })
    db.query(myQueryComp,(err,result)=>{
        if(err) throw err;
    })
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})

//shows the pendigs orders
app.get('/adminpendingorders',(req,res)=>{
    console.log(req.body);
    let myQuery = `select * from orders where order_status="Pending"`
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})

//conformig the pendigs

app.post('/updateorders',(req,res)=>{
    console.log(req.body);
    let loggedAdmin = req.body.admin_id;
    let requestedOrder = req.body.order_id;

    let myQuery = `update orders set order_status = "Confirm", admin_id = "${loggedAdmin}" where order_id = "${requestedOrder}"`
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send('executed')
        }
    })
})


//for comaplaints 

app.post('/complaint',(req,res)=>{
    console.log(req.body);

    let cst_id = req.body.cst_id;
    let complain_description = req.body.complain_description;
    // let complaint_no = req.body.complaint_no;
    let ord_id = req.body.ord_id;
    let myQuery = `insert into complaints (complain_description,ord_id,cst_id) values ("${complain_description}","${ord_id}","${cst_id}");`

    // console.log(myQuery);
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send("complain is registred");
        }
    })
})


//showing complaints 

app.post('/showcomplaints',(req,res)=>{
    let cst_id = req.body.cst_id;
    let myQuery = `select * from complaints where cst_id = ${cst_id}`

    db.query(myQuery,(err,response)=>{
        if(err) throw err;
        else{
            res.send(response)
        }
    })
})


// show delivery note
app.post('/showdeliverynote',(req,res)=>{
    let cst_id = req.body.cst_id
    let myQuery = `select * from delivary_note where cst_id="${cst_id}"`
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})


//add deliveruy note

app.post('/adddeliverynote',(req,res)=>{
    ord_id = req.body.ord_id;
    // delivary_id = req.body.delivary_id;
    cst_id = req.body.cst_id;

    let myQuery = `insert into delivary_note(ord_id,cst_id) values('${ord_id}', '${cst_id}');`
    
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        else{
            res.send("done");
        }
    })
})


//delete customer accont
app.post('/deleteaccount',(req,res)=>{
    let cst_id = req.body.cst_id;
    let myQueryCst = `DELETE FROM customer WHERE customer_id="${cst_id}";`
    let myQueryComp = `DELETE FROM complaints WHERE cst_id="${cst_id}";`//check
    let myQuerydeliverynote = `DELETE FROM delivary_note WHERE cst_id="${cst_id}";`//check
    let myQueryorders = `DELETE FROM orders WHERE cst_id="${cst_id}";`//

    db.query(myQueryComp,(err,result)=>{
        if(err) throw err;
    })

    db.query(myQuerydeliverynote,(err,result)=>{
        if(err) throw err;
    })

    db.query(myQueryorders,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result);
        }
    })

    db.query(myQueryCst,(err,result)=>{
        if(err) throw err;
        res.send("successfully deleted customer")
    })
})


// eidt order like phone_no ,address
app.post("/editorders",(req,res)=>{
    let order_id = req.body.order_id;
    let phone_no = req.body.phone_no;
    let address = req.body.address;
    let myQuery = `update orders set phone_no_optional="${phone_no}" , delivery_address="${address}" where order_id="${order_id}"`
    // update orders set phone_no_optional="7676556846", delivery_address="pes college" where order_id="11";
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        res.send("updated successfully");
    })
})


//update user account
app.post("/updateuser",(req,res)=>{
    let customer_id = req.body.customer_id;
    let password = req.body.password;
    let name = req.body.name;
    let phone_no = req.body.phone_no;
    let address = req.body.address;
    let myQuery =  `update customer set password="${password}", name="${name}", phone_no="${phone_no}", address="${address}" where customer_id="${customer_id}"`
    db.query(myQuery,(err,result)=>{
        if(err) throw err;
        res.send("updated successfully");
    })
})

//delete note
app.post("/deletenote",(req,res)=>{
    let customer_id = req.body.cst_id;
    let delivery_id = req.body.delivery_id;
    let myQuery = `delete from delivary_note where cst_id="${customer_id}" and delivary_id="${delivery_id}";`
    db.query(myQuery,(err,reslut)=>{
        if(err) throw err;
        res.send("deleted");
    })
})

//delete complaints
app.post("/deletecomplaint",(req,res)=>{
    let customer_id = req.body.cst_id;
    let complaint_no = req.body.complaint_no;
    let myQuery = `delete from complaints where cst_id="${customer_id}" and complaint_no="${complaint_no}";`
    db.query(myQuery,(err,reslut)=>{
        if(err) throw err;
        res.send("deleted");
    })
})


//number of orders
app.post('/norder',(req,res)=>{
    let customer_id = req.body.cst_id;
    let myQuery = `select count(*) as n from orders where cst_id = ${customer_id};`
    // let an = `select name from customer where customer_id = ${customer_id}`

    db.query(myQuery,(err,result)=>{
        // console.log(result);
        res.send(result)
    });
})


app.listen(3001,()=>{
    console.log("runnig on port 3001");
})