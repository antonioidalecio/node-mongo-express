const express = require('express')
const MovieController = require('../controllers/movie')

const router = express.Router()

router
	.get('/', MovieController.getAll)
	.post('/', MovieController.create)
	.get('/:id', MovieController.getById)
	.put('/:id', MovieController.update)
	.delete('/:id', MovieController.delete)

module.exports = router
