
import {Modal} from "react-responsive-modal";
import React from "react";
import {editTicket} from "../utils";


function ModalEdit({
                       isModalEditOpen,
                       setIsModalEditOpen,
                       modalEditTicket,
                       setModalEditTicket,
                       reloadTickets
}) {
    const submitTicketEdit = () => {
        setIsModalEditOpen(false);
        editTicket(modalEditTicket).then(() => {
            reloadTickets();
        });
    };

    return (
        <Modal open={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} center>
            <div className="modal-content">
                <h2 className="modal-header">Edit Ticket</h2>

                <h3 className="modal-input-header">Title</h3>
                <input type="text" value={modalEditTicket.title}
                       className="modal-input"
                       onChange={(e) => setModalEditTicket({...modalEditTicket, title: e.target.value})}/>
                <h3 className="modal-input-header">Description</h3>
                <textarea className="modal-textarea"
                          onChange={(e) => setModalEditTicket({...modalEditTicket, description: e.target.value})}
                          value={modalEditTicket.description || ''} />

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
