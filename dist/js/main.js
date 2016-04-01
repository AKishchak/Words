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
      str = str.replace(/\(/g, '<b>');
      str = str.replace(/\)/g, '</b>');
      return str;
    } else{
      return '-';
    }
  };

}]);
