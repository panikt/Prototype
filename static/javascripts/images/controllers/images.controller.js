/**
* PostsController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.images.controllers')
    .controller('ImagesController', ImagesController);

  ImagesController.$inject = ['$scope','Images'];

  function ImagesController($scope, Images) {
    var vm = this;
    vm.images = {};

    activate();


    function activate() {

        Images.all().then(imagesSuccessFn, imagesErrorFn);

        /**
        * @name postsSuccessFn
        * @desc Update posts array on view
        */
        function imagesSuccessFn(data, status, headers, config) {
          vm.images = data.data;
        }


        /**
        * @name postsErrorFn
        * @desc Show snackbar with error
        */
        function imagesErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }
    }


    function image() {
    }

  }
})();
