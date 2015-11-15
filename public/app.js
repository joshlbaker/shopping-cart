'use strict';
 
angular.module('shopping-cart', [
    'ngRoute',
    'cart',
    'checkout'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/cart'
    });
}]);