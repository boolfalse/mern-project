
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type'] // Allow specific headers
}));


// URL-endpoints
app.get('/api', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Root URL'
    });
});
app.use('/api/tickets', require('./routes/tickets'));

// Handling errors for 404 not-founds
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "URL-endpoint not found!"
    });
});

// Handling errors for any other cases from the whole application
app.use((err, req, res) => {
    return res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});


module.exports = app;
