const { User, validateUser } = require('../models/user')

class UserController {
	static create(req, res) {
		const user = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email
		}
    const error = validateUser(user)
		if (error) {
			return res.status(500).send(error)
		}
		User.create(user)
			.then((createdUser) => {
				res.send(createdUser)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}
}

module.exports = UserController
