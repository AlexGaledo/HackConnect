// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventFactory {
    address public owner; // factory owner
    uint public eventCounter = 0; // counter for event IDs

    constructor(){
        owner = msg.sender; // set factory owner
    }
//structs (blueprint ng data)
        enum EventStatus { 
        Upcoming, 
        Ongoing, 
        Completed, 
        Cancelled 
    }

    struct Ticket{
        uint ticket_id;
        uint event_id; //sang event sya na ticket
        address owner; //owner of the ticket
        bool isUsed;
        uint price;
    }

    struct Event{
        uint event_id;
        string name;
        string description;
        string location;
        string date;
        uint total_tickets;
        uint[] ticket_tiers; 
        address organizer;
        EventStatus status;
        uint tickets_sold;
        uint funds;
        // ✅ NO mapping here - use the separate one instead
    }
//storage mapping (callable functions toh lahat)
    mapping(uint => Event) public events; // mapping of event ID to Event struct
    mapping(address => uint[]) public organizerEvents; // mapping of organizer address to array of event IDs
    mapping(uint => mapping(uint => Ticket)) public tickets; // returns ticket details ng event (2 parameters)
    mapping(uint => mapping(address => uint[])) public userTickets; // returns tickets id ng user sa event (2 parameters)

//modifiers
    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyOrganizer(uint _event_id){
        require(msg.sender == events[_event_id].organizer, "Only organizer can call this function");
        _;
    }

    modifier eventExists(uint _event_id){
        require(_event_id > 0 && _event_id <= eventCounter, "Event does not exist");
        _;
    }

    modifier validStatus(uint _event_id, EventStatus _status){
        require(events[_event_id].status == _status, "Invalid event status");
        _;
    }
//functions
    function create_event(
        string memory _name, 
        string memory _description,
        string memory _location,
        string memory _date,
        uint _total_tickets,
        uint[] memory _ticket_tiers
    ) public returns (uint){
        require(_total_tickets > 0, "Total tickets must be greater than 0");
        require(_ticket_tiers.length > 0, "At least one ticket tier must be provided");
        require(bytes(_name).length > 0 && bytes(_description).length > 0 && bytes(_location).length > 0 && bytes(_date).length > 0, "Event details must be provided");
        
        eventCounter++;
        Event storage newEvent = events[eventCounter];
        newEvent.event_id = eventCounter;
        newEvent.name = _name;
        newEvent.description = _description;
        newEvent.location = _location;
        newEvent.date = _date;
        newEvent.total_tickets = _total_tickets;
        newEvent.ticket_tiers = _ticket_tiers;
        newEvent.organizer = msg.sender;
        newEvent.status = EventStatus.Upcoming;
        newEvent.tickets_sold = 0;
        newEvent.funds = 0;

        organizerEvents[msg.sender].push(eventCounter);
        return eventCounter;
    }
}