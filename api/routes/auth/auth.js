const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('dotenv').config();

const User = require('../../schemas/userSchema');

router.post('/signup', (req, res) => {
	if (req.body.login === '' || req.body.password === '') {
		res.status(400).json({ status: 'Failed', msg: 'Name or password not provided!' });

		return;
	}

	User.create({
		login: req.body.login,
		password: bcrypt.hashSync(req.body.password, 10)
	})
		.then(() => {
			res.status(200).json({ status: 'Success', msg: 'User created!' });

			return;
		})
		.catch((err) => {
			console.log(err);

			res.status(400).json({ status: 'Failed', msg: 'Something went wrong' });

			return;
		});
});

router.post('/login', (req, res) => {
	if (req.body.login === '' || req.body.password === '') {
		res.status(400).json({ status: 'Failed', msg: 'Name or password not provided!' });

		return;
	}

	User.findOne({ login: req.body.login }).then((user) => {
		if (!user) {
			res.status(404).json({ failcode: 1, msg: 'User was not found' });

			return;
		} else {
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				res.status(403).json({ failcode: 2, msg: 'Password is wrong' });
				return;
			} else {
				const token = jwt.sign({ id: user._id, login: user.login }, process.env.JWT_SECRET, {
					expiresIn: '2000s'
				});
				res.status(200).json({ msg: 'Success!', token: token });
				return;
			}
		}
	});
});

router.get('/verify', (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);

		res.json({ msg: 'User autorized', user: user });
	});
});

module.exports = router;
