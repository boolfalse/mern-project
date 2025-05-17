
import {JSX} from 'react';
import TicketInterface from '../interfaces/TicketInterface';


function Ticket({
                    ticket,
                    setIsModalEditOpen,
                    getOneTicketHandler,
                    setIsModalDeleteOpen,
                    setModalDeleteTicketId
}: {
    ticket: TicketInterface;
    setIsModalEditOpen: (isOpen: boolean) => void;
    getOneTicketHandler: (_id: string) => void;
    setIsModalDeleteOpen: (isOpen: boolean) => void;
    setModalDeleteTicketId: (_id: string) => void;
}): JSX.Element {
    const handleEdit = (): void => {
        getOneTicketHandler(ticket._id);
        setIsModalEditOpen(true);
    };

    const handleDelete = (): void => {
        setModalDeleteTicketId(ticket._id);
        setIsModalDeleteOpen(true);
    };

    return (
        <div className="ticket-item-content">
            <span className="ticket-ticket">
                <div className="ticket-status">{ticket.status.toUpperCase()}</div>
                <span className="ticket-time">{new Date(ticket.createdAt).toLocaleString()}</span>
            </span>
            <span className="ticket-customer-name">{ticket.customerName}</span>
            <div className="ticket-actions">
                <button className="ticket-edit-btn" onClick={handleEdit}>Edit</button>
                <button className="ticket-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Ticket;
