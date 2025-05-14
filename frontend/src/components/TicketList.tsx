
import Ticket from "./Ticket";


function TicketList({
                        tickets,
                        setIsModalEditOpen,
                        getOneTicketHandler,
                        setIsModalDeleteOpen,
                        setModalDeleteTicketId,
                    }) {
    return (
        <ul>
            {tickets.map((ticket, index) => (
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
