function RegistrationController($scope, $resource, $window) {
	var RegistrationResource = $resource("http://backoffice.brewingagile.org/api/registration/1/", {});
	// var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.r = {
		participantName: "",
		participantEmail: "",
		billingCompany: "",
		billingAddress: "",
		dietaryRequirements: false,
		workshop: false
	};

	$scope.submit = function() {
		RegistrationResource.save($scope.r, function(result) {
			$window.alert("We love popups. And ponies.")
		});
	};
}

RegistrationController.$inject = ['$scope', '$resource', '$window'];