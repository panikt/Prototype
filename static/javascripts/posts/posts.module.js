(function () {
  'use strict';

  angular
    .module('prototype.posts', [
      'prototype.posts.controllers',
      'prototype.posts.directives',
      'prototype.posts.services'
    ]);

  angular
    .module('prototype.posts.controllers', []);

  angular
    .module('prototype.posts.directives', ['ngDialog']);

  angular
    .module('prototype.posts.services', []);
})();
