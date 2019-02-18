const mongoose = require('mongoose')
const Joi = require('../validation/joi')

const { parseJoiValidationError } = require('../utils')

const { ObjectId } = mongoose.Schema.Types

const rentalSchema = mongoose.Schema({
	movies: {
		type: [
			{
				type: ObjectId,
				ref: 'Movie'
			}
		],
		required: true
	},
	customer: {
		type: ObjectId,
		ref: 'Customer',
		required: true
	},
	dateOut: {
		type: Date,
    required: true,
    default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0,
		required: true
	}
})

const Rental = mongoose.model('Rental', rentalSchema)

const validateRental = (rental) => {
	const schema = {
    customerId: Joi.objectId().required(),
    moviesIds: Joi.array().items(Joi.objectId().required()).required(),
    rentalFee: Joi.number().min(0).required()
  }
  const options = {
    abortEarly: true
  }
  const { error } = Joi.validate(rental, schema, options)
  return parseJoiValidationError(error)
}

module.exports = {
	Rental,
	validateRental
}
