import { useContext, useState, createContext } from "react";

const UserContext = createContext();

export function UserProvider({children}) { 
    const [user, setUser] = useState(null); // user context

    const update_user = ({id,username,points,role}) =>{
        setUser({
            id:id,
            username:username,
            points:points,
            role:role
        })
    }

    const change_username = ({new_username}) =>{
        setUser(prev =>({
            ...prev,username:new_username
        }))
    }

    const add_points = ({added_pts}) =>{
        setUser(prev =>({
            ...prev,points:points+=added_pts
        }))
    }

    const deduct_points = ({deducted_pts}) =>{
        setUser(prev=>({
            ...prev, points:points-=deducted_pts
        }))
    }

    return(
        <UserContext.Provider value={{user, change_username, update_user, add_points, deduct_points}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);