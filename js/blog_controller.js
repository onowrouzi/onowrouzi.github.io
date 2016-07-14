(function () {
    'use strict';

    angular
        .module('app')
        .controller('blog_controller', function blog_controller($scope, $http, $log, $q, $sce, moment) {
          
          getPosts().then(
            function (data) {
              $scope.blog = data;
              formatPosts();
              console.log('Posts received.');
            });
            
          function getPosts(){
            var deferred = $q.defer();
            $http.get("https://www.googleapis.com/blogger/v3/blogs/4921018137478696519/posts?key=AIzaSyBD4zBT2rHClWEPIqAYXaYOy502RAk3NyQ").then(
              function handleSuccess(response) {
                        console.log('Got promise list of posts.');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('Promise list of posts failed.');
                    });
                return deferred.promise;
          }
          
          function formatPosts(){
            var postString = "<div id=\"postWrap\" class=\"col-md-6 animated slideInLeft\">";
            angular.forEach($scope.blog.items, function(item, key){
              item.published = new moment(item.published).format('MM/DD/YYYY hh:mm a');
              postString += "<div class=\"blog_post\"><h3>" + item.title + "</h3>";
              postString += "<p>published: " + item.published + "</p><br>";
              postString += "<p>" + item.content + "</p></div>";
            });
            angular.element(document.querySelector('#post')).prepend(postString + "</div>");
          }
        
          $scope.jqueryScrollbarOptions = {
            "onScroll":function(y, x){
              if(y.scroll == y.maxScroll){
                alert('Scrolled to bottom');
            }
          }
    };
        });
})();