
import profile from '../assets/profile.svg'

export default function Header(){
    
    return(
        <>
            <div className="header-container">
                <div className="nav">
                    <p className="tools">Dashboard</p>
                    <p className="tools">Events</p>
                    <p className="tools">Wallet</p>
                    <img src={profile} alt="profile icon"className="profile-icon"/>
                </div>  
            </div>        
        </>
    )
}