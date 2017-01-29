const mongoose = require('mongoose')
const Message = require('../models/message.js')

module.exports = function(app, hbs) {

	app.get('/', (req,res) => {

		Message.find((err, messages) => {
			if (err) {
				console.log('error');
			} else {
				res.render('index', {messages})
			}
		})
	})

	app.post('/', (req,res) => {
		let message = new Message()
		message.name = req.body.name
		message.message = req.body.message

		message.save((err)=> {
			if (err) {
				console.log('error')
				res.redirect('/')
			}
		})
		res.redirect('/')
	})

	app.get('/delete/:id', (req, res) => {
		Message.findByIdAndRemove(req.params.id, (err) => {
			if (err) {
				console.log('error')
				res.redirect('/')
			}
			res.redirect('/')
		})
	})

	app.get('/edit/:id', (req, res) => {
		Message.findOne({ _id: req.params.id }, (err, message) => {
			if (err) {
				console.log('error')
				res.redirect('/')
			} else {
				res.render('edit', {message})
			}
		})
	})

	app.post('/edit/:id', (req, res) => {
		Message.findById(req.params.id, (err, message) => {
			if (err) {
				console.log('error')
				res.redirect('/')
			} else {
				message.name = req.body.name
				message.message = req.body.message
				message.save((err) => {
					if (err) {
						console.log('error')
						res.redirect('/')
					}
					res.redirect('/')
				})
			}
		})
	})
}
