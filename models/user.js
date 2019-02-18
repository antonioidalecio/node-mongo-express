const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('../validation/joi')
const { parseJoiValidationError } = require('../utils')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    index: true,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    trim: true
  }
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(255).trim().required(),
    email: Joi.string().email().min(5).max(255).trim().required(),
    password: Joi.string().min(5).max(255).trim().required()
  }
  const options = {
		abortEarly: false
	}
  const { error } = Joi.validate(user, schema, options)
  return parseJoiValidationError(error)
}

module.exports = {
  User,
  validateUser
}