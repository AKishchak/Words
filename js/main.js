'use strict';

var russianApp = angular.module('russian', ['ngSanitize']);

russianApp.controller('mainCtrl', ['$scope', '$http', function scope($scope, $http) {
  $scope.json = {};
  $scope.reveal = {};
  $scope.nbLast = 50;
  $scope.show = {
    french: true,
    russian: true,
    handwritten: false
  };

  $scope.cat = window.cat;

  $http.get('./' + $scope.cat + '.json').then(function callback(response) {
    $scope.json[$scope.cat] = [];
    for (var word in response.data) { // eslint-disable-line one-var
      $scope.json[$scope.cat].push({fr: word, ru: response.data[word]});
    }
  });

  $scope.limit = function limit() {
    $scope.json[$scope.cat] = $scope.json[$scope.cat].slice(-$scope.nbLast);
  };

  $scope.shuffling = function shuffling() {
    var shuffledArray = $scope.json[$scope.cat];
    // for (var cat in $scope.json) {
    //   var arr = $scope.json[cat];
    //   shuffledArray = shuffledArray.concat(arr);
    // }

    var j, x, i; // eslint-disable-line one-var
    for (i = shuffledArray.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = shuffledArray[i - 1];
      shuffledArray[i - 1] = shuffledArray[j];
      shuffledArray[j] = x;
    }
    $scope.reveal = {};
    $scope.json[$scope.cat] = shuffledArray;
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
