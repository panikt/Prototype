/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.profiles.controllers')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar', 'Authentication'];

  /**
  * @namespace ProfileController
  */
  function ProfileController($location, $routeParams, Posts, Profile, Snackbar, Authentication) {
    var vm = this;

    vm.profile = undefined;
    vm.posts = [];
    vm.isAuthenticated = isAuthenticated;


    activate();

    function isAuthenticated(){
      return Authentication.isAuthenticated();
    }
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfileController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Posts.get(username).then(postsSuccessFn, postsErrorFn);

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
        vm.profile.dob = new Date(vm.profile.dob);
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }


      /**
        * @name postsSucessFn
        * @desc Update `posts` on viewmodel
        */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();
