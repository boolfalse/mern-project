
const request = require('supertest');
const { describe, expect, it, afterEach} = require('@jest/globals');
const express = require('express');
const Ticket = require('../../api/models/ticket');

jest.mock('../../api/models/ticket');

afterEach(() => {
    jest.clearAllMocks();
});

const app = express();
app.use(express.json());
app.use('/api/tickets', require('../../api/routes/tickets'));

describe('Tickets Routes', () => {

    // Get all tickets
    describe('GET /api/tickets', () => {

        // 200 - Tickets retrieved successfully.
        it('should return 200 and all tickets', async () => {
            const date = (new Date()).toString();
            const mockTickets = [
                {_id: "aaa111", createdAt: date, customerName: "Customer 1", email: "c1@e.com", status: "pending", notes: ""},
                {_id: "bbb222", createdAt: date, customerName: "Customer 2", email: "c2@e.com", status: "done", notes: "Note 2"},
                {_id: "ccc333", createdAt: date, customerName: "Customer 3", email: "c3@e.com", status: "open", notes: "Note 3"},
            ];

            Ticket.find.mockResolvedValue(mockTickets);

            const response = await request(app)
                .get('/api/tickets')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);
            expect(response.body.tickets).toEqual(mockTickets);
            expect(response.body.message).toBe("Tickets retrieved successfully.");

            expect(Ticket.find).toHaveBeenCalledTimes(1);
        });

        // 500 - Internal Server Error! (example)
        it('should return 500 if there is an error', async () => {
            Ticket.find.mockRejectedValue(new Error("Internal Server Error!"));

            const response = await request(app)
                .get('/api/tickets')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(500);

            expect(response.body.success).toBe(false);
            // expect(response.body.message).toBe("Internal Server Error!");

            expect(Ticket.find).toHaveBeenCalledTimes(1);
        });

    });

    // Create a ticket
    describe('POST /api/tickets', () => {

        // 201 - Ticket created successfully.
        it('should create a new ticket and return 201', async () => {
            const newTicket = {
                customerName: "Customer 0",
                email: "c0@e.com",
                notes: "Note 0",
                status: "open"
            };

            Ticket.create.mockResolvedValue({
                _id: 'xxx000',
                createdAt: (new Date()).toString(),
                ...newTicket
            });

            const response = await request(app)
                .post('/api/tickets')
                .send(newTicket)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Ticket created successfully.");

            expect(Ticket.create).toHaveBeenCalledTimes(1);
            expect(Ticket.create).toHaveBeenCalledWith(newTicket);
        });

        // 500 - Internal Server Error! (example)
        it('should return 500 if there is an error', async () => {
            const newTicket = {
                customerName: "Customer 0",
                email: "c0@e.com",
                notes: "Note 0",
                status: "open"
            };

            Ticket.create.mockRejectedValue(new Error("Internal Server Error!"));

            const response = await request(app)
                .post('/api/tickets')
                .send(newTicket)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(500);

            expect(response.body.success).toBe(false);
            // expect(response.body.message).toBe("Internal Server Error!");

            expect(Ticket.create).toHaveBeenCalledTimes(1);
            expect(Ticket.create).toHaveBeenCalledWith(newTicket);
        });

    });

    // Get a ticket
    describe('GET /api/tickets/:_id', () => {

        // 404 - Ticket not found!
        it('should return 404 if ticket is not found', async () => {
            const ticketId = 'xxx000';

            Ticket.findById.mockResolvedValue(null);

            const response = await request(app)
                .get(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Ticket not found!");

            expect(Ticket.findById).toHaveBeenCalledTimes(1);
            expect(Ticket.findById).toHaveBeenCalledWith(ticketId);
        });

        // 200 - Ticket retrieved successfully.
        it('should return 200 and ticket details', async () => {
            const ticketId = 'xxx000';
            const mockTicket = {
                _id: ticketId,
                createdAt: (new Date()).toString(),
                customerName: "Customer 0",
                email: "c0@e.com",
                notes: "Note 0",
                status: "open"
            };

            Ticket.findById.mockResolvedValue(mockTicket);

            const response = await request(app)
                .get(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);
            expect(response.body.ticket).toEqual(mockTicket);
            expect(response.body.message).toBe("Ticket retrieved successfully.");

            expect(Ticket.findById).toHaveBeenCalledTimes(1);
            expect(Ticket.findById).toHaveBeenCalledWith(ticketId);
        });

        // 500 - Internal Server Error! (example)
        it('should return 500 if there is an error', async () => {
            const ticketId = 'xxx000';

            Ticket.findById.mockRejectedValue(new Error("Internal Server Error!"));

            const response = await request(app)
                .get(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(500);

            expect(response.body.success).toBe(false);
            // expect(response.body.message).toBe("Internal Server Error!");

            expect(Ticket.findById).toHaveBeenCalledTimes(1);
            expect(Ticket.findById).toHaveBeenCalledWith(ticketId);
        });

    });

    // Update a ticket
    describe('PATCH /api/tickets/:_id', () => {

        // 404 - Ticket not found!
        it('should return 404 if ticket is not found', async () => {
            const ticketId = 'xxx000';
            const updateData = {
                customerName: "Customer 0",
                email: "c0@e.com",
                notes: "Note 0",
                status: "open"
            };

            Ticket.findByIdAndUpdate.mockResolvedValue(null);

            const response = await request(app)
                .patch(`/api/tickets/${ticketId}`)
                .send(updateData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Ticket not found!");

            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledWith(ticketId, updateData, {new: true});
        });

        // 200 - Ticket updated successfully.
        it('should return 200 and update the ticket', async () => {
            const ticketId = '123456789012';
            const updateData = {
                customerName: "Updated Customer 0",
                email: "uc0@e.com",
                notes: "Updated Note 0",
                status: "done"
            };

            const updatedTicket = {
                _id: ticketId,
                createdAt: (new Date()).toString(),
                ...updateData
            };

            Ticket.findByIdAndUpdate.mockResolvedValue(updatedTicket);

            const response = await request(app)
                .patch(`/api/tickets/${ticketId}`)
                .send(updateData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Ticket updated successfully.");

            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledWith(ticketId, updateData, {new: true});
        });

        // 500 - Internal Server Error! (example)
        it('should return 500 if there is an error', async () => {
            const ticketId = 'xxx000';
            const updateData = {
                customerName: "Updated Customer 0",
                email: "uc0@e.com",
                notes: "Updated Note 0",
                status: "done"
            };

            Ticket.findByIdAndUpdate.mockRejectedValue(new Error("Internal Server Error!"));

            const response = await request(app)
                .patch(`/api/tickets/${ticketId}`)
                .send(updateData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(500);

            expect(response.body.success).toBe(false);
            // expect(response.body.message).toBe("Internal Server Error!");

            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndUpdate).toHaveBeenCalledWith(ticketId, updateData, {new: true});
        });
    });

    // Delete a ticket
    describe('DELETE /api/tickets/:_id', () => {

        // 404 - Ticket not found!
        it('should return 404 if ticket is not found', async () => {
            const ticketId = 'yyy000';

            Ticket.findByIdAndDelete.mockResolvedValue(null);

            const response = await request(app)
                .delete(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Ticket not found!");

            expect(Ticket.findByIdAndDelete).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndDelete).toHaveBeenCalledWith(ticketId);
        });

        // 200 - Ticket deleted successfully.
        it('should return 200 and delete the ticket', async () => {
            const ticketId = 'xxx000';
            const deletedTicket = {
                _id: ticketId,
                createdAt: (new Date()).toString(),
                customerName: "Deleted Customer 0",
                email: "dc0@e.com",
                notes: "Deleted Note 0",
                status: "open"
            };

            Ticket.findByIdAndDelete.mockResolvedValue(deletedTicket);

            const response = await request(app)
                .delete(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Ticket deleted successfully.");

            expect(Ticket.findByIdAndDelete).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndDelete).toHaveBeenCalledWith(ticketId);
        });

        // 500 - Internal Server Error! (example)
        it('should return 500 if there is an error', async () => {
            const ticketId = 'xxx000';

            Ticket.findByIdAndDelete.mockRejectedValue(new Error("Internal Server Error!"));

            const response = await request(app)
                .delete(`/api/tickets/${ticketId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);

            expect(response.status).toBe(500);

            expect(response.body.success).toBe(false);
            // expect(response.body.message).toBe("Internal Server Error!");

            expect(Ticket.findByIdAndDelete).toHaveBeenCalledTimes(1);
            expect(Ticket.findByIdAndDelete).toHaveBeenCalledWith(ticketId);
        });

    });

});
