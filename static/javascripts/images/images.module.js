(function () {
  'use strict';

  angular
    .module('prototype.images', [
      'prototype.images.controllers',
      'prototype.images.directives',
      'prototype.images.services',
    ]);

    angular
      .module('prototype.images.controllers', []);

    angular
      .module('prototype.images.directives', []);

    angular
      .module('prototype.images.services', ['ngFileUpload', 'ngImgCrop']);

})();
