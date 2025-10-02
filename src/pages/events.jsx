import { useEffect, useState } from "react"
import SearchBar from "../components/searchbar"
import axios from "../api/axios";
import hackconnectsvg from '../assets/hackconnectlogo.svg'
import { useNavigate } from "react-router-dom";


export default function EventPage(){
    const nav = useNavigate()
    const handleCreateEvent = () =>{
        nav(`/create-events/${localStorage.getItem('user_id')}`)
    }


    const [events,setEvents] = useState([])

    useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/events/getEvents")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));

    }, []);

    return(
        <>  
        <SearchBar/>
        <div className="event-page-buttons">
            <button className="create-event-button" onClick={handleCreateEvent}>Create Event</button>
            <button className="filter-events">Filter</button>
        </div>
      
            <div className="eventpage-container">
               
                {events.map((event)=> (
                <div key={event.id} className="event-card">
                    <img src={hackconnectsvg} alt={event.title} className="event-image" width={100} />
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Deadline: {event.deadline}</p>
                    <p>Host: {event.host}</p>
                    <button className="event-info">view more</button>
                </div>
            ))}
            </div>
            
        </>
    )
}