
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = require('./app');
const { connectDB } = require('./config/database');
const seedTickets = require('../scripts/seed-tickets');


const mongoUri = process.env.MONGO_URI;
connectDB(mongoUri).then(() => {
    console.info('MongoDB connection established.'.green.bold);
    if (process.argv.includes('db:seed')) {
        seedTickets().then(() => {
            console.info(`Seeding process completed.`.green.bold);
        });
    }
});

app.listen(port, () => console.info(`API server listening on port ${port}.`.green.bold));


// Exporting the app for Unit testing
module.exports = app;
