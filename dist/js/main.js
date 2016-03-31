'use strict';

var russianApp = angular.module('russian', ['ngSanitize']);

russianApp.controller('mainCtrl', ['$scope', '$http', function scope($scope, $http) {
  $scope.json = {};
  $scope.show = {
    french: true,
    russian: true
  };

  $http.get('./words.json').then(function callback(response) {
    $scope.json = response.data;
  });

  $scope.accentuate = function accentuate(str) {
    if (str) {
      var startReg = /\(/;
      var endReg = /\)/;
      str = str.replace(startReg, '<b>');
      str = str.replace(endReg, '</b>');
      return str;
    } else{
      return '-';
    }
  };

}]);
