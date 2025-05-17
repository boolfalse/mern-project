
import React, {JSX} from 'react';
import {Modal} from 'react-responsive-modal';
import {editTicket} from '../utils';
import TicketInterface from '../interfaces/TicketInterface';


function ModalEdit({
                       isModalEditOpen,
                       setIsModalEditOpen,
                       modalEditTicket,
                       setModalEditTicket,
                       reloadTickets
}: {
    isModalEditOpen: boolean;
    setIsModalEditOpen: (isOpen: boolean) => void;
    modalEditTicket: TicketInterface;
    setModalEditTicket: React.Dispatch<React.SetStateAction<TicketInterface>>;
    reloadTickets: () => void;
}): JSX.Element {
    const submitTicketEdit = (): void => {
        setIsModalEditOpen(false);
        editTicket(modalEditTicket).then(() => {
            reloadTickets();
        });
    };

    return (
        <Modal open={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} center>
            <div className="modal-content">
                <h2 className="modal-header">Edit Ticket</h2>

                <h3 className="modal-input-header">Customer Name</h3>
                <input type="text" value={modalEditTicket.customerName}
                       className="modal-input"
                       onChange={(e) => setModalEditTicket({...modalEditTicket, customerName: e.target.value})}/>
                <h3 className="modal-input-header">Email</h3>
                <input type="text" value={modalEditTicket.email}
                       className="modal-input"
                       onChange={(e) => setModalEditTicket({...modalEditTicket, email: e.target.value})}/>
                <h3 className="modal-input-header">Status</h3>
                <select className="modal-status-select"
                        onChange={(e) => setModalEditTicket({...modalEditTicket, status: e.target.value})}
                        value={modalEditTicket.status || 'pending'}>
                    <option value="pending">Pending</option>
                    <option value="open">Open</option>
                    <option value="done">Done</option>
                </select>
                <h3 className="modal-input-header">Notes</h3>
                <textarea className="modal-textarea"
                          onChange={(e) => setModalEditTicket({...modalEditTicket, notes: e.target.value})}
                          value={modalEditTicket.notes || ''} />

                <div className="modal-actions">
                    <button className="modal-btn modal-btn-cancel"
                            onClick={() => setIsModalEditOpen(false)}
                    >Close
                    </button>
                    <button className="modal-btn modal-btn-submit"
                            onClick={submitTicketEdit}
                    >Save</button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalEdit;
