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
       $scope.freqs = [];
       var len = freqIn.length;
       var hueDif = 360 / len;
       for (var i = 0; i < len; i++) {
           $scope.freqs.push({
               height: ((freqIn[i] / 1850) * 100) + '%',
               val: ((freqIn[i] / 1850) * 50) + '%',
               rot: Math.floor(Math.sin(freqIn[i]) * 20) + 'deg',
               hue: hueDif * i
           });
       }
       $scope.width = Math.floor(100 / freqIn.length) + '%';
       $scope.$digest();
   };
});

app.controller("formController", function($scope) {
  $scope.incomplete = true;

  $scope.allUsers = [];
  
  $scope.name = name;

  // $scope.start = function(name){  
  // socket.broadcast.emit('user:join', {
  //   name: name
  // });
  //  socket.on(userStream:name, function(){
  //   socket.broadcast.emit('usersound', {

  //   })
  //  })
  // };

  $scope.complete = function () {
    $scope.incomplete = false;
    // $scope.name = name;
    $scope.allUsers.push($scope.name);
    console.log($scope.allUsers);

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

