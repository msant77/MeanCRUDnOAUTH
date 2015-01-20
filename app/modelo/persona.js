var mongoose = require('mongoose');

module.exports = mongoose.model('Persona', {
	nombre: String,
	apellido: String,
	edad: String,
	website: String
});