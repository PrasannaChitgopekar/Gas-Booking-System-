{/* <div className="my-3 mx-3 text-center " style={{fontSize:"25px",fontFamily:"sans-serif"}}>
<h2 style={{textDecoration: "underline"}}>Login to Gas Booking System</h2><br/><br/>
<div  className='my-3  text-center container square-box d-flex justify-content-center  align-items-center' style={{fontSize:"16px",border:"5px solid black" }}>
<form onSubmit={handleSubmit}>
  
  <div className="form-group my-2 ">
    <label htmlFor="phone_no">Phone_no</label>
    <input
      type="phone_no"
      className="form-control "
      id="phone_no"
      name="phone_no"
      value={credentials.phone_no}
      placeholder="Enter-phone_no"
      onChange={onChange}
    />
  </div><br/>
  <div className="form-group my-2 ">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      placeholder="Enter-Password"
      value={credentials.password}
      onChange={onChange}

    />
  </div><br/>

  <button type="submit" className="btn btn-primary my-2">
    Submit
  </button>
</form>
</div>
</div>
<div className='text-center'>
<h2>New User? </h2>
<button type='button' className="btn btn-primary " onClick={()=>{navigate("/signup",{replace:true})}}>SignUp</button>
</div> */}
















{/* <div className="my-3 " style={{fontSize:"20px"}}>
<button type='button' className="btn btn-primary  mx-3" onClick={()=>{navigate("/login",{replace:true})}}>Login</button>
<h2 style={{textDecoration: "underline"}} className="text-center">Create an Account </h2><br/><br/>
<div  className='my-3  text-center container square-box d-flex justify-content-center  align-items-center' style={{fontSize:"20px",border:"5px solid black" }}>
<form onSubmit={handleSubmit} className="my-3">
  <div className="form-group">
    <label htmlFor="name">User Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      aria-describedby="emailHelp"
      placeholder="Enter user name"
      onChange={onChange}
      name="name"
    />
  </div><br/>

  <div className="form-group">
    <label htmlFor="aadhar_no">aadhar_no</label>
    <input
      type="aadhar_no"
      className="form-control"
      id="aadhar_no"
      aria-describedby="emailHelp"
      placeholder="Enter aadhar_no"
      onChange={onChange}
      name="aadhar_no"
    />
  </div><br/>
  <div className="form-group">
    <label htmlFor="phone_no">phone_no</label>
    <input
      type="phone_no"
      className="form-control"
      id="phone_no"
      aria-describedby="emailHelp"
      placeholder="Enter phone_no"
      onChange={onChange}
      name="phone_no"
    />
  </div>
  
  <br/>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Password"
      onChange={onChange}
      name="password"
      required
      minLength={5}
    />
  </div><br/>
  <div className="form-group">
    <label htmlFor="address">address</label>
    <input
      type="address"
      className="form-control"
      id="address"
      placeholder="Enter address"
      onChange={onChange}
      name="address"
      style={{width:"400px",height:"100px",}}
    />
  </div>
<br/>

  <button type="submit" className="btn btn-primary my-2">
    Submit
  </button>
</form>
</div>
</div> */}



    {/* <div style={{fontFamily:"sans-serif"}}>
    <div className="my-3 mx-3 text-center" style={{fontSize:"25px"}}>
    <h1>Gas Booking System</h1><br/>
    <p>Logged in Customer Id is : {auth.customer_id}</p>
        <p>Customer Name is : {auth.name}</p>
    </div>
    <div className='my-3  text-center container square-box d-flex justify-content-center  align-items-center' style={{fontSize:"16px",border:"5px solid black" }}>
        
        
        <form className='mx-3 my-3 '>
            <label>Booking Date  </label><br/>
            <input type="date" name="date" required/><br/><br/>
            <label>Phone Number Option</label><br/>
            <input type="text" name="phone_no"></input><br/><br/>
            <label>Address</label><br/>
            <input type="text" name="address" style={{width:"400px",height:"100px",}}></input><br/><br/>
            <button type="button" className="btn btn-dark">Submit</button>

        </form>
    </div>
   
    </div> */}