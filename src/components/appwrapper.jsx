import App from "../App";
import { createContext, useState } from "react";


const authContext = createContext();

export default function AppWrapper(){
    const [authStatus, setAuthStatus] = useState(false); // authstatus = login status
    return(
        <>
        <authContext.Provider value={{authStatus,setAuthStatus}}>
        <App/>
        </authContext.Provider>
        </>
    )
}