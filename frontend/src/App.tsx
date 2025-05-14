
import {useEffect, useState} from 'react';
import { getTickets } from "./utils";
import "react-responsive-modal/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TicketList from "./components/TicketList";
import AddTicketForm from "./components/AddTicketForm";


function App () {
    const [tickets, setTickets] = useState([]); // initialTickets || []
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [modalEditTicket, setModalEditTicket] = useState({_id: '', customerName: '', email: '', notes: '', status: 'pending'});
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [modalDeleteTicketId, setModalDeleteTicketId] = useState('');
    const [newTicket, setNewTicket] = useState({customerName: '', email: '', notes: '', status: 'pending'});

    const reloadTickets = () => {
        getTickets().then((ticketsData) => setTickets(ticketsData));
    };

    useEffect(() => {
        reloadTickets();
    }, []);

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
