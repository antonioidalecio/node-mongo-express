const express = require('express')
const CustomerController = require('../controllers/customer')

const router = express.Router()

router
	.get('/', CustomerController.getAll)
	.post('/', CustomerController.create)
	.get('/:id', CustomerController.getById)
	.put('/:id', CustomerController.update)
	.delete('/:id', CustomerController.delete)

module.exports = router
