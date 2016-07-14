(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
          
            $urlRouterProvider.otherwise("/");
            
            $stateProvider
              .state('home', {
                  url: "/",
                  templateUrl: "/views/home.html",
                  controller: "home_controller"
              })
              .state('blog', {
                  url: "/blog",
                  templateUrl: "/views/blog.html",
                  controller: "blog_controller"
              })
              .state('resume', {
                  url: "/resume",
                  templateUrl: "/views/resume.html"
              })
              .state('contact', {
                  url: "/contact",
                  templateUrl: "/views/contact.html"
              })
              .state('about', {
                  url: "/about",
                  templateUrl: "/views/about.html"
              });
        });
})();
