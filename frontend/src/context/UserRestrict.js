import { Navigate } from "react-router-dom";
import { useAuth } from "./LoginContext";

export const UserRestrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.customer_id){
        return <Navigate to="/login"/>
    }
  
    return children
}