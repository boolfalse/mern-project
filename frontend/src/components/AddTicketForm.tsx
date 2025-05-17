
import React, {JSX} from 'react';
import {createTicket} from '../utils';
import NewTicketInterface from '../interfaces/NewTicketInterface';
import EmptyTicket from '../interfaces/EmptyTicket';


function AddTicketForm({
                           newTicket,
                           setNewTicket,
                           reloadTickets
}: {
    newTicket: NewTicketInterface;
    setNewTicket: React.Dispatch<React.SetStateAction<NewTicketInterface>>;
    reloadTickets: () => void;
}): JSX.Element {
    const clearTicketCreate = (): void => {
        setNewTicket(EmptyTicket);
    };
    const submitTicketCreate = (): void => {
        createTicket(newTicket).then((isCreated) => {
            if (!isCreated) return;
            setNewTicket(EmptyTicket);
            reloadTickets();
        });
    };

    return (
        <>
            <h2 className="add-ticket-header">Add Ticket</h2>

            <h3 className="add-ticket-input-header">Customer Name</h3>
            <input type="text"
                   className="add-ticket-input"
                   onChange={(e) => setNewTicket({...newTicket, customerName: e.target.value})}
                   value={newTicket.customerName} />
            <h3 className="add-ticket-input-header">Email</h3>
            <input type="text"
                   className="add-ticket-input"
                   onChange={(e) => setNewTicket({...newTicket, email: e.target.value})}
                   value={newTicket.email} />
            <h3 className="add-ticket-input-header">Status</h3>
            <select className="add-ticket-select"
                    onChange={(e) => setNewTicket({...newTicket, status: e.target.value})}
                    value={newTicket.status || 'pending'}>
                <option value="pending">Pending</option>
                <option value="open">Open</option>
                <option value="done">Done</option>
            </select>
            <h3 className="add-ticket-input-header">Notes</h3>
            <textarea className="add-ticket-textarea"
                      onChange={(e) => setNewTicket({...newTicket, notes: e.target.value})}
                      value={newTicket.notes || ''} />

            <div className="add-ticket-actions">
                <button className="add-ticket-btn add-ticket-btn-cancel"
                        onClick={clearTicketCreate}>Clear
                </button>
                <button className="add-ticket-btn add-ticket-btn-submit"
                        onClick={submitTicketCreate}>Add</button>
            </div>
        </>
    );
}

export default AddTicketForm;
