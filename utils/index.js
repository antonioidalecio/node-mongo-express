const mongoose = require('mongoose')

const parseJoiValidationError = (validationError) => {
	if(validationError != null) {
		const parsedErrors = []
		const { details } = validationError
		for (let key in details) {
			const error = details[key]
			const newError = {
				message: error.message
			}
			parsedErrors.push(newError)
		}
		return parsedErrors
	} else {
		return null
	}
}

const isIdValid = (id) => {
	return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
	parseJoiValidationError,
	isIdValid
}
