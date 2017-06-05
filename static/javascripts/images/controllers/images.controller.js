/**
* PostsController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.images.controllers')
    .controller('ImagesController', ImagesController);

  ImagesController.$inject = ['$scope','Images', 'Snackbar', 'Upload', '$timeout'];

  function ImagesController($scope, Images, Snackbar, Upload, $timeout) {
    var vm = this;
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

  /*  function uploadImage() {
        Images.save(vm.imagesToUpload).then(imagesSuccessFn, imagesErrorFn);

        function imagesSuccessFn(data, status, headers, config) {
          console.log(data.data);
        }


        function imagesErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }

    }*/

    vm.uploadImage = function (dataUrl, name)  {

          Images.upload(dataUrl, name).then(imagesSuccessFn, imagesErrorFn, imagesProgressFn);

          function imagesSuccessFn(response) {
            $timeout(function () {
                console.log(response.data);
            });
          }


          function imagesErrorFn(response) {
              if (response.status > 0) {
                  Snackbar.error(response.status  + ': ' + response.data);
              }
          }

          function imagesProgressFn(evt) {
            console.log(parseInt(100.0 * evt.loaded / evt.total));

          }
    }
  }

})();
