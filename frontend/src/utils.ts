
import axiosConfig from './axiosConfig';
import { toast } from 'react-toastify';



export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error)
}

export const getTickets = async () => {
    try {
        const response = await axiosConfig.get(`/tickets`);
        const { success, tickets, message } = response.data;

        if (success) {
            return tickets;
        } else {
            toast.error(message);
            return [];
        }
    } catch (err) {
        toast.error(getErrorMessage(err));
        return [];
    }
}

export const reorderTickets = async (start, end) => {
    try {
        const response = await axiosConfig.put('/tickets', {start, end});
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const editTicket = async (ticket) => {
    if (!ticket.id) return;
    if (!ticket.customerName || !ticket.email) {
        toast.error("Customer Name and Email are required!");
        return;
    }
    const statusOptions = ['pending', 'done', 'open'];
    if (!statusOptions.includes(ticket.status)) {
        toast.error("Invalid status!");
        return;
    }

    try {
        const response = await axiosConfig.put(`/tickets/${ticket.id}`, {
            customerName: ticket.customerName,
            email: ticket.email,
            notes: ticket.notes,
            status: ticket.status,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const deleteTicket = async (id) => {
    if (!id) {
        toast.error("Invalid ticket!");
        return;
    }

    try {
        const response = await axiosConfig.delete(`/tickets/${id}`);
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const createTicket = async (ticket) => {
    if (!ticket.customerName || !ticket.email) {
        toast.error("Customer Name and Email are required!");
        return;
    }
    const statusOptions = ['pending', 'done', 'open'];
    if (!statusOptions.includes(ticket.status)) {
        toast.error("Invalid status!");
        return;
    }

    try {
        const response = await axiosConfig.post(`/tickets`, {
            customerName: ticket.customerName,
            email: ticket.email,
            notes: ticket.notes,
            status: ticket.status,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}
