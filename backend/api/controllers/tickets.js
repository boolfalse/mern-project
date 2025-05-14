
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
    reorder: asyncHandler(async (req, res) => {
        const { start, end } = req.body;

        try {
            const tickets = await Ticket.find().sort({ priority: 1 });
            if (start > tickets.length || end > tickets.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid start or end index!',
                });
            }

            const ids = tickets.map(ticket => ticket._id);
            const priorities = tickets.map(ticket => ticket.priority);

            const out_priority = priorities.splice(start - 1, 1);
            priorities.splice(end - 1, 0, ...out_priority);

            let when_then = '';
            let where_in = '';
            for (let i = 0; i < priorities.length; i++) {
                const id = ids[priorities[i] - 1];
                when_then += `WHEN ${id} THEN ${i + 1} `;
                where_in += `${id},`;
            }

            // const bulk_update_query = `UPDATE Ticket SET priority = (CASE id ${when_then} END) WHERE id IN(${where_in.slice(0, -1)}) AND deleted_at IS NULL;`;

            await Ticket.updateMany(
                { _id: { $in: ids } },
                { $set: { priority: priorities } }
            );

            return res.status(200).json({
                success: true,
                message: 'Tickets reordered successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || err.toString(),
            });
        }
    }),
}
