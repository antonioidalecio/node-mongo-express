const mongoose = require('mongoose')
const Joi = require('../validation/joi')
const { parseJoiValidationError } = require('../utils')

const customerSchema = mongoose.Schema({
	isGold: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
})

const Customer = mongoose.model('Customer', customerSchema)

const validateCustomer = (customer) => {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		phone: Joi.string()
			.min(5)
			.max(50)
			.required(),
		isGold: Joi.boolean()
	}
	const options = {
		abortEarly: false
	}
	const { error } = Joi.validate(customer, schema, options)
	return parseJoiValidationError(error)

}

module.exports = {
	Customer,
	validateCustomer
}
