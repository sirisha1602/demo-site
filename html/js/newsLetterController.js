app.controller('newsLetterController', function($scope, $http,$modal,$modalInstance) {
	$scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});