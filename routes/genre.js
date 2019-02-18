const express = require('express')
const GenreController = require('../controllers/genre')

const router = express.Router()

router
	.get('/', GenreController.getAll)
	.post('/', GenreController.create)
	.get('/:id', GenreController.getById)
	.put('/:id', GenreController.update)
	.delete('/:id', GenreController.delete)

module.exports = router
