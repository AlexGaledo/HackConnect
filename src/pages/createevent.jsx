import { useState } from "react"
import axios from "../api/axios";
import { useModal } from "../context/modalcontext";



export function CreateEvent(){
    const {showModal} = useModal();
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [eventMode, setEventMode] = useState("");
    const [eventUrl, setEventUrl] = useState("");
    const [totalTickets, setTotalTickets] = useState("");
    const [loading, setLoading] = useState(false);

    const addEvent = async (e) =>{
        e.preventDefault()
        setLoading(true);
        try {
        const res = await axios.post("events/addEvent",{
            eventName,
            eventDescription,
            eventLocation,
            eventDate,
            eventTime,
            eventImage,
            ticketPrice,
            totalTickets,
            eventMode,
            eventUrl
        })

        if (res.ok){
            showModal({title:"Success✔️",message:"Successfully created an event"})
        }
        } catch (error) {
            showModal({title:"error",message:error})
        } finally {
            setLoading(false);
            setEventName("");
            setEventDescription("");
            setEventLocation("");
            setEventDate("");
            setEventTime("");
            setEventImage("");
            setTicketPrice("");
            setTotalTickets("");
            setEventMode("");
            setEventUrl("");
        }
    }
    

    return(
        <>
        <div className="create-event-container">
            <h1>
                
            </h1>

            <form className="create-event-form" onSubmit={addEvent}>
                <input 
                    type="text" 
                    placeholder="Event Name" 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Event Location"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                />
                <input 
                    type="date" 
                    placeholder="Event Date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
                <input 
                    type="time" 
                    placeholder="Event Time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Event Image URL"
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Event Url"
                    value={eventUrl}
                    onChange={(e) => setEventUrl(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Event Mode"
                    value={eventMode}
                    onChange={(e) => setEventMode(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="Ticket Price (in ETH)"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="Total Tickets Available"
                    value={totalTickets}
                    onChange={(e) => setTotalTickets(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
        
        </>
    )
}