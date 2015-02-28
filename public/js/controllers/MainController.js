var app = angular.module("Tilt", []);

app.controller("MainController", function($scope, socketFactory){

	$scope.username = undefined;

	$scope.instruments = [
	{name: 'drums', open: true},
	{name: 'guitar', open: true},
	{name: 'bass', open: true},
	{name: 'keyboard', open: true},
	{name: 'harmonica', open: true},];

	$scope.start = function(name){
		$scope.name = name;
    
		// socket.broadcast.emit('user:join', {
		// 	name: name
		// });
		 // socket.on(userStream:name, function(){
			// socket.broadcast.emit('usersound', {

			// })
		 // })
	}
})

app.controller("formController", function($scope) {
  $scope.incomplete = true;


  $scope.complete = function () {
    $scope.incomplete = false;
  };


});

app.factory('socketFactory', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});