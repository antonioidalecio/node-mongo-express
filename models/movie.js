const mongoose = require('mongoose')
const Joi = require('../validation/joi')

const { parseJoiValidationError } = require('../utils')

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre'
	},
	numberInStock: {
		type: Number,
		default: 0,
		required: true
	},
	dailyRentalRate: {
		type: Number,
		default: 0
	}
})

const Movie = mongoose.model('Movie', movieSchema)

const validateMovie = (movie) => {
	const schema = {
		title: Joi.string()
			.trim()
			.min(5)
			.max(255)
			.required(),
		genreId: Joi.objectId()
			.required(),
		numberInStock: Joi.number()
			.positive()
			.required(),
		dailyRentalRate: Joi.number()
	}
	const options = {
		abortEarly: false
	}
	const { error } = Joi.validate(movie, schema, options)
	return parseJoiValidationError(error)
}

module.exports = {
	Movie,
	validateMovie
}
