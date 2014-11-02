/**************************
 Application controllers
 **************************/

angular.module("app").controller("NasaAppCtrl", ["$scope", "$location",
        function($scope, $location) {
            return $scope.checkIfOwnPage = function() {

                return _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/forgot", "/pages/lock-screen"], $location.path());

            }, $scope.info = {
                theme_name: "Nasa API Data Feed"
            };
        }
    ]).controller("NavCtrl",["$scope","NasaFeed", function($scope,NasaFeed) {

            $scope.Feeds = NasaFeed;

            $scope.changeFeeds = function(selectedCategory){

                $scope.Feeds.UpdateItemsOfCategory(selectedCategory);

            };

       }
    ]).controller("FeedCtrl", ["$scope","NasaFeed", function($scope,NasaFeed) {

        $scope.Feeds = NasaFeed;

        $scope.finishedloading = NasaFeed.finishedloading;


    }]);