const { Rental, validateRental } = require('../models/rental')

class RentalController {
	static getAll(req, res) {
		Rental.find()
			.populate({
				path: 'movies',
				select: {
          title: 1,
          numberInStock: 1
				},
				populate: {
					path: 'genre',
					select: { name: 1 }
				}
			})
			.populate({
				path: 'customer',
				select: {
					name: 1,
					phone: 1,
					isGold: 1,
				}
      })
      .sort('-dateOut')
			.then((rentals) => {
				res.send(rentals)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}

	static create(req, res) {
		const errors = validateRental(req.body)
		if (errors) {
			return res.status(400).send(errors)
		}
		const rental = {
			movies: req.body.moviesIds,
      customer: req.body.customerId,
      rentalFee: req.body.rentalFee
		}
		Rental.create(rental)
			.then((createdRental) => {
				if (!createdRental) {
					return res
						.status(404)
						.send(
							'Unable to create the rental, please check the movies IDs and movie ID!'
						)
				}
				res.send(createdRental)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}
}

module.exports = RentalController
