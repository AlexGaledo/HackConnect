import { useState, useEffect } from "react";
import axios from "../api/axios";
import hackconnectsvg from '../assets/hackconnectlogo.svg'
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const dash_events = events.slice(0, 3);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/events/getEvents")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));

  }, []);

  
  return (
    <div className="event-carousel">
      {dash_events.map((event) => (
        <div key={event.id} className="event-card">
          <img src={hackconnectsvg} alt={event.title} className="event-image" width={100} />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Deadline: {event.deadline}</p>
          <p>Host: {event.host}</p>
          <button className="event-info">view more</button>
        </div>
      ))}
      <div className="event-card" onClick={()=>navigate('/events')}>
        <div className="seemore-container">
          <Search className="see-more" size={100}/>
          <h1>see more events</h1>
        </div>
        
      </div>
    </div>
  );
};
