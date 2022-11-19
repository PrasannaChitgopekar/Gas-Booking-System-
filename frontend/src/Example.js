import React from 'react'
import { useAuth } from './context/LoginContext';
function Example() {
    const auth = useAuth();
  return (
    <div>
      <h1> customer_id is {auth.customer_id}</h1>
      <h1> customer name is {auth.uname}</h1>
    </div>
  )
}

export default Example
