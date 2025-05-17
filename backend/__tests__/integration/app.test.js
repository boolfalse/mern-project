
const supertest = require('supertest');
const { beforeAll, afterAll, describe, expect, it } = require('@jest/globals');
const { connectDB, closeDB } = require('../../api/config/database');
const app = require('../../api/app');
const seedTickets = require('../../scripts/seed-tickets');
const request = supertest(app);


const randomString = Math.random().toString(36).substring(7);
const ticket = {
    _id: '', // will be set on `GET /api/tickets`
    customerName: 'Integration Customer',
    email: `${randomString}@example.com`,
    status: 'pending',
    notes: 'Integration Notes',
};
const updatedTicketData = {
    // _id: '', // not necessary
    customerName: `Updated ${ticket.customerName}`,
    email: `updated.${ticket.email}`,
    status: 'done',
    notes: `Updated ${ticket.notes}`,
};

describe('Integration tests', () => {

    // Connect to MongoDB and seed tickets before running tests
    beforeAll(async () => {
        const mongoUri = process.env.MONGO_URI;
        connectDB(mongoUri).then(() => {
            console.info('MongoDB connection established.'.green.bold);
            if (process.argv.includes('db:seed')) {
                seedTickets().then(() => {
                    console.info(`Seeding process completed.`.green.bold);
                });
            }
        });
    });

    // Check if the server is running
    it('GET /api', async () => {
        const response = await request.get('/api');

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Root URL');
    });

    // Check non-existing endpoint
    it('GET /api/<NON-EXISTING-ENDPOINT>', async () => {
        const randomUri = Math.random().toString(36).substring(7);
        const response = await request.get(`/api/${randomUri}`);

        expect(response.status).toBe(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('URL-endpoint not found!');
    });

    // Create a ticket
    it('POST /api/tickets', async () => {
        const response = await request.post('/api/tickets')
            .send(ticket)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Ticket created successfully.');
    });

    // Get all tickets and store the last created ticket in the `ticket` variable
    it('GET /api/tickets', async () => {
        const response = await request.get('/api/tickets')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Tickets retrieved successfully.');
        expect(response.body.tickets).toBeDefined();
        const lastTicket = response.body.tickets[response.body.tickets.length - 1];
        expect(lastTicket).toBeDefined();
        expect(lastTicket.customerName).toBe(ticket.customerName);
        expect(lastTicket.email).toBe(ticket.email);
        expect(lastTicket.status).toBe(ticket.status);
        expect(lastTicket.notes).toBe(ticket.notes);

        ticket._id = lastTicket._id;
    });

    // Update the last created ticket using `id` we previously stored in the `ticket` variable
    it('PATCH /api/tickets/:_id', async () => {
        const response = await request.patch(`/api/tickets/${ticket._id}`)
            .send({
                customerName: updatedTicketData.customerName,
                email: updatedTicketData.email,
                status: updatedTicketData.status,
                notes: updatedTicketData.notes,
            })
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Ticket updated successfully.');
    });

    // Get the updated ticket using `id` we previously stored in the `ticket` variable
    it('GET /api/tickets/:_id', async () => {
        const response = await request
            .get(`/api/tickets/${ticket._id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Ticket retrieved successfully.');
        expect(response.body.ticket).toBeDefined();
        expect(response.body.ticket.customerName).toBe(updatedTicketData.customerName);
        expect(response.body.ticket.email).toBe(updatedTicketData.email);
        expect(response.body.ticket.status).toBe(updatedTicketData.status);
        expect(response.body.ticket.notes).toBe(updatedTicketData.notes);
    });

    // Delete the last created ticket using `id` we previously stored in the `ticket` variable
    it('DELETE /api/tickets/:_id', async () => {
        const response = await request.delete(`/api/tickets/${ticket._id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Ticket deleted successfully.');
    });

    // Check if the ticket was deleted
    it('GET /api/tickets/:_id', async () => {
        const response = await request
            .get(`/api/tickets/${ticket._id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Ticket not found!');
    });

    // Drop the database and close the connection
    afterAll(async () => {
        await closeDB(true);
    });

});
