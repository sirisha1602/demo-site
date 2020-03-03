app.controller('caseStudyController', function($scope, $http,$modal,$modalInstance) {
	$scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});