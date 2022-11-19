import { Navigate } from "react-router-dom";
import { useAuth } from "./LoginContext";

export const AdminRestrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.admin_id){
        return <Navigate to="/login"/>
    }
  
    return children
}