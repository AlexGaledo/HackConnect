


export function CreateEvent(){
    return(
        <>
        <div className="create-container">
            <h1>
                Host an Event
            </h1>

            <form className="create-event-form">
                <input type="text" placeholder="Event Name" required/>
                <input type="text" placeholder="Event Description" required/>
                <input type="text" placeholder="Event Location" required/>
                <input type="date" placeholder="Event Date" required/>
                <input type="time" placeholder="Event Time" required/>
                <input type="text" placeholder="Event Image URL" required/>
                <input type="number" placeholder="Ticket Price (in ETH)" required/>
                <input type="number" placeholder="Total Tickets Available" required/>
                <button type="submit">Create Event</button>
            </form>
        </div>
        
        </>
    )
}