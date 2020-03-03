app.controller('freeOfficeController', function($scope, $http,$modal,$modalInstance) {
	$scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});