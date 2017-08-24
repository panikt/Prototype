/**
* IndexController
* @namespace thinkster.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'ProviderList', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Posts, ProviderList, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];
    vm.providerlist =[];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.layout.controllers.IndexController
    */
    function activate() {
      ProviderList.all().then(plSuccessFn, plErrorFn);

      Posts.all().then(postsSuccessFn, postsErrorFn);

      $scope.$on('post.created', function (event, post) {
        vm.posts.unshift(post);
      });

      $scope.$on('post.created.error', function () {
        vm.posts.shift();
      });





      /**
      * @name postsSuccessFn
      * @desc Update posts array on view
      */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }


      /**
      * @name postsErrorFn
      * @desc Show snackbar with error
      */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }


      function plSuccessFn(data, status, headers, config) {
        vm.providerlist = data.data;
      }



      function plErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }

    }
  }
})();
