angular.module("app").factory('NasaFeed', function($http) {

    var Feeds = {};

    Feeds = {
        categories:"",
        posts:""
    };

    Feeds.getCategories = function(){
        $http.jsonp('http://data.nasa.gov/api/get_category_index?callback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data.categories);
                Feeds.categories = data.categories;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Feeds.getCategories();

    Feeds.getItemsOfAllCategories = function(){

        $http.jsonp('http://data.nasa.gov/api/get_search_results/?search=nasa&count=50&callback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data.posts);
                Feeds.posts = data.posts;

                _.each(Feeds.posts,function(post){

                    post.content = post.content.replace(/<img[^>]*>/g,"");

                    var width =  Math.ceil((Math.random()*2));

                    post.width = width;

                    Feeds.getPostPhotos(post.categories[0],function(response){
                        if(response.photos.photo.length > 0){

                            var photo_number = Math.floor((Math.random() * response.photos.photo.length) + 1);

                            post.imageUrl = "https://farm" + response.photos.photo[photo_number].farm + ".staticflickr.com/" + response.photos.photo[photo_number].server + "/" + response.photos.photo[photo_number].id + "_" + response.photos.photo[photo_number].secret + ".jpg";

                        }

                    });

                });

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Feeds.UpdateItemsOfCategory = function(categorySelected){
        $http.jsonp('http://data.nasa.gov/api/get_search_results/?search=' + categorySelected + '&count=100&callback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data.posts);
                _.each(Feeds.posts,function(post){

                    post.content = post.content.replace(/<img[^>]*>/g,"");

                    var width =  Math.ceil((Math.random()*2));

                    post.width = width;

                    Feeds.getPostPhotos(post.categories[0],function(response){
                        if(response.photos.photo.length > 0){

                            var photo_number = Math.floor((Math.random() * response.photos.photo.length) + 1);

                            post.imageUrl = "https://farm" + response.photos.photo[photo_number].farm + ".staticflickr.com/" + response.photos.photo[photo_number].server + "/" + response.photos.photo[photo_number].id + "_" + response.photos.photo[photo_number].secret + ".jpg";

                        }

                    });

                });
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    Feeds.getItemsOfAllCategories();

    Feeds.getPostPhotos = function(identifier,callback){
        $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6036f42779a1854e2a38b7a8ae25bdd2&tags=nasa,' + identifier + '&format=json&jsoncallback=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //console.log(data.posts);
                callback(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //return undefined;
            });
    };

    return Feeds;


});


