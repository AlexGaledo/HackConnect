import App from "../App";
import { createContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalProvider } from "../context/modalcontext";
import { UserProvider } from "../context/usercontext";

export const AuthContext = createContext();

export default function AppWrapper(){
    const [authStatus, setAuthStatus] = useState(false); // authstatus = login status

    return(
        <>
        <UserProvider>
        <ModalProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthContext.Provider value={{authStatus, setAuthStatus}}>
            <App/>
        </AuthContext.Provider>
        </GoogleOAuthProvider>
        </ModalProvider>
        </UserProvider>
        </>
    )
}