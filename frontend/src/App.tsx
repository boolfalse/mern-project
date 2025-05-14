
import {useEffect, useState} from 'react';
import { getTickets, getOneTicket } from "./utils";
import "react-responsive-modal/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TicketList from "./components/TicketList";
import AddTicketForm from "./components/AddTicketForm";
import SearchInput from "./components/SearchInput";


function App () {
    const [tickets, setTickets] = useState([]);
    const [initialTickets, setInitialTickets] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [modalEditTicket, setModalEditTicket] = useState({_id: '', customerName: '', email: '', notes: '', status: 'pending'});
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [modalDeleteTicketId, setModalDeleteTicketId] = useState('');
    const [newTicket, setNewTicket] = useState({customerName: '', email: '', notes: '', status: 'pending'});
    const [searchTerm, setSearchTerm] = useState('');

    const reloadTickets = () => {
        setSearchTerm('');

        getTickets().then((ticketsData) => {
            setTickets(ticketsData);
            setInitialTickets(ticketsData);
        });
    };

    const getOneTicketHandler = (_id) => {
        getOneTicket(_id).then((ticket) => {
            if (ticket) {
                setModalEditTicket(ticket);
                setIsModalEditOpen(true);
            }
        });
    };

    const changeSearchTerm = (term) => {
        setSearchTerm(term);

        if (term === '') {
            setTickets(initialTickets);
        } else {
            const ticketsData = tickets.filter(ticket => {
                return ticket.customerName.toLowerCase().includes(term.toLowerCase()) ||
                    (ticket.email ? ticket.email.toLowerCase().includes(term.toLowerCase()) : false);
            });
            setTickets(ticketsData);
        }
    }

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
                {tickets.length > 0 || searchTerm !== '' ? (
                    <>
                        <SearchInput searchTerm={searchTerm} changeSearchTerm={changeSearchTerm} />
                        <TicketList tickets={tickets}
                                    setIsModalEditOpen={setIsModalEditOpen}
                                    getOneTicketHandler={getOneTicketHandler}
                                    setIsModalDeleteOpen={setIsModalDeleteOpen}
                                    setModalDeleteTicketId={setModalDeleteTicketId}
                        />
                    </>
                ) : (
                    <div className="no-tickets">
                        No tickets...
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
