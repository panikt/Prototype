(function() {
  'use strict';

  angular
    .module('prototype', [
      'prototype.routes',
      'prototype.authentication',
      'prototype.config',
      'prototype.layout',
      'prototype.posts',
      'prototype.utils',
      'prototype.profiles',
      'prototype.images',
    ]);

  angular
    .module('prototype.routes', ['ngRoute']);

  angular
    .module('prototype.config', []);

  angular
    .module('prototype')
    .run(run);

  run.$inject = ['$http'];

  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }


})();
