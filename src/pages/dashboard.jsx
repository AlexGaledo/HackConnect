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
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.       
                </div>
            </div>
            
        </>
    )
}