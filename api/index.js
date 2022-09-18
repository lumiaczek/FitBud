const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth/auth.js');

const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', auth);

app.get('/', (req, res) => {
	res.json({ status: 'Succes!' });
});

app.listen(process.env.PORT, () => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			console.log('Connected!');
		})
		.catch((err) => {
			console.log(err);
		});
});
