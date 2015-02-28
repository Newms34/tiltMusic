var app = angular.module("Tilt", []);

app.controller("MainController", function($scope, socketFactory){

	$scope.username = undefined;

	$scope.instruments = [
	{name: 'drums', open: true},
	{name: 'guitar', open: true},
	{name: 'bass', open: true},
	{name: 'keyboard', open: true},
	{name: 'harmonica', open: true},];

	$scope.user1log=[];
	$scope.user2log=[];
	$scope.user3log=[];
	$scope.user4log=[];
	$scope.user5log=[];


	$scope.start = function(name){
		$scope.username = name;
		socket.broadcast.emit('user:join', {
			name: name
		});
		 // socket.on(userStream:name, function(){
			// socket.broadcast.emit('usersound', {

			// })
		 // })
	}
})

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
