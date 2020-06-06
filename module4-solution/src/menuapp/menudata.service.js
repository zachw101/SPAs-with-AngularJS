(function() {
  "use strict";

  angular.module("data")
    .service("MenuDataService", MenuDataService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ["$http", "ApiBasePath"];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function() {
      //https://davids-restaurant.herokuapp.com/categories.json
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      })
        .then(function(response){
          console.log('response.data: ', response.data);
          return response.data;
        });
    };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
            category: categoryShortName
        }
    }).then(function (response) {
      console.log('response.data: ', response.data);
      return response.data;
    });
  };
}



})();