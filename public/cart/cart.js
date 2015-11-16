'use strict';

angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'public/cart/cart.html',
    controller: 'CartCtrl'
  });
}])

.controller('CartCtrl', ['$scope','CommonProp',function($scope,CommonProp) {
    $scope.shopData = [
		{'item':'Backpacks','id':'BP','selected':0,'prices':[{'size':'Osprey Atmos 65 AG Pack','price':'259', 'src': 'public/img/bp1.jpeg' },{'size':'Osprey Aether 70 Pack','price':'289', 'src': 'public/img/bp2.jpeg' }]},
		{'item':'Tents','id':'TNT','selected':0,'prices':[{'size':'MSR Hubba Hubba NX Tent','price':'399', 'src': 'public/img/tent1.jpeg'},{'size':'Marmot Tungsten 3P Tent','price':'249', 'src': 'public/img/tent2.jpeg'}]},
		{'item':'Hydration','id':'H20','selected':0,'prices':[{'size':'CamelBak Arete 18 Hydration Pack - 70 fl. oz.','price':'50', 'src': 'public/img/h201.jpeg'},{'size':'CamelBak Lobo Hydration Pack - 100 fl. oz.','price':'75', 'src': 'public/img/h202.jpeg'}]},
		{'item':'Food','id':'FD','selected':0,'prices':[{'size':'AlpineAire Foods Chicken Gumbo - 2 Servings','price':'7', 'src': 'public/img/FD1.jpeg'},{'size':'Fun Pack Foods Smores Kit','price':'10', 'src': 'public/img/FD2.jpeg'}]},
		{'item':'Jacket','id':'JK','selected':0,'prices':[{'size':'The North Face Sumner Triclimate 3-in-1 Jacket - Mens','price':'350', 'src': 'public/img/JK1.jpeg'},{'size':'The North Face ThermoBall Triclimate 3-in-1 Jacket - Womens','price':'299', 'src': 'public/img/JK2.jpeg'}]},
		{'item':'Sleeping Bags','id':'SB','selected':0,'prices':[{'size':'The North Face Dolomite 3S Sleeping Bag - Double','price':'179', 'src': 'public/img/SB1.jpeg'},{'size':'Big Agnes Cabin Creek Sleeping Bag - Double','price':'269', 'src': 'public/img/SB2.jpeg'}]}
	];

if(CommonProp.getItems()!=''){
      $scope.shopData = CommonProp.getItems();
    }

$scope.total = function(){
      var t = 0;

      for(var k in $scope.shopData){
        t += parseInt($scope.shopData[k].selected);
      }
      
      CommonProp.setTotal(t);
      return t;

    }

 $scope.$watch('shopData',function(){
      CommonProp.setItems($scope.shopData);
    })


}])
.directive('checkList', function() {
    return {
        restrict: 'E',
	scope: {
            option: '=',
	    name: '=',
	    selected: '=selected'
        },
        template: function(elem, attrs) {
            return '<div class="panel-body">\
                    <div class="radio" ng-repeat="i in option">\
                        <label><div class="content"><input type="radio" ng-model="$parent.selected" ng-value="{{i.price}}"  name="{{name}}">{{i.size}} </br>Price: {{i.price | currency}} <div class="pull-right"><img ng-src="{{i.src}}"/></div></div></label>\
                    </div>\
                </div>'
        }
    };
})


.directive('getScroll', function($window) {
  return {
    scope: {
      scroll: '=scroll'
    },
    link: function(scope, element, attrs) {

      var scrollwindow = angular.element($window);
     
      scrollwindow.on('scroll', scope.$apply.bind(scope, function(){scope.scroll = scrollwindow.scrollTop();}));
      
    }
  };
})

.service('CommonProp', function() {
    var Items = '';
    var Total = 0;
 
    return {
        getItems: function() {
            return Items;
        },
        setItems: function(value) {
            Items = value;
        },
        getTotal: function(){
            return Total;
        },
        setTotal: function(value){
            Total = value;
        }
    };
});