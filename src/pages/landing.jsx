import { useContext, useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/appwrapper";
import { useModal } from "../context/modalcontext";
import { useUser } from "../context/usercontext";

export default function Landing_page(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {setAuthStatus} = useContext(AuthContext);

    const { showModal } = useModal();
    const { update_user } = useUser();

    const triggerError = () => {
        const errorJSON = { code: 401, message: "Unauthorized access!" };
        showModal({ title: "Oops!", message: errorJSON.message });
    };

    
    const [state, setState] = useState({
        darkmode:false,
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
        setLoading(true); 
        try {
            const response = await axios.post('/auth/login',{
                    username,
                    password
            })

            localStorage.setItem('username', response.data.username)
            localStorage.setItem('user_id', response.data.user_id)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('points', response.data.points)

            update_user({
                id:response.data.user_id, 
                username:response.data.username, 
                points:response.data.points, 
                role:response.data.role
            })

            showModal({ title: "Success!", message: response.data.response || "Logged in Successfully." });
            setAuthStatus(true);
            navigate(`/dashboard/${localStorage.getItem('user_id')}`)

        } catch (error) {
            const msg = error?.response?.data?.response;
            showModal({ title: "Oops!", message: msg || "An error occurred during Authentication." });
        } finally {
            setLoading(false);
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
        
    }

    const register = async () => {
        if (password !== confirm_password){
            showModal({ title: "bruh!", message: "password and confirm password does not match."});
            return;
        }
        try {
            const response = await axios.post('/auth/sign-up',{
                    username,
                    password
            })

            if (response.data.username == username){
                login()
            }
            else{
                showModal({ title: "Oops!", message: response.data.response || "An error occurred during registration." });
            }

        } catch (error) {
            const msg = error?.response?.data?.response;
            showModal({ title: "Oops!", message: msg || "An error occurred during registration." });
        }
        finally {
            setLoading(false);
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return(
        <>
        <div className="auth-wrapper">
        <div className="auth-box">
        <div className="landing-logo-box">
            <img src="HackConnectLogo.png" alt="HackConnect" className="landing-logo" />
        </div>
        <div className={`slider-container-${state.signup ?"signup" : " "}`}></div>
        <div className="slider-buttons">
            <button className={`slider-${state.signup?"active":""}`} onClick={()=>{toggle('signup')}}>sign-up</button> 
            <button className={`slider-${state.signup?"":"active"}`} onClick={()=>{toggle('signup')}}>sign-in</button>
        </div>
        <form onSubmit={auth_submit} className="landing-auth">
        {state.signup?
        <>
            <input className="username" type="text" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="password" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className="password" type="password" placeholder="confirm password"
            value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button className="submit-auth" type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
            <h3 className="toggle_auth" onClick={() => { toggle('signup') }}></h3>
        </>
            :
        <>
            <input className="username" type="text" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="password" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="submit-auth" type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
            <h3 className="toggle_auth" onClick={() => { toggle('signup') }}></h3>
        </>
        }
        </form>
        <button className="try" onClick={triggerError}>CLICK ME</button>
        </div>
        </div>

        </>
    )
}