
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = require('./app');
const { connectDB } = require('./config/database');


const mongoUri = process.env.MONGO_URI; // will be set in `docker-compose.yml`
connectDB(mongoUri).then(r => {
    console.info('MongoDB connection established.'.green.bold);
});

app.listen(port, () => console.info(`API server listening on port ${port}.`.green.bold));


// Exporting the app for Unit testing
module.exports = app;
