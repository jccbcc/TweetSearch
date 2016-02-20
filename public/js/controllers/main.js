var app = angular.module('todoController', ['ngSanitize']);
//var http = require('http');
//var request = require('request');
//var Autolinker = require('autolinker');


app.config(['$httpProvider', function($httpProvider) {

	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

	}
]);



// inject the Todo service factory into our controller
//.controller('mainController', '$scope','$http','Todos', function($scope, $http, Todos) {
//.controller('mainController', ['$scope','$http', function($scope, $http) {
app.controller('mainController', function($scope, $http, $filter) {

	
    $http.get("http://54.191.254.205:8081/twitter/search?query=NBA&count=45").then(function(response) {
    	$scope.myData = response;
    	console.log(response);
	});

    $scope.query = "Super Bowl";

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    //$scope.data = [];
    $scope.q = '';


    $scope.getData = function () {
    	return $filter('filter')($scope.myData, $scope.query)
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
    
    /*for (var i=0; i<65; i++) {
        $scope.myData.push(myData);
    }*/


    // function to search against Twitter
	this.changeQuery = function() {

		var temp = this.query;

		$http.get("http://54.191.254.205:8081/twitter/search?query=" + temp + "&count=45").then(function(response) {
			$scope.myData = response;
		});

	};

	//reset the query search 
	this.reset = function() {
		this.query = "";	
	};

});


app.filter('startFrom', function() {
    return function(input, start) {
    	console.log('********** input = ' + input);
    	console.log('********** start = ' + start);
        start = +start; //parse to int
        return input.slice(start);
    }
});



app.directive("linkify", function($filter)
{
	return {
		restrict: 'E',
		scope: {
			tweet: '='
		},
		link: function(scope, element, attrs)
		{
			scope.getContentUrl = function(filter) {
                //var linkedText = Autolinker.link( scope.tweet, { className: "" } );
				//alert(linkedText);
				var linkedText = $filter('linky')(scope.tweet);
				//alert(linkedText);
				scope.linked = linkedText;
				
				//scope.linked = linkedText;
				//return linkedText;
           }
			
		},
		template: '<div ng-open="getContentUrl()">{{linked}}</div>'
	};

}); 







