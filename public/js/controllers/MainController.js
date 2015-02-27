app.module("Tilt", []);

app.controller("MainController", function($scope, socket){

	$scope.username = undefined;

	$scope.instruments = [
	{name: 'drums', open: true},
	{name: 'guitar', open: true},
	{name: 'bass', open: true},
	{name: 'keyboard', open: true},
	{name: 'harmonica', open: true},];

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