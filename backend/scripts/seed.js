
require('dotenv').config();
const { connectDB } = require('../api/config/database');
const seedTickets = require('../scripts/seed-tickets');


const mongoUri = process.env.MONGO_URI;
connectDB(mongoUri).then(() => {
    console.info('MongoDB connection established.'.green.bold);
    seedTickets().then(() => {
        console.info(`Seeding process completed.`.green.bold);
        process.exit(0);
    });
});
