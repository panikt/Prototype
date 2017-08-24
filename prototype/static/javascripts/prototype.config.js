(function () {
  'use strict';

  angular
    .module('prototype.config')
    .config(config);


  config.$inject = ['$locationProvider'];

  function config($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
})();
