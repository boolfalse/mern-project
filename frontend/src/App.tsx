
import {JSX, useEffect, useState} from 'react';
import { getTickets, getOneTicket } from './utils';
import 'react-responsive-modal/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from './components/ModalEdit';
import ModalDelete from './components/ModalDelete';
import TicketList from './components/TicketList';
import AddTicketForm from './components/AddTicketForm';
import SearchInput from './components/SearchInput';
import TicketInterface from './interfaces/TicketInterface';
import NewTicketInterface from './interfaces/NewTicketInterface';
import EmptyTicket from './interfaces/EmptyTicket';


function App(): JSX.Element {
    const [tickets, setTickets] = useState<TicketInterface[]>([]);
    const [initialTickets, setInitialTickets] = useState<TicketInterface[]>([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [modalEditTicket, setModalEditTicket] = useState<TicketInterface>({_id: '', createdAt: '', ...EmptyTicket});
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [modalDeleteTicketId, setModalDeleteTicketId] = useState<string>('');
    const [newTicket, setNewTicket] = useState<NewTicketInterface>(EmptyTicket);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const reloadTickets = (): void => {
        setSearchTerm('');

        getTickets().then((ticketsData: TicketInterface[]) => {
            setTickets(ticketsData);
            setInitialTickets(ticketsData);
        });
    };

    const getOneTicketHandler = (_id: string): void => {
        getOneTicket(_id).then((ticket: TicketInterface | null) => {
            if (ticket) {
                setModalEditTicket(ticket);
                setIsModalEditOpen(true);
            }
        });
    };

    const changeSearchTerm = (term: string): void => {
        setSearchTerm(term);

        if (term === '') {
            setTickets(initialTickets);
        } else {
            const ticketsData = tickets.filter((ticket: TicketInterface) => {
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
