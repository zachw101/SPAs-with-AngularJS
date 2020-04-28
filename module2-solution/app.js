(function () {
  'use strict';
  
  var shoppingList = [
    {
      name: "Dog Food Bags",
      quantity: "20"
    },
    {
      name: "Toilet Papper Rolls",
      quantity: "200"
    },
    {
      name: "Paper Towels Rolls",
      quantity: "300"
    },
    {
      name: "Egg Cartons",
      quantity: "5"
    },
    {
      name: "Chicken Wings",
      quantity: "5"
    }
  ];

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  boughtList.empty = ShoppingListCheckOffService.empty;

  boughtList.addItem = function () {
    ShoppingListCheckOffService.addItem(boughtList.itemName, boughtList.itemQuantity);
  }

}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.removeItem = function(itemIndex){
    ShoppingListCheckOffService.empty = false;
    try {
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
    
      toBuyList.errorMessage = error.message;
    }
  }

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var toBuyItems = shoppingList;

  // List of shopping items already bought
  var boughtItems = [];

  service.empty = true;

  service.removeItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex,1);
    if (boughtItems.length > 4) {
      throw new Error("Everything is bought!");
    }
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };
}



  })();
