
import { useState } from 'react';
import { getTickets } from "./utils";
import "react-responsive-modal/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TicketList from "./components/TicketList";
import AddTicketForm from "./components/AddTicketForm";


function App () {
    const ticketsData = document.getElementById('app')?.getAttribute('data-tickets');
    // const initialTickets = JSON.parse(ticketsData || '[]');
    const initialTickets = [
        { id: '1', created: '1 hour ago', customerName: 'Customer 1', email: 'customer1@example.com', notes: 'Notes 1', status: 'open' },
        { id: '2', created: '12 minutes ago', customerName: 'Customer 2', email: 'customer2@example.com', notes: 'Notes 2', status: 'done' },
        { id: '3', created: '20 seconds ago', customerName: 'Customer 3', email: 'customer3@example.com', notes: 'Notes 3', status: 'pending' },
    ];
    const [tickets, setTickets] = useState(initialTickets || []);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [modalEditTicket, setModalEditTicket] = useState({id: '', customerName: '', notes: ''});
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [modalDeleteTicketId, setModalDeleteTicketId] = useState('');
    const [newTicket, setNewTicket] = useState({customerName: '', notes: ''});

    const reloadTickets = () => {
        getTickets().then((ticketsData) => setTickets(ticketsData));
    };

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <ModalEdit isModalEditOpen={isModalEditOpen}
                       setIsModalEditOpen={setIsModalEditOpen}
                       modalEditTicket={modalEditTicket}
                       setModalEditTicket={setModalEditTicket}
                       reloadTickets={reloadTickets}
            />
            <ModalDelete isModalDeleteOpen={isModalDeleteOpen}
                         setIsModalDeleteOpen={setIsModalDeleteOpen}
                         modalDeleteTicketId={modalDeleteTicketId}
                         reloadTickets={reloadTickets}
            />
            <div className="left-side">
                {tickets.length > 0 ? (
                    <TicketList tickets={tickets}
                              setIsModalEditOpen={setIsModalEditOpen}
                              setModalEditTicket={setModalEditTicket}
                              setIsModalDeleteOpen={setIsModalDeleteOpen}
                              setModalDeleteTicketId={setModalDeleteTicketId}
                              setTickets={setTickets}
                    />
                ) : (
                    <div className="no-tickets">
                        No tickets yet :(
                    </div>
                )}
            </div>
            <div className="right-side">
                <div className="right-side-wrapper">
                    <AddTicketForm newTicket={newTicket}
                                 setNewTicket={setNewTicket}
                                 reloadTickets={reloadTickets}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
