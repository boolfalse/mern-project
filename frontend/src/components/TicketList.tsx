
import {JSX} from 'react';
import Ticket from './Ticket';
import TicketInterface from '../interfaces/TicketInterface';


function TicketList({
                        tickets,
                        setIsModalEditOpen,
                        getOneTicketHandler,
                        setIsModalDeleteOpen,
                        setModalDeleteTicketId
}: {
    tickets: TicketInterface[];
    setIsModalEditOpen: (isOpen: boolean) => void;
    getOneTicketHandler: (_id: string) => void;
    setIsModalDeleteOpen: (isOpen: boolean) => void;
    setModalDeleteTicketId: (_id: string) => void;
}): JSX.Element {
    return (
        <ul>
            {tickets.map((ticket: TicketInterface) => (
                <li key={ticket._id.toString()} className="ticket-item">
                    <Ticket ticket={ticket}
                            setIsModalEditOpen={setIsModalEditOpen}
                            getOneTicketHandler={getOneTicketHandler}
                            setIsModalDeleteOpen={setIsModalDeleteOpen}
                            setModalDeleteTicketId={setModalDeleteTicketId}
                    />
                </li>
            ))}
        </ul>
    );
}

export default TicketList;
