
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
    if (!ticket.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        const response = await axiosConfig.put(`/tickets/${ticket.id}`, {
            title: ticket.title,
            description: ticket.description,
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
    if (!ticket.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        const response = await axiosConfig.post(`/tickets`, {
            title: ticket.title,
            description: ticket.description,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}
