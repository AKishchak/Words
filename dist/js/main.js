'use strict';

var russianApp = angular.module('russian', ['ngSanitize']);

russianApp.controller('mainCtrl', ['$scope', '$http', function scope($scope, $http) {
  $scope.json = {};
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
      var a = $scope.json[cat];
      var j, x, i; // eslint-disable-line one-var
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
      shuffledArray = shuffledArray.concat(a);
    }

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
