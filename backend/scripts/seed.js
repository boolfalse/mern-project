
const { seeds } = require('../api/config/static-data');
const Ticket = require('../api/models/ticket');
const { connectDB } = require('../api/config/database');


const mongoUri = process.env.MONGO_URI; // will be set in `docker-compose.yml`
connectDB(mongoUri).then(() => {
    seedTickets().then(() => console.info(`Tickets seeded.`.green.bold));
});

const seedTickets = async () => {
    try {
        const tickets = await Ticket.find();
        if (tickets.length > 0) {
            console.info('Tickets already seeded. Skipping seeding!'.yellow.bold);
            return;
        }

        for (const ticket of seeds.tickets) {
            await Ticket.create({
                // _id will be auto-generated
                // createdAt will be auto-generated
                customerName: ticket.customerName,
                email: ticket.email,
                notes: ticket.notes,
                status: ticket.status,
            });
        }
        console.info('Tickets seeded successfully.'.green.bold);
    } catch (err) {
        console.error(err.message || err.toString());
    }
}


module.exports = seedTickets;
