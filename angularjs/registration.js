function RegistrationController($scope, $resource) {
	var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.r = {
		participantName: "test",
		participantEmail: "",
		billingCompany: "",
		billingAddress: ""
	};

	$scope.submit = function() {
		RegistrationResource.save($scope.r, function(result) {

		});
	};
}

RegistrationController.$inject = ['$scope', '$resource'];