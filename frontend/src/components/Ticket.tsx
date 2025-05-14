
function Ticket({
                  ticket,
                  setIsModalEditOpen,
                  setModalEditTicket,
                  setIsModalDeleteOpen,
                  setModalDeleteTicketId
}) {
    const handleEdit = () => {
        setModalEditTicket(ticket);
        setIsModalEditOpen(true);
    };

    const handleDelete = () => {
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
