function RegistrationController($scope, $resource, $window, $timeout) {
	var RegistrationResource = $resource("https://backoffice.brewingagile.org/api/registration/1/", {});
//	var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.lastRegisteredName = "";
  $scope.showSuccess = false;
  $scope.showError = false;

	$scope.r = {
		participantName: "",
		participantEmail: "",
		billingCompany: "",
		billingAddress: "",
		billingMethod: "EMAIL", //EMAIL or SNAILMAIL
		dietaryRequirements: false,
		ticket: '',
    twitter: ""
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
		RegistrationResource.save($scope.r, function(p) {
			if (p.success) $scope.lastRegisteredName = $scope.r.participantName;
			$scope.showSuccess = p.success;
			$scope.showError = !p.success;
		}, function(response) { 
			$scope.showError = true;
		});
	};

  $scope.showForm = function() {
    if ($scope.showSuccess) return false;
    return true;
  }
}

RegistrationController.$inject = ['$scope', '$resource', '$window', '$timeout'];
