angular.module("app", ["ngRoute",'app.directives','ngSanitize','iso.directives']).config(["$routeProvider",
    function($routeProvider) {
        return $routeProvider.when("/", {
            redirectTo: "/feed"
        }).when("/feed", {
                templateUrl: "app/views/feed.html"
            }).otherwise({
                redirectTo: "/404"
            });
    }
]);