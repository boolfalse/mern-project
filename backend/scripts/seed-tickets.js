
const Ticket = require('../api/models/ticket');
const {seeds} = require('../api/config/static-data');

const seedTickets = async () => {
    try {
        // const tickets = await Ticket.find();
        // if (tickets.length > 0) {
        //     console.info(`Tickets already exist Skipping seeding.`.yellow.bold);
        //     return;
        // }

        await Ticket.deleteMany();
        await Ticket.insertMany(seeds.tickets);

        console.info(`Tickets seeded successfully.`.green.bold);
    } catch (err) {
        console.error(err.message || err.toString());
    }
}

module.exports = seedTickets;
