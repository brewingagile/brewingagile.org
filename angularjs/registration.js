function RegistrationController($scope, $resource, $window) {
	// var RegistrationResource = $resource("http://backoffice.brewingagile.org/api/registration/1/", {});
	var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.r = {
		participantName: "",
		participantEmail: "",
		billingCompany: "",
		billingAddress: "",
		dietaryRequirements: "",
		ticket: ""
	};

	$scope.highlightConference = function() {
		if ($scope.ticket === 'conference') return "checked";
		return ""
	};
}

RegistrationController.$inject = ['$scope', '$resource', '$window'];