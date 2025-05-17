
require('dotenv').config();
const { seeds } = require('../api/config/static-data');
const Ticket = require('../api/models/ticket');
const { connectDB } = require('../api/config/database');


const mongoUri = process.env.MONGO_URI; // will be set in `docker-compose.yml`

connectDB(mongoUri).then(() => {
    seedTickets().then(() => {
        console.info(`Seeding process completed.`.green.bold);
        process.exit(0);
    });
});

const seedTickets = async () => {
    try {
        // const tickets = await Ticket.find();
        // if (tickets.length > 0) {
        //     console.info(`Tickets already exist Skipping seeding.`.yellow.bold);
        //     return;
        // }

        await Ticket.insertMany(seeds.tickets);

        console.info(`Tickets seeded successfully.`.green.bold);
    } catch (err) {
        console.error(err.message || err.toString());
    }
}
