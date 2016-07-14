(function () {
    'use strict';

    angular
        .module('app')
        .controller('home_controller', function home_controller($scope, $log, $interval) {
          
          var greeting = "Hello! My name is Omid Nowrouzi. I am a senior computer science student at the University of Central Oklahoma. My primary interest is in web development. This page is a showcase of that. Please feel free to look around and let me know what you think.";
          $scope.typed = "Hello";
          
          function printGreeting(){ 
            var i = 5;
            var typeGreeting = $interval(function() {
              $scope.typed += greeting[i];
              i++;
              if (i == greeting.length) $interval.cancel(typeGreeting);
            }, 50); 
          }
          
          printGreeting();
        });
})();
