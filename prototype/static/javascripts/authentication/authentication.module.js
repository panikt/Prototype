(function(){
'use strict';

  angular
    .module('prototype.authentication', [
      'prototype.authentication.controllers',
      'prototype.authentication.services'
    ]);

  angular
    .module('prototype.authentication.controllers', []);

  angular
    .module('prototype.authentication.services', ['ngCookies']);
})();
