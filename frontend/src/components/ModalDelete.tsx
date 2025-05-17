
import {JSX} from 'react';
import {Modal} from 'react-responsive-modal';
import {deleteTicket} from '../utils';


function ModalDelete({
                         isModalDeleteOpen,
                         setIsModalDeleteOpen,
                         modalDeleteTicketId,
                         reloadTickets
}: {
    isModalDeleteOpen: boolean;
    setIsModalDeleteOpen: (isOpen: boolean) => void;
    modalDeleteTicketId: string;
    reloadTickets: () => void;
}): JSX.Element {
    const submitTicketDelete = (): void => {
        setIsModalDeleteOpen(false);
        deleteTicket(modalDeleteTicketId).then(() => {
            reloadTickets();
        });
    };

    return (
        <Modal open={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} center>
            <div className="modal-content">
                <h2 className="modal-header">Delete Ticket</h2>

                <p className="modal-question">Are you sure you want to delete this ticket?</p>

                <div className="modal-actions">
                    <button className="modal-btn modal-btn-cancel"
                            onClick={() => setIsModalDeleteOpen(false)}
                    >Cancel</button>
                    <button className="modal-btn modal-btn-submit"
                            onClick={submitTicketDelete}
                    >Yes</button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalDelete;
