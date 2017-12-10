/**
* ProfileSettingsController
* @namespace .profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.profiles.controllers')
    .controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = [
    '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar', 'Images', '$scope', 'Upload', '$timeout', "ngDialog", 'uiGmapGoogleMapApi'
  ];

  /**
  * @namespace ProfileSettingsController
  */
  function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar, Images, $scope, Upload, $timeout, ngDialog, uiGmapGoogleMapApi) {
    let vm = this;

    vm.destroy = destroy;
    vm.update = update;
    vm.newImage = {};
    vm.imagesToUpload = {};
    vm.onAddr1Changed = addr1Changed;

    $scope.map = {
        center: {

              latitude: 45,
              longitude: -73
            }, zoom: 8 };

    $scope.marker = {
              id: 0,
              coords: {
                latitude: 45,
                longitude: -73
              },
              options: { draggable: false } };

    // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
             console.log('Google Maps loaded');
             $scope.render = false;
             $timeout(function () {
               console.log('Google Maps loaded222');
               $scope.render = true;

            //  maps.event.trigger( 'resize');
          },2000);
          //
        });


    activate();




    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.profiles.controllers.ProfileSettingsController
    */
    function activate() {
      let authenticatedAccount = Authentication.getAuthenticatedAccount();
      let username = $routeParams.username.substr(1);

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('You are not authorized to view this page.');
      } else {
        // Redirect if logged in, but not the owner of this profile.
        if (authenticatedAccount.username !== username) {
          $location.url('/');
          Snackbar.error('You are not authorized to view this page.');
        }
      }

      Profile.get(username).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Update `profile` for view
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
        vm.profile.dob = new Date(vm.profile.dob);

      }

      /**
      * @name profileErrorFn
      * @desc Redirect to index
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }
    }


    function addr1Changed() {
      console.log(vm.profile.address1);
      if (typeof vm.profile.address1.geometry != 'undefined')
      {
        $scope.map = {
            center: {
              latitude: vm.profile.address1.geometry.location.lat(),
              longitude: vm.profile.address1.geometry.location.lng()
            }, zoom: 16 };
        $scope.marker = {
          id: 0,
          coords: {
            latitude: vm.profile.address1.geometry.location.lat(),
            longitude: vm.profile.address1.geometry.location.lng()
          },
          options: { draggable: false }
        };


      }
    }

    /**
    * @name destroy
    * @desc Destroy this user's profile
    * @memberOf thinkster.profiles.controllers.ProfileSettingsController
    */
    function destroy() {
      Profile.destroy(vm.profile.username).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = '/';

        Snackbar.show('Your account has been deleted.');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

/*
    function uploadImage() {
        Images.save(vm.imagesToUpload).then(imagesSuccessFn, imagesErrorFn);

        function imagesSuccessFn(data, status, headers, config) {
            vm.profile.image = data.data.image;
        }


        function imagesErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }

    } */

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
          controller: 'ProfileSettingsController as vm'
        });

        dialog.closePromise.then(function (data) {
          if (data && data.value) {
              vm.profile.image = data.value.image;
          }
        });

    }


    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf thinkster.profiles.controllers.ProfileSettingsController
    */
    function update() {
      Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Show success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Snackbar.show('Your profile has been updated.');
      }


      /**
      * @name profileErrorFn
      * @desc Show error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();
