const Joi = require('../validation/joi')
const mongoose = require('mongoose')
const { parseJoiValidationError } = require('../utils')

const genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
})

const Genre = mongoose.model('Genre', genreSchema)

const validateGenre = (genre) => {
	const schema = {
		name: Joi.string()
			.trim()
			.min(3)
			.required()
	}
	const options = {
		abortEarly: false
	}
	const { error } = Joi.validate(genre, schema, options)
	return parseJoiValidationError(error)
}

module.exports = {
	Genre,
	genreSchema,
	validateGenre,
}
