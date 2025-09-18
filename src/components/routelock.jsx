import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./appwrapper";

export default function RouteLock({children}){
    const {authStatus} = useContext(AuthContext);
    return authStatus?children : <Navigate to=''/>
}