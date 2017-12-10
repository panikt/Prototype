(function () {
  'use strict';

  angular
    .module('prototype.profiles', [
      'prototype.profiles.controllers',
      'prototype.profiles.services',
      'google.places'
    ]);


  angular
    .module('prototype.profiles.controllers', ['ngFileUpload', 'ngImgCrop', 'uiGmapgoogle-maps',  ])
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
       key: 'AIzaSyCFaPjVtgjXt0ZNLerU0Hw-KIomd-dr4aY',
       libraries: 'weather,geometry,visualization,places'
      });
   });

  angular
      .module('prototype.profiles.services', []);

  angular
      .module('prototype.profiles.directives', []);
})();
