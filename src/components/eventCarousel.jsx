import { useState, useEffect } from "react";
import axios from "../api/axios";

export const EventCarousel = () => {
  const [events, setEvents] = useState([]);

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
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Deadline: {event.deadline}</p>
          <p>Host: {event.host}</p>
          <button className="event-info">view more</button>
        </div>
      ))}
    </div>
  );
};
