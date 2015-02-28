var app = angular.module("Tilt", []);

app.controller("MainController", function($scope, socket) {
    $scope.username = undefined;
    $scope.freqs = [];
    $scope.width = 100+'%';

    $scope.instruments = [{
        name: 'drums',
        open: true
    }, {
        name: 'guitar',
        open: true
    }, {
        name: 'bass',
        open: true
    }, {
        name: 'keyboard',
        open: true
    }, {
        name: 'harmonica',
        open: true
    }, ];

    $scope.start = function(name) {
        $scope.username = name;
        socket.broadcast.emit('user:join', {
            name: name
        });
    }
    $scope.freqShow = function(freqIn) {
    	$scope.freqs=[];
        freqIn.forEach(function(aFreq) {
        	var hue = Math.floor(Math.random()*360);
            $scope.freqs.push({
            	height:((aFreq/1850)*100)+'%',
            	val:((aFreq/1850)*50)+'%',
            	rot: Math.floor(Math.sin(aFreq)*20)+'deg'
            });
        })
        $scope.width = Math.floor(100/freqIn.length)+'%';

        $scope.$digest();
    }

})