'use strict';

var russianApp = angular.module('russian', ['ngSanitize']);

russianApp.controller('mainCtrl', ['$scope', '$http', function scope($scope, $http) {
  $scope.json = {};
  $scope.reveal = {};
  $scope.show = {
    french: true,
    russian: true
  };

  $http.get('./words.json').then(function callback(response) {

    for (var cat in response.data) {
      $scope.json[cat] = [];
      for (var word in response.data[cat]) { // eslint-disable-line one-var
        $scope.json[cat].push({fr: word, ru: response.data[cat][word]});
      }
    }
  });


  $scope.shuffling = function shuffling() {
    var shuffledArray = [];
    for (var cat in $scope.json) {
      shuffledArray = shuffledArray.concat($scope.json[cat]);
    }

    var j, x, i; // eslint-disable-line one-var
    for (i = shuffledArray.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = shuffledArray[i - 1];
      shuffledArray[i - 1] = shuffledArray[j];
      shuffledArray[j] = x;
    }
    $scope.reveal = {};
    $scope.json = {'Every day I\'m shuffling': shuffledArray};
  };

  $scope.isString = function isString(str) {
    return typeof str === 'string';
  };

  $scope.accentuate = function accentuate(str) {
    if (str) {
      str = str.replace(/\(/g, '<b>');
      str = str.replace(/\)/g, '</b>');
      return '<span>' + str + '</span>';
    } else{
      return '-';
    }
  };

}]);
