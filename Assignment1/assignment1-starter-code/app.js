(function () {
'use strict';

angular.module('Assignment1Paco', [])
.controller('LunchControler', LunchControler);

LunchControler.$inject=['$scope'];
function LunchControler($scope) {

  $scope.lunchMessage="";
  $scope.menu="";

  $scope.checkit = function(){
    var stringCount=countSplitString($scope.menu,',');
    if(stringCount>3){
      $scope.lunchMessage="Too much!";
    }else if(stringCount!=0){
      $scope.lunchMessage="Enjoy!";
    }
  };

  function countSplitString(string, separator){
    var count=0;
    if(string!=""){
      var stringSplited = string.split(separator);
      count=stringSplited.length;
    }
    return count;
  }

}

})();
