angular.module('MainApp', [])

function mainController($scope, $http) {

	$scope.selected = false;

	$scope.newStore = {};
	$scope.stores = {}; 

	$scope.user = {}; 

	$scope.isAdmin = false; 

	$http.get('/api/getLoggedUser').success(function(dude) {
		$scope.user = dude;
		$scope.isAdmin = dude.isAdmin; 

		$http.get('/api/storeFromUser').success(function(data) {
			$scope.stores = data;
		})
		.error(function(data) {
			console.log('Error on getting customers: ' + data);
		});
	})
	.error(function(data) {
		console.log('Error getting the dude: ' + dude);
	});

	$scope.getUser = function () {
		$http.get('/api/getLoggedUser').success(function(data) {
			$scope.user = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.clearFields = function () {

		$scope.newStore = {};
		$scope.selected = false; 
	}; 

	// Función para registrar a una persona
	$scope.addStore = function() {
		$scope.newStore.userEmail = $scope.user.email; 
		$scope.newStore.userName = $scope.user.name; 
		$http.post('/api/store', $scope.newStore)
		.success(function(data) {
				$scope.newStore = {}; // Borramos los datos del formulario
				$scope.stores = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una persona
	$scope.changeStore = function(newStore) {
		$http.put('/api/store/' + $scope.newStore._id, $scope.newStore)
		.success(function(data) {
				$scope.newStore = {}; // Borramos los datos del formulario
				$scope.stores = data;
				$scope.selected = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona conocido su id
	$scope.eraseStore = function(newStore) {
		$http.delete('/api/store/' + $scope.newStore._id)
		.success(function(data) {
			$scope.newStore = {};
			$scope.stores = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectStore = function(store) {
		$scope.newStore = store;
		$scope.selected = true;
	};

}

