
const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets');


router.get('/', ticketsController.all);
router.get('/:id', ticketsController.getOne);
router.post('/', ticketsController.create);
router.patch('/:id', ticketsController.update);
router.delete('/:id', ticketsController.delete);

module.exports = router;
