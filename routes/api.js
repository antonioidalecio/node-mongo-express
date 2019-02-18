const genre = require('./genre')
const customer = require('./customer')
const movie = require('./movie')
const rental = require('./rental')
const user = require('./user')

const express = require('express')

const router = express.Router()

router
	.use('/genres', genre)
	.use('/customers', customer)
	.use('/movies', movie)
	.use('/rentals', rental)
	.use('/users', user)

module.exports = router
