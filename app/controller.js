var Persona = require('./modelo/persona');
var Store = require('./modelo/store'); 
var config = require('../config/config.js');


var criteria = {};
var fieldList = 
	"userEmail userName cgc brandName contactName phone1 phone2 phone3 address district cep email website";				
var options = { 
    sort:{
        brandName: 1 //Sort by Date Added DESC
    }		
};


// Obtiene todos los objetos Tienda (Store) de la base de datos
exports.getStore = function (req, res){
	//console.log('getting by getStore');
	Store.find(
		function(err, store) {
			console.log(err); 
			if (err)
				res.send(err)
					res.json(store); // devuelve todas las tiendas en JSON		
				}
			);
}


exports.getStoreByEmail = function (req, res){

	var email = req.user.local.email;
	var isAdmin = (email === config.adminKey); 
	criteria =  isAdmin ? {} : {"userEmail" : email};

	Store.find(
		criteria, 
		fieldList, 
		options, 
		function(err, store) {
			if (err)
				res.send(err)
					res.json(store); // devuelve todas las tiendas en JSON		
		}
	);
}


// Guarda un objeto Tienda (Store) en base de datos
exports.setStore = function(req, res) {

		criteria =  {"userEmail" : req.user.local.email};

		// Creo el objeto Store
		Store.create(
			{ 
				userEmail			: req.body.userEmail, 
				userName			: req.body.userName, 
				cgc					: req.body.cgc, 
				brandName			: req.body.brandName,
				contactName			: req.body.contactName,
				phone1				: req.body.phone1,
				phone2				: req.body.phone2,
				phone3				: req.body.phone3,
				address				: req.body.address,
				district			: req.body.district,
				cep 				: req.body.cep, 
				email				: req.body.email,
				website				: req.body.website
			}, 
			function(err, store) {
				if (err)
					res.send(err);

				Store.find(
					criteria, 
					fieldList, 
					options, 
					function(err, store) {
						if (err)
							res.send(err)
								res.json(store); // devuelve todas las tiendas en JSON		
					}
				);
			}
		);
	}

// Modificamos un objeto Tienda (Store) de la base de datos
exports.updateStore = function(req, res){

	criteria =  {"userEmail" : req.user.local.email};


	Store.update( {_id : req.params.store_id},
					{$set:
						{ 
							brandName			: req.body.brandName,
							cgc					: req.body.cgc, 
							contactName			: req.body.contactName,
							phone1				: req.body.phone1,
							phone2				: req.body.phone2,
							phone3				: req.body.phone3,
							address				: req.body.address,
							district			: req.body.district,
							cep 				: req.body.cep, 
							email				: req.body.email,
							website				: req.body.website
						}
					}, 
					function(err, store) {
						if (err)
							res.send(err);

				Store.find( 
					criteria, 
					fieldList, 
					options, 
					function(err, store) {
						if (err)
							res.send(err)
								res.json(store); // devuelve todas las tiendas en JSON		
					}
				);
			});
	}

// Elimino un objeto Tienda (Store) de la base de Datos
exports.removeStore = function(req, res) {

	criteria =  {"userEmail" : req.user.local.email};

	Store.remove({_id : req.params.store_id}, function(err, store) {
		if (err) {
			res.send(err);
		}

		Store.find( 
			criteria, 
			fieldList, 
			options, 
			function(err, store) {
				if (err)
					res.send(err)
						res.json(store); // devuelve todas las tiendas en JSON		
			}
		);
	});
}




