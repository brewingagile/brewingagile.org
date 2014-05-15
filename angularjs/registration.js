function RegistrationController($scope, $resource, $window, $timeout) {
	var RegistrationResource = $resource("https://backoffice.brewingagile.org/api/registration/1/", {});
//	var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.lastRegisteredName = "";

	$scope.r = {
		participantName: "",
		participantEmail: "",
		billingCompany: "",
		billingAddress: "",
		billingMethod: "", //EMAIL or SNAILMAIL
		dietaryRequirements: false,
		ticket: '',
		workshop: false
	};

	$scope.reset = function() {	
		$scope.showSuccess = false;
		$timeout(function() {
			document.getElementById("inputParticipantName").focus(); //this is not the angular way, I know.
		});
	};

	$scope.submit = function() {
		$scope.showSuccess = false;
		$scope.showError = false;
		RegistrationResource.save($scope.r, function(result) {
			$scope.lastRegisteredName = $scope.r.participantName;
			$scope.showSuccess = true;
		}, function(response) { 
			$scope.showError = true;
		});
	};
}

RegistrationController.$inject = ['$scope', '$resource', '$window', '$timeout'];
