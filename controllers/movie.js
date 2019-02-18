const { Movie, validateMovie } = require('../models/movie')
const { isIdValid } = require('../utils')

class MovieController {
	static getAll(req, res) {
		Movie.find()
			.populate('genre', { name: 1, _id: 0 })
			.then((movies) => {
				res.send(movies)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static getById(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(400).send('Invalid ID')
		}
		Movie.findById(id)
			.then((movie) => {
				if (!movie) {
					return res
						.status(404)
						.send('Unable to find a movie with the given ID!')
				}
				Movie.send(movie)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static create(req, res) {
		const error = validateMovie(req.body)
		if (error) {
			return res.status(400).send(error)
		}
		const movie = {
			title: req.body.title,
			genre: req.body.genreId,
			numberInStock: req.body.numberInStock
		}
		Movie.create(movie)
			.then((createdMovie) => {
				res.send(createdMovie)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static update(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(400).send('Invalid ID')
		}
		const error = validateMovie(req.body)
		if (error) {
			return res.status(400).send(error)
		}
		const movie = {
			title: req.body.title,
			genre: req.body.genreId,
			numberInStock: req.body.numberInStock
		}
		const options = {
			new: true
		}
		Movie.findByIdAndUpdate(id, movie, options)
			.then((updatedMovie) => {
				if (!updatedMovie) {
					return res
						.status(404)
						.send('The movie with the given ID was not found!')
				}
				res.send(updatedMovie)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static delete(req, res) {
    const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(400).send('Invalid ID')
    }
    Movie.findByIdAndDelete(id).then((deletedMovie) => {
      if(!deletedMovie) {
        return res.status(404).send('The movie with the given ID was not found!')
      }
      res.send(deletedMovie)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
  }
}

module.exports = MovieController
