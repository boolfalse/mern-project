
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
        setModalDeleteTicketId(ticket.id);
        setIsModalDeleteOpen(true);
    };

    return (
        <div className="ticket-item-content">
            <span className="ticket-ticket">
                <span className="ticket-time">Created {ticket.created}</span>
            </span>
            <span className="ticket-title">{ticket.title}</span>
            <div className="ticket-actions">
                <button className="ticket-edit-btn" onClick={handleEdit}>Edit</button>
                <button className="ticket-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Ticket;
