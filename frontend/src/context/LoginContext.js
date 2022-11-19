import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [customer_id,setCoustmer_id] = useState(null);
    const [admin_id,setAdmin_id] = useState(null);

    const [uname,setUname] = useState(null);
    const [aname,setAname] = useState(null);

    const Logincustomer_id = (customer_id)=>{
        setCoustmer_id(customer_id);
    }
    const LoginUname =(uname)=>{
        setUname(uname);
    }


    const Loginadmin_id = (admin_id)=>{
        setAdmin_id(admin_id);
    }
    const LoginAname =(aname)=>{
        setAname(aname);
    }
    return(
        <AuthContext.Provider value={{customer_id,Logincustomer_id,uname,LoginUname,admin_id,Loginadmin_id,aname,LoginAname}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}