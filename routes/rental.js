const express = require('express')
const RentalController = require('../controllers/rental')

const router = express.Router()

router
	.get('/', RentalController.getAll)
	.post('/', RentalController.create)

module.exports = router
