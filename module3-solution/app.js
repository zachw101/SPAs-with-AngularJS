(function () {
  'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['$http','MenuSearchService'];
function NarrowItDownController($http,MenuSearchService) {
  var makeNarrow = this;
  makeNarrow.found = [];

  makeNarrow.parseMenu = function (){
    if (makeNarrow.searchTerm === undefined || makeNarrow.searchTerm === ""){
      makeNarrow.fouund = [];
      console.log(' makeNarrow.fouund: ',  makeNarrow.fouund);
    } else {
      MenuSearchService.getMatchedMenuItems(makeNarrow.searchTerm)
      .then(function (list) {
        console.log('list: ', list);
        makeNarrow.found = list;
        console.log('makeNarrow.list: ', makeNarrow.list);
      }, function() {
        makeNarrow.errorMessage = "Whoops";
        console.log('makeNarrow.errorMessage: ', makeNarrow.errorMessage);
      });
    }
  };

  makeNarrow.emptyMessage = () => {
      return (makeNarrow.found === undefined) || (makeNarrow.found.length === 0);
    };

  makeNarrow.remove = function(index) {
    MenuSearchService.remove(index);
  }

} // end of NarrowItDownController


MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      console.log('result: ', result);
      console.log('searchTerm: ', searchTerm);
      // process result and only keep items that match
      var innerList = [];
      let menuItems = result.data.menu_items;
      searchTerm = searchTerm.toString();
      console.log('searchTerm: ', searchTerm);

      menuItems.forEach(item => {
        let desc = item.description;

        if(desc.indexOf(searchTerm) !== -1){
          innerList.push(item);
          console.log('item: ', item);
        }
        console.log('innerList: ', innerList);
      });
      // return processed items
      foundItems = innerList;
      console.log('foundItems: ', foundItems);
      console.log('innerList: ', innerList);
      return foundItems;
    });

  };

  service.remove = function (itemIndex) {
    console.log('itemIndex: ', itemIndex);
    console.log('foundItems: ', foundItems);
    foundItems.splice(itemIndex,1);
    console.log('foundItems: ', foundItems);
  };

}// end of MenuSearchService

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&',
      emptyMessage: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'foundList',
    bindToController: true
  };

  return ddo;
}




  })();