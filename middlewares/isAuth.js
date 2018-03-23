const mongoose = require('mongoose');

module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}
	// const currentUser = await mongoose.model('user').findOne();
	// req.user = currentUser;
	next();
	return null;
};
