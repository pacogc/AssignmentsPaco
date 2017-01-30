(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  ShoppingListCheckOffService.addItem('Chocolate','23');
  ShoppingListCheckOffService.addItem('Milk','4');
  ShoppingListCheckOffService.addItem('Chips','56');
  ShoppingListCheckOffService.addItem('Bread','7');
  ShoppingListCheckOffService.addItem('Orange Juice','29');

  toBuyList.items = ShoppingListCheckOffService.getToBuytItems();

  toBuyList.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [];
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    toBuyItems.push(item);
  };

  service.boughtItem = function (itemIdex) {
    boughtItems.push(toBuyItems[itemIdex]);
    toBuyItems.splice(itemIdex, 1);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getToBuytItems = function () {
    return toBuyItems;
  };
}

})();
