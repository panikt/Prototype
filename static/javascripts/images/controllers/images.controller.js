/**
* PostsController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.images.controllers')
    .controller('ImagesController', ImagesController);

  ImagesController.$inject = ['$scope','Images', 'Snackbar'];

  function ImagesController($scope, Images, Snackbar) {
    var vm = this;
    vm.uploadImage = uploadImage;
    vm.images = {};
    vm.imagesToUpload = {};

    activate();


    function activate() {

        Images.all().then(imagesSuccessFn, imagesErrorFn);

        function imagesSuccessFn(data, status, headers, config) {
          vm.images = data.data;
        }


        function imagesErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }
    }


    function image() {
    }

    function uploadImage() {
        Images.save(vm.imagesToUpload).then(imagesSuccessFn, imagesErrorFn);

        function imagesSuccessFn(data, status, headers, config) {
          console.log(data.data);
        }


        function imagesErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }

    }
  }
})();
