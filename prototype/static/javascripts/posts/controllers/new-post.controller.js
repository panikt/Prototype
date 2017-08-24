/**
* NewPostController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.posts.controllers')
    .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', 'ngDialog', 'Images', '$timeout'];

  /**
  * @namespace NewPostController
  */
  function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts, ngDialog, Images, $timeout) {
    var vm = this;

    vm.submit = submit;
    vm.image = {};
    /**
    * @name submit
    * @desc Create a new Post
    * @memberOf thinkster.posts.controllers.NewPostController
    */
    function submit() {
      $rootScope.$broadcast('post.created', {
        content: vm.content,
        image: vm.image,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();

      Posts.create(vm.content, vm.image).then(createPostSuccessFn, createPostErrorFn);


      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Post created.');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('post.created.error');
        Snackbar.error(data.error);
      }
    }

    vm.uploadImage = function (dataUrl, name)  {

          Images.upload(dataUrl, name).then(imagesSuccessFn, imagesErrorFn, imagesProgressFn);

          function imagesSuccessFn(response) {
            $timeout(function () {
                $scope.closeThisDialog(response.data);
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


    vm.openDialog = function ()  {

          var dialog = ngDialog.open({
          template: '/static/templates/images/images1.html',
          controller: 'NewPostController as vm'
        });

        dialog.closePromise.then(function (data) {
          if (data && data.value) {
              vm.image = data.value.image;
          }
        });
      }
  }
})();
