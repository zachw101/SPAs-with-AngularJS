(function () {
  'use strict';
  
  angular.module('LunchApp', [])
  .controller('LunchCheckerController', LunchCheckerController);
  
  LunchCheckerController.$inject = ['$scope'];
  function LunchCheckerController ($scope) {
    $scope.lunchMessage = "";
    $scope.lunchItems = "";
    $scope.messageColor = "text-danger";

    $scope.checkIfTooMuch = function () {
      $scope.lunchMessage = calcTooMuch($scope.lunchItems);
      if ($scope.lunchMessage !== "Please enter data first"){
        $scope.messageColor = "text-success";
      }
      else {
        $scope.messageColor = "text-danger";
      }
    };
  
  }

  function calcTooMuch(string) {
    var returnMessage = "";
    var splitString = string.split(',');

    if (!splitString[0]){
      returnMessage =  "Please enter data first";
    }
    else if (splitString.length <= 3){
      returnMessage =  "Enjoy!";
    }
    else {
      returnMessage =  "Too Much!";
    }
    return returnMessage;
  }
  
  })();
