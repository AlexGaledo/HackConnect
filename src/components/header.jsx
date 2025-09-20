
import hackconnectlogo from '../assets/HackConnectLogo.png'
import { CircleUser } from 'lucide-react'


export default function Header(){
    
    return(
        <>
            <div className="header-container">
                <div className="nav">
                    <img src={hackconnectlogo} alt="HackConnect" className="header-logo" width={150} />
                    <p className="tools">Dashboard</p>
                    <p className="tools">Events</p>
                    <p className="tools">Wallet</p>
                    <CircleUser className="profile-icon" size={40}/>
                </div>  
            </div>        
        </>
    )
}