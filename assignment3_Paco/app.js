(function () {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
     templateUrl: 'foundItems.html',
     scope: {
       items: '<',
       onRemove: '&'
     },
     controller: FoundItemsDirectiveController,
     controllerAs: 'found',
     bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

  found.emptyList = function(){
    if (found.items != null && found.items.length === 0){
      return true;
    }
    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var found=this;
  var searchTerm="";

  found.getMatchedMenuItems = function(searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (foundItems) {
      found.items = foundItems;
    })
    .catch(function (error) {
      console.log(error);
    });
}
  // found.getMatchedMenuItems=function(searchTerm)
  // {
  //   console.log("found: ", found.length );
  //   console.log("searchTerm: ", searchTerm );
  //   MenuSearchService.getMatchedMenuItems(searchTerm);
  //   console.log("found: ", found );
  // };

  found.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var foundItems=[];

  service.getMatchedMenuItems = function (searchTerm) {
    foundItems=[];
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });


    return response.then(function (result) {
        // process result and only keep items that match
    for (var i = 0; i < result.data.menu_items.length; i++) {
          var desc = result.data.menu_items[i].description;
          var item = {
            name: result.data.menu_items[i].name,
            short_name: result.data.menu_items[i].short_name,
            description: result.data.menu_items[i].description
          }
          if (desc.toLowerCase().indexOf(searchTerm)!== -1) {
            foundItems.push(item);
          }
        }
        // return processed items
        return foundItems;
    });
  };

  service.removeItem = function (itemIdex) {
    foundItems.splice(itemIdex, 1);
  };
}

})();
