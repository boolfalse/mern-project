
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'done', 'open'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
