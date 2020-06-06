(function () {
  'use strict';
  
  angular.module('MenuApp')
  .controller('CategoryListController', CategoryListController);
  
  
  CategoryListController.$inject = ['items'];
  function CategoryListController(items) {
    this.items = items;
  }
  
  })();
