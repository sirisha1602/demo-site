
    // Defining angularjs application.
    var app = angular.module('postApp', ['ui.bootstrap']);
    // Controller function and passing $http service and $scope var.
    app.controller('postController', function($scope, $http,$modal) {
	
	$scope.getFreeTrial = function(){
	 var modalInstance = $modal.open({
	          templateUrl: 'ctform.html',
	          backdrop: true,
	          scope: $scope, 
	          controller: 'contactController',
	        });
	}
	
	$scope.getFreeDemo = function(){
	 var modalInstance = $modal.open({
	          templateUrl: 'ctdemo.html',
	          backdrop: true,
	          scope: $scope, 
	          controller: 'ctDemoController',
	        });
	}
	
	$scope.getCaseStudy = function(){
	 var modalInstance = $modal.open({
	          templateUrl: 'caseStuday.html',
	          backdrop: true,
	          scope: $scope, 
	          controller: 'caseStudyController',
	        });
	}
	
	$scope.getFreeOfficeHours = function(){
	 var modalInstance = $modal.open({
	          templateUrl: 'officeHours.html',
	          backdrop: true,
	          scope: $scope, 
	          controller: 'freeOfficeController',
	        });
	}
	
	$scope.getNewsLetter = function(){
	 var modalInstance = $modal.open({
	          templateUrl: 'newsLetter.html',
	          backdrop: true,
	          scope: $scope, 
	          controller: 'newsLetterController',
	        });
	}
	
	
	
    $scope.showMessage = false;

    $scope.baseUrl ="//"+window.location.hostname;
    // create a blank object to handle form data.
       
    // calling our submit function.
    $scope.submitForm = function(data) {
	$scope.showMessage = false;
    // Posting data to app

	$scope.contentData = "<h4>"+"User: "+data.name+"<br>"+"User-Email: "+data.email+"<br>"+"Company Name: "+ data.companyname+"<br"+"Message: "+data.message+"</h4>";	

        var postData = {	   
				toEmail: "gopal@opsmx.com,gopinath@opsmx.com",
				ccMail: "balaji@opsmx.com",
				subject: "New message posted in OpsMx website",
				content: $scope.contentData
		}
		console.log(JSON.stringify(postData));
	    $http({
	  		method : "POST",
            /*url: $scope.baseUrl + "/canaries/getcanaryids?pipelineid=" + pipelineID,*/
	  		url: "http://52.53.65.44:8090/email/send",
            /*url: "http://localhost:8090/email/send",*/
  			data: postData,
	  		headers: {'content-type': 'application/json','accept':'application/json'}
	  	    }).success(function(response){
			    console.log(response);		
	  		    $scope.successMessage = response;
                
            }).error(function(error){
                console.log(error);
        })
        $scope.showMessage = true;
		$scope.name = '';
  		$scope.email = '';
  		$scope.message = '';
        $scope.companyname = '';
		
        };
    });

