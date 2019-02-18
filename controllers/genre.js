const { Genre, validateGenre } = require('../models/genre')
const { isIdValid } = require('../utils')

class GenreController {
	static getAll(req, res) {
		Genre.find()
			.then((genres) => {
				res.send(genres)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static getById(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(404).send('Invalid ID!')
		}
		Genre.findById(id)
			.then((genre) => {
				if (genre == null) {
					return res
						.status(404)
						.send('The genre with the given ID was not found!')
				}
				res.send(genre)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static create(req, res) {
		const error = validateGenre(req.body)
		if (error != null) {
			return res.status(400).send(error)
		}
		const genre = {
			name: req.body.name
		}
		Genre.create(genre)
			.then((createdGenre) => {
				res.send(createdGenre)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static update(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(404).send('Invalid ID!')
		}
		const error = validateGenre(req.body)
		if (error != null) {
			return res.status(400).send(error)
		}
		const updates = {
			name: req.body.name
		}
		const options = {
			new: true
		}
		Genre.findByIdAndUpdate(id, updates, options)
			.then((updatedGenre) => {
				if (updatedGenre == null) {
					return res
						.status(404)
						.send('The genre with the given ID was not found!')
				}
				res.send(updatedGenre)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static delete(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(404).send('Invalid ID!')
		}
		Genre.findByIdAndDelete(id)
			.then((deletedGenre) => {
				if (deletedGenre == null) {
					return res
						.status(404)
						.send('The genre with the given ID was not found!')
				}
				res.send(deletedGenre)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}
}

module.exports = GenreController
