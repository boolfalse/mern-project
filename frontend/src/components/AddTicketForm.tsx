
import {createTicket} from "../utils";


function AddTicketForm({
                        newTicket,
                        setNewTicket,
                        reloadTickets
}) {
    const clearTicketCreate = () => {
        setNewTicket({title: '', description: ''});
    };
    const submitTicketCreate = () => {
        createTicket(newTicket).then(() => {
            setNewTicket({title: '', description: ''});
            reloadTickets();
        });
    };

    return (
        <>
            <h2 className="add-ticket-header">Add Ticket</h2>

            <h3 className="add-ticket-header">Title</h3>
            <input type="text"
                   className="add-ticket-input"
                   onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                   value={newTicket.title} />
            <h3 className="add-ticket-input-header">Description</h3>
            <textarea className="add-ticket-textarea"
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      value={newTicket.description || ''} />

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
