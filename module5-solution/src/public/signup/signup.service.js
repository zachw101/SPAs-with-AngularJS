(function () {
  "use strict";
  
  angular.module('public')
  .service('SignUpDataService', SignUpDataService);
  
  function SignUpDataService() {
    var service = this;
    var userFavorite;
  
    service.setUserFavorite = function(userFavorite) {
      service.userFavorite = userFavorite;
    }
  
    service.getUserFavorite = function() {
      return service.userFavorite;
    }
  
  }
  
  })();