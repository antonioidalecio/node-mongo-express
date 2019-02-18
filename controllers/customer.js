const { Customer, validateCustomer } = require('../models/customer')
const { isIdValid } = require('../utils')

class CustomerController {
	static getAll(req, res) {
		Customer.find()
			.then((customers) => {
				res.send(customers)
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
		Customer.findById(id)
			.then((customer) => {
				if (!customer) {
					return res
						.status(404)
						.send('There is no customer with the supplied ID!')
				}
				res.send(customer)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static create(req, res) {
		const customer = {
			isGold: req.body.isGold,
			phone: req.body.phone,
			name: req.body.name
		}
		const error = validateCustomer(customer)
		if (error) {
			return res.status(400).send(error)
		}
		Customer.create(customer)
			.then((createdCustomer) => {
				res.send(createdCustomer)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static update(req, res) {
		const { id } = req.params
		const customer = {
			isGold: req.body.isGold,
			phone: req.body.phone,
			name: req.body.name
		}
		const options = {
			new: true
		}
		if (!isIdValid(id)) {
			return res.status(400).send('Invalid ID!')
		}
		const error = validateCustomer(customer)
		if (error) {
			return res.status(400).send(error)
		}
		Customer.findByIdAndUpdate(id, customer, options)
			.then((updatedCustomer) => {
				if (!updatedCustomer) {
					return res
						.status(404)
						.send('There is no customer with the supplied ID!')
				}
				res.send(updatedCustomer)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
  }

	static delete(req, res) {
		const { id } = req.params
		if (!isIdValid(id)) {
			return res.status(400).send('Invalid ID!')
		}
		Customer.findByIdAndDelete(id)
			.then((deletedCustomer) => {
				if (!deletedCustomer) {
					return res
						.status(404)
						.send('There is no customer with the supplied ID!')
				}
				res.send(deletedCustomer)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}
}

module.exports = CustomerController
