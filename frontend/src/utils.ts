
import axiosConfig from './axiosConfig';
import { toast } from 'react-toastify';


export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error?.response?.data.message || error.message;
    }
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
        const response = await axiosConfig.post('/tickets/reorder', {start, end});
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const editTicket = async (ticket) => {
    if (!ticket._id) return;
    if (!ticket.customerName || !ticket.email) {
        toast.error("Customer Name and Email are required!");
        return;
    }
    const statusOptions = ['pending', 'done', 'open'];
    if (!statusOptions.includes(ticket.status)) {
        toast.error("Invalid status!");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ticket.email)) {
        toast.error("Invalid email format!");
        return;
    }

    try {
        const response = await axiosConfig.patch(`/tickets/${ticket._id}`, {
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

export const deleteTicket = async (_id) => {
    if (!_id) {
        toast.error("Invalid ticket!");
        return;
    }

    try {
        const response = await axiosConfig.delete(`/tickets/${_id}`);
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ticket.email)) {
        toast.error("Invalid email format!");
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

        return true;
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}
