import { useState } from "react"
import axios from "../api/axios";


export default function Landing_page(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState({
        darkmode:false,
        loading:false,
        signup:false
    })

    const toggle = (key) => { 
        setState(prev => ({
            ...prev, [key] : !prev[key],
        }));
    }

    const auth_submit = (e) => {
        e.preventDefault();
        state['signup']?register():login();
    }

    const login = async () => {
        try {
            const response = await axios.post('/auth/login',{
                    username,
                    password
            })

            localStorage.setItem('username', response.data.username)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('points', response.data.points)
            alert('logged in')
            
        } catch (error) {
            const msg = error?.response?.data?.response;
            alert(msg);
        }
    }

    const register = () => {

    }

    return(
        <>
        <div className="auth-wrapper">
            <div className="auth-container">
                <img src="HackConnectLogo.png" alt="HackConnect" className="landing-logo" />
                <form  onSubmit={auth_submit} className="landing-auth">
                    <span className="auth-mode">{state['signup']? "Create Account" : "Login Account"}</span>
                    {state['signup']?
                    <>
                    <input className="username" type="text" placeholder="Username" 
                    value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <input className="password" type="password" placeholder="Password" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button className="submit-auth" type="submit" disabled={state['loading']}>{state['loading']?"Loading...":"Submit"}</button>
                    <h3 className="toggle_auth" onClick={() =>{toggle('signup')}}>
                        already have account ?, click here to sign in.
                    </h3>
                    </>
                    :
                    <>
                    <input className="username" type="text" placeholder="Username" 
                    value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <input className="password" type="password" placeholder="Password" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button className="submit-auth" type="submit" disabled={state['loading']}>{state['loading']?"Loading...":"Submit"}</button>
                    <h3 className="toggle_auth" onClick={() =>{toggle('signup')}}>
                        dont have an account ?, click here to create an account.
                    </h3>
                    </>    
                }
                </form>
            </div>
        </div>
        </>
    )
}