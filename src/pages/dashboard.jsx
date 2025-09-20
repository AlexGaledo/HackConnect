import { EventCarousel } from "../components/eventCarousel"

export default
 function Dashboard(){

    return(
        <>  
            <div className="dashboard-container">
                <div className="dashboard-wallet-primer">
                    <h2>Welcome to HackConnect, {localStorage.getItem('username')}</h2>
                    <p>start by connecting your wallet</p>
                </div>
                
                <EventCarousel/>
                <div className="dashboard-intro">
                    why HackConnect?
                </div>
            </div>
            
        </>
    )
}