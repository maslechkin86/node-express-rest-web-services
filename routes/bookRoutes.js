var express = require('express');

var routes = function(Book) {
	var router = express.Router();

	var bookController = require('../controllers/bookController')(Book);

	router.route('/')
		.post(bookController.post)
		.get(bookController.get);

	router.use('/:bookId', function(req, res, next) {
		Book.findById(req.params.bookId, function(err, book) {
			if(err) {
				res.status(500).send(err);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(404).send('no book found');
			}
		});
	});

	router.route('/:bookId')
		.get(bookController.getById)
		.put(bookController.putById)
		.patch(bookController.putchById)
		.delete(bookController.deleteById);

	return router;
};

module.exports = routes;
