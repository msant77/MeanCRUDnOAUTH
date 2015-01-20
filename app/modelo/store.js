var mongoose = require('mongoose');

module.exports = mongoose.model('Store', {
	userEmail			: String, 
	userName			: String, 
	cgc					: String,
	brandName			: String,
	contactName			: String,
	phone1				: String,
	phone2				: String,
	phone3				: String,
	address				: String,
	district			: String,
	cep					: String, 
	email 				: String,
	website				: String
});