(function () {
  "use strict";
  
  angular.module('public')
  .controller('MyInfoController', MyInfoController);
  
  MyInfoController.$inject = ['SignUpDataService', 'ApiPath'];
  
  function MyInfoController(SignUpDataService, ApiPath) {
    var $ctrl = this;
    $ctrl.userFavorite = SignUpDataService.getUserFavorite();
    $ctrl.basePath = ApiPath;
  }
  
  })();