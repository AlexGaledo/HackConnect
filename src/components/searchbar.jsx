import { useEffect, useState } from "react"
import axios from "../api/axios"

export default function SearchBar() {
    const [events, setEvents] = useState([])
    const [searchFilter, setSearchFilter] = useState([])
    const [searchFocus, setSearchFocus] = useState(false)

    useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/events/getEvents")
    .then((res) => {
        setEvents(res.data);
        setSearchFilter(res.data);
      })
      .catch((err) => console.error(err));
    }, []);

    const search = (query) => {
    const filtered = searchFilter.filter(f =>
        f.title.toLowerCase().includes(query.toLowerCase()));
        setEvents(filtered);
    }


    return(
        <>
            <div className="search-container">
                <div className="search-bar">
                    <input type="text"
                    className="search-box"
                    onChange={(e) => search(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    placeholder="Search events..."/>

                    <img src="https://unpkg.com/heroicons@2.1.1/24/outline/magnifying-glass.svg" 
                    alt="search icon" 
                    className="search-icon" width={30}/>
                </div>
               <div className="search-item-container" hidden={!searchFocus}>
                <ul>
                {events.map((event) => (
                    <li key={event.id} className="search-item">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Deadline: {event.deadline}</p>
                    </li>
                ))}
                </ul></div>
                
            </div>
        </>
    )
}