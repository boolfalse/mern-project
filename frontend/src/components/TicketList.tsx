
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Ticket from "./Ticket";
import { reorderTickets } from "../utils";


const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
});

function TicketList({
                      tickets,
                      setIsModalEditOpen,
                      setModalEditTicket,
                      setIsModalDeleteOpen,
                      setModalDeleteTicketId,
                      setTickets
}) {
    const handleDragEnd = (result) => {
        if (!result.destination || result.destination.index === result.source.index) {
            return;
        }

        const items = Array.from(tickets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        reorderTickets(result.source.index + 1, result.destination.index + 1);

        setTickets(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {tickets.map((ticket, index) => (
                            <Draggable key={ticket.id.toString()} draggableId={ticket.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <li ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="ticket-item"
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        <Ticket ticket={ticket}
                                              setIsModalEditOpen={setIsModalEditOpen}
                                              setModalEditTicket={setModalEditTicket}
                                              setIsModalDeleteOpen={setIsModalDeleteOpen}
                                              setModalDeleteTicketId={setModalDeleteTicketId}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TicketList;
