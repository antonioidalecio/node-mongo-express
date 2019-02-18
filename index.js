const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const api = require('./routes/api')

const app = express()

const dbURI = 'mongodb://localhost/vidly'
mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true }, (error) => {
	if (error) {
		return console.error(
			'An error occurred while connecting to the database!',
			error
		)
	}
	console.log('Connected to the database!')
})

const env = app.get('env')
if (env === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', api)

const port = process.env.PORT || 3001

app.listen(port, (error) => {
	if (error) {
		return console.error(`An error occurred while listening to port ${port}`)
	}
	console.log(`🌎  Listening on port ${port}!`)
})
