// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract hackconnect {
    string public name;
    string public description;
    string public location;
    string public event_date;
    string public date_created;
    uint public total_tickets;
    uint public tickets_sold;
    address public organizer;
    
    enum eventStatus { Upcoming, Ongoing, Completed }
    eventStatus public status;

    struct Ticket {
        uint ticketId;
        address owner;
        uint price;
        bool isSold;
    }

    mapping(uint => Ticket) public tickets;
    mapping(address => uint[]) public ticket_owners;

    function is_there_any_ticket_available() public view returns (bool){
        if (tickets_sold >= total_tickets){
            return false
        } 
        return true
    }

    uint public current_ticket_id = 1;

    function buy_ticket() public payable returns(uint){
        require(is_there_any_ticket_available(),"ticket sold out");
        require(msg.value >= tickets[current_ticket_id].price,"insufficient funds");

        uint ticketId = current_ticket_id;
        tickets[ticketId] = Ticket(current_ticket_id,msg.sender, ticket_price, true);
        ticket_owners[msg.sender].push(ticketId);
        tickets_sold++;
        current_ticket_id++
        return ticketId
    }
    

}