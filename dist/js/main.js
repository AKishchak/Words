'use strict';

var russianApp = angular.module('russian', ['ngSanitize']);

russianApp.controller('mainCtrl', ['$scope', '$http', function scope($scope, $http) {
  $scope.json = {};
  $scope.verbs = [];
  $scope.reveal = {};
  $scope.nbLast = 50;
  $scope.show = {
    french: true,
    russian: true,
    handwritten: false
  };

  $http.get('./words.json').then(function callback(response) {
    for (var cat in response.data) {
      $scope.json[cat] = [];
      for (var word in response.data[cat]) { // eslint-disable-line one-var
        $scope.json[cat].push({fr: word, ru: response.data[cat][word]});
      }
    }
  });

  $http.get('./verbs.json').then(function callback(response) {
    var res = response.data;
    for (var word in res) { // eslint-disable-line one-var
      $scope.verbs.push({fr: word, ru: res[word]});
    }
  });

  $scope.limit = function limit() {
    for (var cat in $scope.json) {
      $scope.json[cat] = $scope.json[cat].slice(-$scope.nbLast);
    }
  };

  $scope.shuffling = function shuffling() {
    var shuffledArray = [];
    for (var cat in $scope.json) {
      var arr = $scope.json[cat];
      shuffledArray = shuffledArray.concat(arr);
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
