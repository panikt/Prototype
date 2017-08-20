(function () {
  'use strict';

  angular
    .module('prototype.profiles', [
      'prototype.profiles.controllers',
      'prototype.profiles.services',
    ]);


  angular
    .module('prototype.profiles.controllers', ['ngFileUpload', 'ngImgCrop', 'uiGmapgoogle-maps',   ])
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
       key: 'AIzaSyA85svKBz3q5uLtJobAHj0CE4TE76Sz2zo',
       v: '3.27',
       libraries: 'weather,geometry,visualization,places'
      });
   });

  angular
      .module('prototype.profiles.services', []);

  angular
      .module('prototype.profiles.directives', []);
})();
