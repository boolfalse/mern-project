
const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticket');


module.exports = {
    all: asyncHandler(async (req, res) => {
        try {
            const tickets = await Ticket.find();

            return res.status(200).json({
                success: true,
                tickets,
                message: 'Tickets retrieved successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
    getOne: asyncHandler(async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id);
            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found!',
                });
            }

            return res.status(200).json({
                success: true,
                ticket,
                message: 'Ticket retrieved successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
    create: asyncHandler(async (req, res) => {
        try {
            const ticket = await Ticket.create({
                customerName: req.body.customerName,
                email: req.body.email,
                notes: req.body.notes,
                status: req.body.status,
            });

            return res.status(201).json({
                success: true,
                message: 'Ticket created successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
    update: asyncHandler(async (req, res) => {
        try {
            const ticket = await Ticket.findByIdAndUpdate(req.params.id, {
                customerName: req.body.customerName,
                email: req.body.email,
                notes: req.body.notes,
                status: req.body.status,
            }, {new: true});
            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found!',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Ticket updated successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
    delete: asyncHandler(async (req, res) => {
        try {
            const ticket = await Ticket.findByIdAndDelete(req.params.id);
            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket not found!',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Ticket deleted successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
}
