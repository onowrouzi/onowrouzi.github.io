(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "views/home.html"
                })
                .state('products', {
                    url: "/products",
                    templateUrl: "views/products.html"
                })
                .state('quotes', {
                    url: "/quotes",
                    templateUrl: "views/quotes.html"
                })
                .state('payment', {
                    url: "/payment",
                    templateUrl: "views/payment.html"
                })
                .state('contact', {
                    url: "/contact",
                    templateUrl: "views/contact.html"
                })
                .state('vehicles', {
                    url: "/vehicles",
                    templateUrl: "views/vehicles.html"
                })
                .state('commercial', {
                    url: "/commercial",
                    templateUrl: "views/commercial.html"
                })
                .state('life', {
                    url: "/life",
                    templateUrl: "views/life.html"
                });
        });
})();